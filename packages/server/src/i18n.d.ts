// Import your translation file.
import translation from './locales/en.json'

// Create a type that recursively gets all of the keys in your translation file.
type NestedKeys<T> = {
   [K in keyof T]: T[K] extends object
      ? `${K}.${NestedKeys<T[K]>}` | `${K}`
      : `${K}`
}[keyof T]

// Create a new type that includes all of the keys in your translation file.
type TranslationKeys = NestedKeys<typeof translation>

// Then, extend the Express.Request interface to use the TranslationKeys type.
declare global {
   namespace Express {
      interface Request {
         __: {
            (
               phrase: TranslationKeys | i18n.TranslateOptions,
               ...replace: string[]
            ): string
            (
               phrase: TranslationKeys | i18n.TranslateOptions,
               replacements: i18n.Replacements,
            ): string
         }
      }
   }
}
