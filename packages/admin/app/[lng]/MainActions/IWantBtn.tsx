'use client'

import { useRouter } from 'next/navigation'

export const IWantBtn = () => {
   const router = useRouter()

   return (
      <div
         onClick={() => {
            // window.authDialog.showModal()
            window.open('/story-editor/2')
         }}
         className='transform active:scale-95 transition-transform duration-50 border cursor-pointer shadow-md border-gray-950 flex-1 text-center px-10 py-5 rounded-full'
      >
         写小说
      </div>
   )
}
