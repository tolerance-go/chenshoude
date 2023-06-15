import { describe, expect, expectTypeOf, test } from 'vitest'
import { decryptPassword, encryptPassword, generateEncryptionKey } from '../src'

describe('encryptPassword', () => {
   test('generateEncryptionKey', async (t) => {
      const encryptionKey = await generateEncryptionKey()
      expectTypeOf(encryptionKey).toBeString()
      expect(encryptionKey).toHaveLength(64)
   })

   test('encryptPassword', async (t) => {
      const password = 'myPassword'
      const encryptionKey = await generateEncryptionKey()

      const encryptedPassword = encryptPassword(password, encryptionKey)
      expectTypeOf(encryptedPassword).toBeString()
   })

   test('decryptPassword', async (t) => {
      const password = 'myPassword'
      const encryptionKey = await generateEncryptionKey()
      const encryptedPassword = encryptPassword(password, encryptionKey)

      const decryptedPassword = decryptPassword(
         encryptedPassword,
         encryptionKey,
      )
      expectTypeOf(decryptedPassword).toBeString()
      expect(decryptedPassword).toBe(password)
   })
})
