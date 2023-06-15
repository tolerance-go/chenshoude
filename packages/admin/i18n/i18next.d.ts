import 'i18next'
import transition from './locales/en/transition.json'

declare module 'i18next' {
   interface CustomTypeOptions {
      defaultNS: 'en'
      allowObjectInHTMLChildren: true
      resources: {
         transition: typeof transition
      }
   }
}
