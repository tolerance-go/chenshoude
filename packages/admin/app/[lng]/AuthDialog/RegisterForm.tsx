'use client'

import AuthModalButton from '@/components/AuthModalButton'
import { useLanguageContext } from '@/components/LanguageContext'
import request from '@/utils/request'
import { encryptPassword } from '@chenshoude-admin/encrypt-password'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useTranslation } from '../../../i18n/client'

export const RegisterForm = ({
   setIsLogin,
}: {
   setIsLogin: (isLogin: boolean) => void
}) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm()
   const [isLoading, setIsLoading] = useState(false)
   const { lng } = useLanguageContext()
   const { t } = useTranslation(lng)

   return (
      <>
         <h1 className='text-xl md:text-2xl font-bold leading-tight'>
            {t('auth.registerFormTitle')}
         </h1>
         <form
            onSubmit={handleSubmit(async (data) => {
               setIsLoading(true)
               const { confirmPassword, ...rest } = data
               try {
                  await request.post('/api/register', {
                     ...rest,
                     password: encryptPassword(
                        rest.password,
                        process.env.NEXT_PUBLIC_PASSWORD_SYMMETRIC_KEY!,
                     ),
                  })
                  toast.success(t('auth.registerSuccessNote'))
               } catch {
                  // noop
               } finally {
                  setIsLoading(false)
               }
            })}
            className='mt-6'
         >
            <div>
               <label className='block text-gray-700'>
                  {t('auth.emailLabel')}
               </label>
               <input
                  type='email'
                  placeholder={t('auth.emailPlaceholder')}
                  className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500 focus:bg-white focus:outline-none'
                  autoFocus
                  {...register('email', {
                     required: t('auth.emailErrorMessages.required'),
                  })}
               />
               {errors.email && (
                  <p className='pt-1 text-gray-700'>{errors.email.message}</p>
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

            <div className='mt-4'>
               <label className='block text-gray-700'>
                  {t('auth.confirmPasswordLabel')}
               </label>
               <input
                  type='password'
                  placeholder={t('auth.confirmPasswordPlaceholder')}
                  className='w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
    focus:bg-white focus:outline-none'
                  {...register('confirmPassword', {
                     required: t('auth.confirmPasswordErrorMessages.required'),
                     minLength: {
                        value: 6,
                        message: t(
                           'auth.confirmPasswordErrorMessages.minLength',
                        ),
                     },
                     validate: (value, formValues) => {
                        return (
                           value === formValues.password ||
                           t('auth.confirmPasswordErrorMessages.notMatch')
                        )
                     },
                  })}
               />
               {errors.confirmPassword && (
                  <p className='pt-1 text-gray-700'>
                     {errors.confirmPassword.message}
                  </p>
               )}
            </div>
            <AuthModalButton className='mt-6' type='submit' loading={isLoading}>
               {t('auth.registerButton')}
            </AuthModalButton>
            <p className='mt-8'>
               {t('auth.registerSuccess')}{' '}
               <span
                  onClick={() => {
                     setIsLogin(true)
                  }}
                  className='text-blue-500 hover:text-blue-700 font-semibold cursor-pointer'
               >
                  {t('auth.backToLogin')}
               </span>
            </p>
         </form>
      </>
   )
}
