import prisma from '@chenshoude-admin/db'
import express from 'express'
import { body } from 'express-validator'
import { validateParamsMiddleware } from '../middleware/validateParamsMiddleware'
import { catchErrorReturnHttp500 } from '../utils/catchErrors'
import { generateRandomCode } from '../utils/generateRandomCode'
import { generateRandomPassword } from '../utils/generateRandomPassword'
import { smsService } from '../utils/smsService'

const registerPhoneRouter = express.Router()

// 发送验证码到用户手机
registerPhoneRouter.post(
   '/register/phone/sendVerificationCode',
   validateParamsMiddleware([
      body('phoneNumber')
         .notEmpty()
         .isString()
         .withMessage('Invalid phone number'),
   ]),
   catchErrorReturnHttp500(async (req, res) => {
      const phoneNumber = req.body.phoneNumber

      const code = generateRandomCode() // 生成随机验证码
      // 调用短信服务提供商的 SDK 或 API，将验证码发送到用户的手机
      smsService.sendSMS(phoneNumber, code)

      // 如果手机号已经存在就更新验证码，否则就创建新的验证码
      const existing = await prisma.verificationCode.findFirst({
         where: {
            phoneNumber,
         },
      })

      if (existing) {
         await prisma.verificationCode.update({
            where: {
               id: existing.id,
            },
            data: {
               code,
            },
         })
      } else {
         // 将 code 和手机号保存到数据库中，以便后续验证
         await prisma.verificationCode.create({
            data: {
               phoneNumber,
               code,
            },
         })
      }

      res.send('Verification code sent successfully' + ': ' + code)
   }),
)

// 注册路由处理程序
registerPhoneRouter.post(
   '/register-or-login/phone',
   validateParamsMiddleware([
      // 验证用户名
      body('phoneNumber')
         .notEmpty()
         .isString()
         .withMessage('Invalid phone number'),
      body('verificationCode')
         .notEmpty()
         .isString()
         .withMessage('Invalid verification code'),
   ]),
   catchErrorReturnHttp500(async (req, res) => {
      const phoneNumber = req.body.phoneNumber
      const code = req.body.verificationCode

      // 从数据库或缓存中获取存储的验证码
      const saved = await prisma.verificationCode.findFirst({
         where: {
            phoneNumber,
         },
      })

      if (!saved) {
         return res.status(500).send('验证码失效，请重新发送验证码')
      }

      // 验证码匹配检查
      if (saved.code === code) {
         // 判断用户存在
         const existingUser = await prisma.user.findFirst({
            where: {
               phoneNumber,
            },
         })

         let user
         if (existingUser) {
            user = existingUser
         } else {
            // 验证通过，继续注册流程
            user = await prisma.user.create({
               data: {
                  phoneNumber,
                  password: generateRandomPassword(),
               },
            })
         }

         // 删除数据库的验证码
         await prisma.verificationCode.delete({
            where: {
               id: saved.id,
            },
         })

         req.login(user, function (err) {
            if (err) {
               console.log(err)
               res.send(req.__('loginFailed'))
               return
            }

            // 重定向到首页
            // res.redirect('/')
            res.send('注册&登录成功')
         })
      } else {
         // 验证失败，要求用户重新输入验证码
         throw new Error('验证码错误，请重新发送')
      }
   }),
)

export { registerPhoneRouter }
