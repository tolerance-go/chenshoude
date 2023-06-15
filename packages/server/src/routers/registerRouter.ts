import prisma from '@chenshoude-admin/db'
import { decryptPassword } from '@chenshoude-admin/encrypt-password'
import express from 'express'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import { API_HOST } from '../constants'
import { catchErrors } from '../utils/catchErrors'
import { hashPassword } from '../utils/hashPassword'

const registerRouter = express.Router()

registerRouter.post(
   '/register',
   catchErrors(async (req, res) => {
      const user = req.body

      const existingUser = await prisma.user.findFirst({
         where: {
            email: user.email,
         },
      })

      if (existingUser) {
         res.status(400).send(req.__('emailExists'))
         return
      }

      const token = jwt.sign(
         { email: user.email },
         process.env.EMAIL_JWT_SECRET!,
      )

      const pluginToken = jwt.sign(
         { email: user.email },
         process.env.PLUGIN_JWT_SECRET!,
      )

      const transporter = nodemailer.createTransport({
         host: 'smtp.qq.com',
         auth: {
            user: process.env.EMAIL, // your email
            pass: process.env.EMAIL_PASSWORD, // your email password
         },
      })

      const mailOptions = {
         from: process.env.EMAIL,
         to: user.email,
         subject: req.__('emailConfirmation'),
         text:
            req.__('emailConfirmationClick') +
            `${API_HOST}/api/confirm/${encodeURIComponent(
               user.email,
            )}/${token}`,
      }

      try {
         await transporter.sendMail(mailOptions)

         // 解密后的密码
         const decryptedPassword = await decryptPassword(
            req.body.password,
            process.env.PASSWORD_SYMMETRIC_KEY!,
         )

         await prisma.user.create({
            data: {
               email: user.email,
               emailToken: token,
               pluginToken,
               password: await hashPassword(decryptedPassword),
            },
         })

         res.send(req.__('emailConfirmationSent'))
      } catch (error) {
         console.log(error)
         res.status(500).send(req.__('errorSendingEmail'))
      }
   }),
)

registerRouter.get('/confirm/:email/:token', (req, res) => {
   const { token, email } = req.params

   // Verify the token.
   jwt.verify(token, process.env.EMAIL_JWT_SECRET!, async (err, decoded) => {
      if (err) {
         return res.status(401).send(req.__('invalidToken'))
      }

      // 验证 token 内容是否与 email 一致
      if (typeof decoded === 'object' && decoded.email !== email) {
         return res.status(401).send(req.__('invalidToken'))
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

      await prisma.user.update({
         where: {
            id: user.id,
         },
         data: {
            confirmed: true,
         },
      })

      req.login(user, function (err) {
         if (err) {
            console.log(err)
            res.send(req.__('loginFailed'))
            return
         }

         res.send(req.__('emailConfirmed'))
      })
   })
})

export { registerRouter }
