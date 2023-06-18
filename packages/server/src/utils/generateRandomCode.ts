export const generateRandomCode = (): string => {
   const codeLength = 6 // 验证码长度
   const codeCharacters = '0123456789' // 验证码字符集

   let code = ''
   for (let i = 0; i < codeLength; i++) {
      const randomIndex = Math.floor(Math.random() * codeCharacters.length)
      code += codeCharacters.charAt(randomIndex)
   }

   return code
}
