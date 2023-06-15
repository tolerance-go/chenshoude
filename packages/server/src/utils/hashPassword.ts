import bcrypt from 'bcrypt'

// 密码加密
export async function hashPassword(password: string): Promise<string> {
   const saltRounds = 10
   const hashedPassword = await bcrypt.hash(password, saltRounds)
   return hashedPassword
}

// 密码解密
export async function validatePassword(
   password: string,
   hashedPassword: string,
): Promise<boolean> {
   const match = await bcrypt.compare(password, hashedPassword)
   return match
}
