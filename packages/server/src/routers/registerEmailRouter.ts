import prisma from '@chenshoude-admin/db'
import { decryptPassword } from '@chenshoude-admin/encrypt-password'
import express from 'express'
import geoip from 'geoip-lite'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { API_HOST } from '../constants'
import { HttpError } from '../errors'
import { catchErrorReturnHttp500 } from '../utils/catchErrors'
import { hashPassword } from '../utils/hashPassword'

const registerEmailRouter = express.Router()

registerEmailRouter.post(
   '/register',
   catchErrorReturnHttp500(async (req, res) => {
      const user = req.body

      let existingUser
      try {
         existingUser = await prisma.user.findFirst({
            where: {
               email: user.email,
            },
         })
      } catch (error) {
         console.log(error)
         throw new HttpError('验证用户失败')
      }

      if (existingUser && existingUser.confirmed) {
         throw new HttpError(req.__('emailExists'))
      }

      const emailToken = jwt.sign(
         { email: user.email },
         process.env.EMAIL_JWT_SECRET!,
      )

      try {
         const userIP = req.ip // 获取用户的 IP 地址
         const geo = geoip.lookup(userIP) // 使用 geoip-lite 库获取 IP 地址的归属地信息

         console.log('geo 地址信息：', geo)

         const useQQEmail = !geo || geo.country === 'CN' // 如果归属地信息为空或者归属地为中国，则使用 QQ 邮箱

         if (useQQEmail) {
            console.log('使用 QQ 邮箱')
         }

         const options = !useQQEmail
            ? {
                 host: 'smtp.qq.com', // 根据归属地信息选择邮件传输的主机地址
                 auth: {
                    user: process.env.QQ_EMAIL, // your email
                    pass: process.env.QQ_EMAIL_PASSWORD, // your email password
                 },
              }
            : {
                 host: 'smtp.gmail.com',
                 service: 'gmail', // 使用了 Gmail 邮箱，也可以使用其他邮箱，如 'QQ'
                 auth: {
                    user: process.env.GMAIL_EMAIL, // your email
                    pass: process.env.GMAIL_EMAIL_PASSWORD, // your email password
                 },
              }

         console.log('options: ', options)

         const transporter = nodemailer.createTransport(options)

         const mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: req.__('emailConfirmation'),
            text:
               req.__('emailConfirmationClick') +
               `${API_HOST}/api/confirm/${encodeURIComponent(
                  user.email,
               )}/${emailToken}`,
         }

         await transporter.sendMail(mailOptions)

         console.log('Email sent')
      } catch (error) {
         console.log(error)
         throw new HttpError(req.__('errorSendingEmail'))
      }

      try {
         // 解密后的密码
         const decryptedPassword = await decryptPassword(
            req.body.password,
            process.env.PASSWORD_SYMMETRIC_KEY!,
         )

         if (existingUser) {
            await prisma.user.update({
               where: {
                  id: existingUser.id,
               },
               data: {
                  emailToken,
                  password: await hashPassword(decryptedPassword),
               },
            })
         } else {
            await prisma.user.create({
               data: {
                  email: user.email,
                  emailToken,
                  password: await hashPassword(decryptedPassword),
               },
            })
         }

         res.send(req.__('emailConfirmationSent'))
      } catch (error) {
         console.log(error)
         throw new HttpError('注册用户失败')
      }
   }),
)

/**
 * 如果用户点击了邮件中的链接，就会访问这个路由
 * 通过验证 token 来确认用户的邮箱
 * 如果 token 有效，就会更新用户的 confirmed 字段，并且重定向到首页
 * 如果 token 无效，就会返回 404
 */
registerEmailRouter.get(
   '/confirm/:email/:token',
   catchErrorReturnHttp500(async (req, res) => {
      const { token, email } = req.params

      // Verify the token.
      jwt.verify(token, process.env.EMAIL_JWT_SECRET!, async (err, decoded) => {
         if (err) {
            return res.status(401).send(req.__('invalidToken'))
         }

         // 验证 token 内容是否与 email 一致
         if (typeof decoded === 'object' && decoded.email !== email) {
            return res.status(404).send(req.__('invalidToken'))
         }

         // Find the user with this token.
         const user = await prisma.user.findFirst({
            where: {
               emailToken: token,
               email,
            },
         })

         if (!user) {
            return res.status(404).send(req.__('userNotFound'))
         }

         try {
            await prisma.user.update({
               where: {
                  id: user.id,
               },
               data: {
                  confirmed: true,
               },
            })
         } catch (error) {
            console.log(error)
            return res.status(500).send('更新用户失败')
         }

         req.login(user, function (err) {
            if (err) {
               console.log(err)
               res.send(req.__('loginFailed'))
               return
            }

            // 重定向到首页
            res.redirect('/')
         })
      })
   }),
)

export { registerEmailRouter as registerRouter }
