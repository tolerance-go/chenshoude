'use client'

import { useState } from 'react'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'

export const AuthDialog = () => {
   const [isLogin, setIsLogin] = useState(false)

   return (
      <dialog id='authDialog' className='modal'>
         <form method='dialog' className='modal-box'>
            {isLogin ? (
               <LoginForm setIsLogin={setIsLogin} />
            ) : (
               <RegisterForm setIsLogin={setIsLogin} />
            )}
            <div className='modal-action'>
               {/* if there is a button in form, it will close the modal */}
               <button className='btn'>取 消</button>
            </div>
         </form>
         <form method='dialog' className='modal-backdrop'>
            <button>close</button>
         </form>
      </dialog>
   )
}
