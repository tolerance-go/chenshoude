'use client'

import AuthModalButton from '@/components/AuthModalButton'
import { useLanguageContext } from '@/components/LanguageContext'
import { useTranslation } from '@/i18n/client'
import request from '@/utils/request'
import { encryptPassword } from '@chenshoude-admin/encrypt-password'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

export const LoginForm = ({
   setIsLogin,
}: {
   setIsLogin: (isLogin: boolean) => void
}) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm()
   const { lng } = useLanguageContext()

   const { t } = useTranslation(lng)
   const [isLoading, setIsLoading] = useState(false)
   const router = useRouter()

   return (
      <>
         <h1 className='text-xl md:text-2xl font-bold leading-tight'>
            {t('auth.loginFormTitle')}
         </h1>
         <form
            onSubmit={handleSubmit(async (data) => {
               console.log('handleSubmit called') // Add this line
               console.log(data, process.env)
               setIsLoading(true)
               try {
                  await request.post('/api/login', {
                     ...data,
                     password: encryptPassword(
                        data.password,
                        process.env.NEXT_PUBLIC_PASSWORD_SYMMETRIC_KEY!,
                     ),
                  })
                  console.log('end')
                  router.push(`/${lng}/admin`)
               } catch (error) {
                  console.log('error', error)
                  // noop
               } finally {
                  setIsLoading(false)
               }
            })}
            className='mt-6'
         >
            <div>
               <label className='block text-gray-700'>
                  {t('auth.accountLabel')}
               </label>
               <input
                  placeholder={t('auth.accountPlaceholder')}
                  className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none'
                  autoFocus
                  {...register('account', {
                     required: t('auth.accountErrorMessages.required'),
                  })}
               />
               {errors.account && (
                  <p className='pt-1 text-gray-700'>{errors.account.message}</p>
               )}
            </div>

            <div className='mt-4'>
               <label className='block text-gray-700'>
                  {t('auth.passwordLabel')}
               </label>
               <input
                  type='password'
                  placeholder={t('auth.passwordPlaceholder')}
                  className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
    focus:bg-white focus:outline-none'
                  {...register('password', {
                     required: t('auth.passwordErrorMessages.required'),
                     minLength: {
                        value: 6,
                        message: t('auth.passwordErrorMessages.minLength'),
                     },
                  })}
               />
               {errors.password && (
                  <p className='pt-1 text-gray-700'>
                     {errors.password.message}
                  </p>
               )}
            </div>

            <div className='text-right mt-2'>
               <a
                  href='#'
                  className='text-sm font-semibold text-gray-700 hover:text-blue-700 focus:text-blue-700'
               >
                  {t('auth.forgetPassword')}
               </a>
            </div>
            <AuthModalButton className='mt-6' type='submit' loading={isLoading}>
               {t('auth.loginButton')}
            </AuthModalButton>
         </form>
         <p className='mt-8'>
            {t('auth.needAccount')}{' '}
            <span
               onClick={() => {
                  setIsLogin(false)
               }}
               className='text-blue-500 hover:text-blue-700 font-semibold cursor-pointer'
            >
               {t('auth.createAccount')}
            </span>
         </p>
      </>
   )
}
