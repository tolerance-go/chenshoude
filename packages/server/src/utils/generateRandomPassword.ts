import bcrypt from 'bcrypt'

// 生成随机密码
export const generateRandomPassword = (): string => {
   const passwordLength = 6 // 密码长度
   const saltRounds = 10 // 加密强度

   const randomPassword = Math.random().toString(36).slice(-passwordLength)
   const hashedPassword = bcrypt.hashSync(randomPassword, saltRounds)

   return hashedPassword
}
