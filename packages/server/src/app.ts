import { config } from 'dotenv'

// 优先执行
config()

import { decryptPassword } from '@chenshoude-admin/encrypt-password'
// 导入 Prisma 的客户端和用户模型
import prisma, { User as UserType } from '@chenshoude-admin/db'

// 导入 Express 应用
import express, { NextFunction } from 'express'

// 导入 Express 的会话管理中间件
import session from 'express-session'

import cors from 'cors'
// 导入 Passport 认证中间件
import passport from 'passport'

// 导入 Passport-Local 策略
import { Request, Response } from 'express'
import { Strategy as LocalStrategy } from 'passport-local'
import { authRouter } from './routers/authRouter'

// import { projectRouter } from './routers/projectRouter'
import { registerRouter } from './routers/registerEmailRouter'

import { EXPRESS_SESSION_SID } from '@chenshoude-admin/common/dist/constants'
import cookieParser from 'cookie-parser'
import path from 'path'
import { viewsRouter } from './routers/viewsRouter'
import { validatePassword } from './utils/hashPassword'

import i18n from 'i18n'
import { HttpError } from './errors'
import { openaiRouter } from './routers/openaiRouter'

i18n.configure({
   locales: ['en', 'zh'],
   directory: __dirname + '/locales',
   defaultLocale: 'en',
   autoReload: true,
   cookie: 'i18n_lng',
})

declare global {
   namespace Express {
      interface User extends UserType {}
   }
}

// 配置 Passport 使用本地策略进行认证
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
                  OR: [{ username: account }, { email: account }],
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
               user.confirmed &&
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

// 创建一个 Express 应用
const app = express()

// Set the view engine to ejs
app.set('view engine', 'ejs')

// Set the directory that Express.js views should be loaded from.
app.set('views', path.join(__dirname, 'views'))

app.use('/uploads', express.static('uploads'))

app.use(cors())
app.use(cookieParser())

// 要在 cookie 之后使用
app.use(i18n.init)

// 使用 Express 的中间件来解析 JSON 和 URL 编码的请求体
app.use(
   express.json({
      limit: '2mb',
   }),
)
app.use(express.urlencoded({ limit: '2mb', extended: false }))

// 使用 Express 的会话管理中间件
app.use(
   session({
      name: EXPRESS_SESSION_SID,
      secret: 'secret',
      resave: false,
      saveUninitialized: false,
   }),
)

// 初始化 Passport 和 Passport 会话
app.use(passport.initialize())
app.use(passport.session())
// 使用 '/api' 作为路由的前缀

app.use('/api', authRouter, registerRouter, openaiRouter)
app.use(viewsRouter)

app.get('/', (req, res) => res.send(req.__('hi')))

/**
 * 在 Express.js 中，next 是一个函数，经常用在中间件和路由处理函数中。
 * 当你调用 next() 时，Express.js 将会执行堆栈中的下一个中间件或路由处理函数。
 * 如果你给 next() 传递一个参数，Express.js 将会跳过剩下的所有非错误处理中间件和路由处理函数，直接跳转到错误处理中间件。
错误处理中间件和普通的中间件的主要区别在于它接收四个参数，而不是三个。
当你在一个中间件或路由处理函数中调用 next(err) 时，Express.js 将会跳转到接下来的错误处理中间件。
 */
// 必须在所有路由之后设置错误处理中间件
// 错误处理中间件
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
   /**
    * 如果 Error 继承自 HttpError，那么就返回 HttpError 中的 status 和 message
    */
   if (err instanceof HttpError) {
      return res.status(err.status).send(err.message)
   }

   console.error(err.stack) // 在控制台打印错误堆栈跟踪
   res.status(500).send(err.message) // 发送 500 响应
})

// 设置应用监听在 3000 端口
app.listen(3000, () => console.log('Server started at http://localhost:3000'))
