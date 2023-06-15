import { I18nLng } from '@/i18n/types'
import { createContext, useContext } from 'react'

// The type of the context value
export interface LanguageContextType {
   lng: I18nLng
   dir: string
}

// Create the context
export const LanguageContext = createContext<LanguageContextType | undefined>(
   undefined,
)

export const useLanguageContext = () => {
   const context = useContext(LanguageContext)
   if (context === undefined) {
      throw new Error(
         'useLanguageContext must be used within a LanguageProvider',
      )
   }
   return context
}
