'use client'

import AuthModalButton from '@/components/AuthModalButton'
import { useLanguageContext } from '@/components/LanguageContext'
import request from '@/utils/request'
import { encryptPassword } from '@chenshoude-admin/encrypt-password'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useTranslation } from '../../../i18n/client'
import CountryCodeSelect from './CountryCodeSelect'
import { SendMsgBtn } from './SendMsgBtn'

function mergeRefs<T>(...refs: React.Ref<T>[]): React.RefCallback<T> {
   return (value: T) => {
      refs.forEach((ref) => {
         if (typeof ref === 'function') {
            ref(value)
         } else if (ref != null) {
            ;(ref as React.MutableRefObject<T>).current = value
         }
      })
   }
}

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

   // 电话号码 input ref
   const phoneNumberRef = useRef<HTMLInputElement>(null)

   const { ref: phoneRef, ...phoneNumberParams } = register('phoneNumber', {
      required: '手机号不能为空',
      pattern: {
         value: /^\+(?:[0-9]●?){6,14}[0-9]$/,
         message: '手机号码格式不正确',
      },
   })

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
               <label className='block text-gray-700'>手机号</label>
               <div className='flex gap-2 mt-2'>
                  <CountryCodeSelect
                     onSelected={() => {
                        phoneNumberRef.current?.focus()
                     }}
                  />
                  <input
                     ref={mergeRefs(phoneNumberRef, phoneRef)}
                     type='text'
                     placeholder={'请输入手机号'}
                     className='pl-20 h-12 w-full flex-grow px-4 rounded-lg bg-gray-200  border focus:border-blue-500 focus:bg-white focus:outline-none'
                     autoFocus
                     {...phoneNumberParams}
                  />
                  <SendMsgBtn></SendMsgBtn>
               </div>
               {errors.phoneNumber && (
                  <p className='pt-1 text-gray-700'>
                     {errors.phoneNumber.message}
                  </p>
               )}
            </div>

            <div className='mt-4'>
               <label className='block text-gray-700'>验证码</label>
               <input
                  type='text'
                  placeholder={'请输入验证码'}
                  className='w-full px-4 h-12 rounded-lg bg-gray-200 mt-2 border focus:border-blue-500
    focus:bg-white focus:outline-none'
                  {...register('code', {
                     required: '验证码不能为空',
                     minLength: {
                        value: 6,
                        message: '验证码长度不能小于6位',
                     },
                  })}
               />
               {errors.password && (
                  <p className='pt-1 text-gray-700'>
                     {errors.password.message}
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
