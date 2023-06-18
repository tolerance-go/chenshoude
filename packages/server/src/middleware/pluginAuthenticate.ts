// import prisma from '@chenshoude-admin/db'
// import { decryptPassword } from '@chenshoude-admin/encrypt-password'
// import { RequestHandler } from 'express'

// export const pluginAuthenticate: RequestHandler = async (req, res, next) => {
//    try {
//       // 提取 Authorization 头
//       const authHeader = req.headers.authorization

//       if (!authHeader) {
//          res.status(401).send('Unauthorized')
//          return
//       }

//       // 验证 Bearer token
//       const token = authHeader.split(' ')[1] // 'Bearer' 与 'token'之间有一个空格

//       console.log('token', token)

//       console.log(
//          'process.env.PLUGIN_PASSWORD_SYMMETRIC_KEY',
//          process.env.PLUGIN_PASSWORD_SYMMETRIC_KEY,
//       )

//       // 解密 token
//       const rawToken = decryptPassword(
//          token,
//          process.env.PLUGIN_PASSWORD_SYMMETRIC_KEY!,
//       )

//       console.log('rawToken', rawToken)

//       // 找到对应的用户
//       const user = await prisma.user.findUnique({
//          where: { pluginToken: rawToken },
//       })

//       console.log('user', user)

//       if (!user) {
//          res.status(401).send('Unauthorized')
//          return
//       }

//       // 如果用户被验证，将其添加到 req 对象，以便路由处理函数可以访问它
//       req.user = user

//       // 调用 next() 函数以执行下一个中间件或路由处理函数
//       next()
//    } catch (error) {
//       console.error(error)
//       res.status(500).send('Error authenticating user')
//    }
// }
