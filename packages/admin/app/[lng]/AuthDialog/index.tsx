'use client'

import Modal from '@/components/Modal'
import { useState } from 'react'
import { LoginForm } from './LoginForm'
import { RegisterForm } from './RegisterForm'

export const AuthDialog = () => {
   const [isLogin, setIsLogin] = useState(true)

   return (
      <Modal windowKey='authDialog'>
         {isLogin ? (
            <LoginForm setIsLogin={setIsLogin} />
         ) : (
            <RegisterForm setIsLogin={setIsLogin} />
         )}
      </Modal>
   )
}
