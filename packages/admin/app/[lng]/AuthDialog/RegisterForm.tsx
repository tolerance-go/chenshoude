'use client'

import AuthModalButton from '@/components/AuthModalButton'
import { useLanguageContext } from '@/components/LanguageContext'
import { mergeRefs } from '@/utils/mergeRefs'
import request from '@/utils/request'
import { getPhoneNumberRegex } from '@/utils/validatePhoneNumber'
import { encryptPassword } from '@chenshoude-admin/encrypt-password'
import { useEffect, useRef, useState } from 'react'
import { Controller, useForm, useWatch } from 'react-hook-form'
import { toast } from 'react-toastify'
import { useLatest } from 'react-use'
import { useTranslation } from '../../../i18n/client'
import CountryCodeSelect from './CountryCodeSelect'
import { SendMsgBtn } from './SendMsgBtn'

export const RegisterForm = ({
   setIsLogin,
}: {
   setIsLogin: (isLogin: boolean) => void
}) => {
   const {
      register,
      handleSubmit,
      formState: { errors, dirtyFields },
      control,

      trigger,
   } = useForm({
      defaultValues: {
         countryCode: '86',
      },
   })
   const [isLoading, setIsLoading] = useState(false)
   const { lng } = useLanguageContext()
   const { t } = useTranslation(lng)

   // 电话号码 input ref
   const phoneNumberRef = useRef<HTMLInputElement>(null)

   const countryCode = useWatch({
      control,
      name: 'countryCode',
   })

   const dirtyFieldsLatest = useLatest(dirtyFields)

   useEffect(() => {
      if (dirtyFieldsLatest.current.phoneNumber) {
         trigger('phoneNumber') // 当 a 字段变化时，重新出发 b 字段的验证
      }
   }, [countryCode])

   console.log('countryCode', countryCode)

   const { ref: phoneRef, ...phoneNumberParams } = register('phoneNumber', {
      required: '手机号不能为空',
      pattern: {
         value: getPhoneNumberRegex(countryCode),
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
               console.log('data', data)
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
                  <Controller
                     name='countryCode'
                     control={control}
                     render={({ field }) => (
                        <CountryCodeSelect
                           value={field.value}
                           onChange={field.onChange}
                           onSelected={() => {
                              phoneNumberRef.current?.focus()
                           }}
                        />
                     )}
                  />
                  <input
                     ref={mergeRefs(phoneNumberRef, phoneRef)}
                     type='text'
                     placeholder={'请输入手机号'}
                     className='pl-20 h-12 w-full flex-grow px-4 rounded-lg bg-gray-200  border focus:border-blue-500 focus:bg-white focus:outline-none'
                     autoFocus
                     {...phoneNumberParams}
                  />
                  <SendMsgBtn control={control}></SendMsgBtn>
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
