import cryptoJs from 'crypto-js'

// 生成加密密钥
export async function generateEncryptionKey(): Promise<string> {
   return cryptoJs.lib.WordArray.random(32).toString()
}

// 加密密码
export function encryptPassword(
   password: string,
   encryptionKey: string,
): string {
   const encryptedData = cryptoJs.AES.encrypt(
      password,
      encryptionKey,
   ).toString()
   return encryptedData
}

// 解密密码
export function decryptPassword(
   encryptedData: string,
   encryptionKey: string,
): string {
   const decryptedData = cryptoJs.AES.decrypt(
      encryptedData,
      encryptionKey,
   ).toString(cryptoJs.enc.Utf8)
   return decryptedData
}
