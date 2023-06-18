export const phoneNumberRegexes: Record<string, string> = {
   '86': '^\\d{11}$', // 中国
   '1': '^\\d{10}$', // 美国
}

// 默认的手机号码正则
const defaultPhoneNumberRegex = '^\\d{1,15}$'

// 根据 countryCode 返回对应的正则表达式
export function getPhoneNumberRegex(countryCode: string) {
   return new RegExp(phoneNumberRegexes[countryCode] || defaultPhoneNumberRegex)
}

export function validatePhoneNumber(
   countryCode: string,
   phoneNumber: string,
): boolean {
   const pattern = getPhoneNumberRegex(countryCode)
   return pattern.test(phoneNumber)
}
