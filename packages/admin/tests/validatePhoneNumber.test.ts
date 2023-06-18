import { describe, expect, test } from 'vitest'
import {
   phoneNumberRegexes,
   validatePhoneNumber,
} from '../utils/validatePhoneNumber'

describe('validatePhoneNumber', () => {
   const realPhoneNumbers: Record<string, string> = {
      '86': '13800138000', // 中国
      '1': '2125550198', // 美国/加拿大
   }

   // 对于每个国家代码，我们都会生成一组测试用例
   for (const countryCode in phoneNumberRegexes) {
      // 测试真实电话号码是否有效
      test(`should return true for real phone number of country ${countryCode}`, () => {
         const phoneNumber = realPhoneNumbers[countryCode]
         const isValid = validatePhoneNumber(countryCode, phoneNumber)
         expect(isValid).toBe(true)
      })
   }

   // 测试默认的电话号码正则
   test('should return true for valid default phone number', () => {
      const phoneNumber = '1234567890'
      const isValid = validatePhoneNumber('not-exist-country-code', phoneNumber)
      expect(isValid).toBe(true)
   })

   // 测试无效的默认电话号码
   test('should return false for invalid default phone number', () => {
      const phoneNumber = '12345678901234567890' // 超过15位
      const isValid = validatePhoneNumber('not-exist-country-code', phoneNumber)
      expect(isValid).toBe(false)
   })
})
