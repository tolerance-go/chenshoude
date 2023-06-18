// 配置 Passport 使用本地策略进行认证

import prisma from '@chenshoude-admin/db'
import { decryptPassword } from '@chenshoude-admin/encrypt-password'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { validatePassword } from '../utils/hashPassword'
// 导入 Prisma 的客户端和用户模型
import { User as UserType } from '@chenshoude-admin/db'
// 导入 Passport 认证中间件

// username 可能是 email 或 username
passport.use(
   new LocalStrategy(
      {
         usernameField: 'account',
      },
      async (account: string, password: string, done) => {
         try {
            // 使用 Prisma 查询用户
            const user = await prisma.user.findFirst({
               where: {
                  username: account,
                  password,
               },
            })

            // 解密后的密码
            const decryptedPassword = await decryptPassword(
               password,
               process.env.PASSWORD_SYMMETRIC_KEY!,
            )

            // 如果用户存在，返回用户，否则返回 false
            if (
               user &&
               (await validatePassword(decryptedPassword, user.password))
            ) {
               done(null, user)
            } else {
               done(null, false)
            }
         } catch (err) {
            done(err)
         }
      },
   ),
)

// 配置 Passport 如何序列化用户
// 登录接口调用时候，会先执行 LocalStrategy 策略获取用户信息，然后执行 serializeUser 方法
// 将用户信息存储到 session 中
passport.serializeUser((user, done) => {
   const userWithId = user as UserType
   done(null, userWithId.id)
})

// 配置 Passport 如何反序列化用户
// 每次请求接口时候，会先执行 deserializeUser 方法，从 session 中获取用户信息
// req.user 就是用户信息
passport.deserializeUser(async (id: number, done) => {
   // 使用 Prisma 通过 ID 查询用户
   const user = await prisma.user.findUnique({
      where: { id: id },
   })

   // 如果用户存在，返回用户，否则返回错误
   if (user) {
      done(null, user)
   } else {
      done(new Error('User not found'))
   }
})
