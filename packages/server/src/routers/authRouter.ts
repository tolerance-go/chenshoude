import prisma from '@chenshoude-admin/db'
import express from 'express'
import passport from 'passport'
// import { pluginAuthenticate } from '../middleware/pluginAuthenticate'
import { catchErrorReturnHttp500 } from '../utils/catchErrors'

const authRouter = express.Router()

// 设置登录路由，使用 Passport 进行认证
authRouter.post('/login', passport.authenticate('local'), (req, res) => {
   const user = req.user
   res.send(`Hello, ${user!.username}!`)
})

// 使用 passport 登出
authRouter.post('/logout', (req, res, next) => {
   req.logout(function (err) {
      if (err) {
         return next(err)
      }
      res.send('Logged out')
   })
})

// 设置一个路由来获取所有用户
authRouter.get(
   '/users',
   catchErrorReturnHttp500(async (req, res) => {
      const users = await prisma.user.findMany()
      res.json(users)
   }),
)

// 设置一个路由来创建新用户
// authRouter.post(
//    '/users',
//    catchErrors(async (req, res) => {
//       const newUser = await prisma.user.create({
//          data: {
//             ...req.body,
//             ...hashPassword(req.body.password), // 在生产环境中，你应该对密码进行哈希处理
//          },
//       })
//       res.json(newUser)
//    }),
// )

// 设置一个路由来更新用户
authRouter.put(
   '/users/:id',
   catchErrorReturnHttp500(async (req, res) => {
      if (!req.user) {
         throw new Error('No session found')
      }

      if (req.user.id !== parseInt(req.params.id)) {
         throw new Error('Unauthorized')
      }

      const updatedUser = await prisma.user.update({
         where: { id: parseInt(req.params.id) },
         data: {
            username: req.body.username,
            // email: req.body.email,
         },
      })
      res.json(updatedUser)
   }),
)

// 设置一个路由来删除用户
authRouter.delete(
   '/users/:id',
   catchErrorReturnHttp500(async (req, res) => {
      const deletedUser = await prisma.user.delete({
         where: { id: parseInt(req.params.id) },
      })
      res.json(deletedUser)
   }),
)

// 使用 session 来获取当前用户
authRouter.get(
   '/users/session',
   catchErrorReturnHttp500(async (req, res) => {
      if (req.user) {
         res.json(req.user)
         return
      }
      res.json(null)
   }),
)

// // 使用插件的 token 获取用户信息
// authRouter.post('/get-user-by-token', pluginAuthenticate, (req, res) => {
//    res.json(req.user)
// })

export { authRouter }
