'use client'

import {
   LanguageContext,
   LanguageContextType,
} from '@/components/LanguageContext'

export const LanguageContextWrapper = ({
   children,
   lng,
   dir: dir_,
}: { children: React.ReactNode } & LanguageContextType) => {
   return (
      <LanguageContext.Provider value={{ lng, dir: dir_ }}>
         <body>{children}</body>
      </LanguageContext.Provider>
   )
}
