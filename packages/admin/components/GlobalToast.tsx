'use client'

import { ToastContainer } from 'react-toastify'

export const GlobalToast = () => {
   return (
      <ToastContainer
         autoClose={2500}
         // autoClose={false}
         position='top-center'
      />
   )
}
