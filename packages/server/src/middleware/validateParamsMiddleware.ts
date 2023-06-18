import { NextFunction, Request, Response } from 'express'
import { validationResult } from 'express-validator'

function formatErrorData(errors: any[]): string {
   let errorMessage = ''

   for (const error of errors) {
      const { type, value, msg, path, location } = error

      errorMessage += `Error: ${msg}\n`
      errorMessage += `Type: ${type}\n`
      errorMessage += `Value: ${value}\n`
      errorMessage += `Path: ${path}\n`
      errorMessage += `Location: ${location}\n\n`
   }

   return errorMessage.trim()
}

export const validateParamsMiddleware = (validators: any[]) => {
   return (req: Request, res: Response, next: NextFunction) => {
      // 执行参数验证规则
      Promise.all(validators.map((validator) => validator.run(req))).then(
         () => {
            const errors = validationResult(req)
            if (errors.isEmpty()) {
               return next()
            }

            // 存在验证错误，返回错误响应
            res.status(400).send(formatErrorData(errors.array()))
         },
      )
   }
}
