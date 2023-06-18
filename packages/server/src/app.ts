import { config } from 'dotenv'

// 优先执行
config()

// 导入 Prisma 的客户端和用户模型
import { User as UserType } from '@chenshoude-admin/db'

// 导入 Express 应用
import express, { NextFunction } from 'express'

// 导入 Express 的会话管理中间件
import session from 'express-session'

import cors from 'cors'

// 导入 Passport-Local 策略
import { Request, Response } from 'express'

import { EXPRESS_SESSION_SID } from '@chenshoude-admin/common/dist/constants'
import cookieParser from 'cookie-parser'
import path from 'path'

import i18n from 'i18n'
import passport from 'passport'

import { authRouter } from './routers/authRouter'

// import { projectRouter } from './routers/projectRouter'
import { registerRouter } from './routers/registerEmailRouter'

import { HttpError } from './errors'
import './lib/i18n'
import './lib/passport'
import { openaiRouter } from './routers/openaiRouter'
import { registerPhoneRouter } from './routers/registerPhoneRouter'
import { viewsRouter } from './routers/viewsRouter'

declare global {
   namespace Express {
      interface User extends UserType {}
   }
}

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

app.use('/api', authRouter, registerRouter, openaiRouter, registerPhoneRouter)
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
