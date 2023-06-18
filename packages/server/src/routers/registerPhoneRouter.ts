import prisma from '@chenshoude-admin/db'
import express from 'express'
import { catchErrorReturnHttp500 } from '../utils/catchErrors'
import { generateRandomCode } from '../utils/generateRandomCode'
import { smsService } from '../utils/smsService'

const registerPhoneRouter = express.Router()

// 验证验证码是否有效
const verifyVerificationCode = async (phoneNumber: string, code: string) => {
   // 从数据库或缓存中获取存储的验证码
   const saved = await prisma.verificationCode.findFirst({
      where: {
         phoneNumber,
      },
   })

   // 验证码匹配检查
   return saved.code === code
}

// 发送验证码到用户手机
registerPhoneRouter.post(
   '/register/phone/sendVerificationCode',
   catchErrorReturnHttp500(async (req, res) => {
      const phoneNumber = req.body.phoneNumber

      const code = generateRandomCode() // 生成随机验证码
      // 调用短信服务提供商的 SDK 或 API，将验证码发送到用户的手机
      smsService.sendSMS(phoneNumber, code)

      // 将 code 和手机号保存到数据库中，以便后续验证
      await prisma.verificationCode.create({
         data: {
            phoneNumber,
            code,
         },
      })

      res.send('Verification code sent successfully')
   }),
)

// 注册路由处理程序
registerPhoneRouter.post(
   '/register/phone',
   catchErrorReturnHttp500(async (req, res) => {
      const phoneNumber = req.body.phoneNumber
      const code = req.body.verificationCode

      if (await verifyVerificationCode(phoneNumber, code)) {
         // 验证通过，继续注册流程
         // 其他注册逻辑...

         const user = await prisma.user.create({
            data: {
               phoneNumber,
            },
         })

         req.login(user, function (err) {
            if (err) {
               console.log(err)
               res.send(req.__('loginFailed'))
               return
            }

            // 重定向到首页
            res.redirect('/')
         })
      } else {
         // 验证失败，要求用户重新输入验证码
         throw new Error('验证码错误')
      }
   }),
)

export { registerPhoneRouter as registerRouter }
