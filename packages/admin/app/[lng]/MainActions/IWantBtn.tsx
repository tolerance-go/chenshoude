'use client'

export const IWantBtn = () => {
   return (
      <div
         onClick={() => window.authDialog.showModal()}
         className='transform active:scale-95 transition-transform duration-50 border cursor-pointer shadow-md border-gray-950 flex-1 text-center px-10 py-5 rounded-full'
      >
         写小说
      </div>
   )
}
