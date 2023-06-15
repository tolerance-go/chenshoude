import { describe, expect, expectTypeOf, test } from 'vitest'
import { hashPassword, validatePassword } from '../src/utils/hashPassword'

describe('bcrypt functions', () => {
   test('should hash the password', async () => {
      const password = 'myPassword'

      const hashedPassword = await hashPassword(password)
      expectTypeOf(hashedPassword).toBeString()
      expect(hashedPassword).not.toEqual(password)
   })

   test('should validate the password', async () => {
      const password = 'myPassword'
      const hashedPassword = await hashPassword(password)

      const isValid = await validatePassword(password, hashedPassword)
      expect(isValid).toBe(true)
   })

   test('should return false for invalid password', async () => {
      const password = 'myPassword'
      const invalidPassword = 'wrongPassword'
      const hashedPassword = await hashPassword(password)

      const isValid = await validatePassword(invalidPassword, hashedPassword)
      expect(isValid).toBe(false)
   })
})
