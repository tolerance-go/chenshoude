import { NextFunction, Request, RequestHandler, Response } from 'express'

// 定义一个类型，它是一个接受 express Request, Response 和 NextFunction 参数并返回 Promise 的函数
type AsyncRequestHandler = (
   req: Request,
   res: Response,
   next: NextFunction,
) => Promise<any>

// 使用 AsyncRequestHandler 类型作为参数的 wrapAsync 中间件
// 兜底函数，不会让程序崩溃而是返回 500 错误信息
export const catchErrorReturnHttp500 = (
   fn: AsyncRequestHandler,
): RequestHandler => {
   return (req, res, next) => {
      fn(req, res, next).catch((err) => next(err))
   }
}
