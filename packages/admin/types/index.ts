import { User } from '@chenshoude-admin/db'
import { NextApiRequest } from 'next'

export class HttpError extends Error {
   statusCode?: number

   constructor(message: string, statusCode?: number) {
      super(message)
      this.statusCode = statusCode
   }
}

export interface CookieNextApiRequest extends NextApiRequest {
   headers: NextApiRequest['headers'] & {
      cookie: string
   }
   session: LoginSession
   user: User
}

// 请求中的 Session 对象
export type LoginSession = {
   maxAge?: number
   createdAt?: number
   users: User[]
   [key: string]: any
}
