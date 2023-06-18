/**
 * HttpError 继承自 Error，增加 status 参数
 */
export class HttpError extends Error {
   status: number
   constructor(message: string, status: number = 500) {
      super(message)
      this.status = status
   }
}
