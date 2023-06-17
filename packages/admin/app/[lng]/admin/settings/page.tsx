'use client'

import AuthModalButton from '@/components/AuthModalButton'
import CopyToken from '@/components/CopyToken'
import { useLanguageContext } from '@/components/LanguageContext'
import Page from '@/components/Page'
import { useUserContext } from '@/components/UserContext'
import { useTranslation } from '@/i18n/client'
import request from '@/utils/request'
import { User } from '@chenshoude-admin/db'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'

const SettingsForm = ({ defaultUser }: { defaultUser: User }) => {
   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm({
      defaultValues: defaultUser,
   })
   const [isLoading, setIsLoading] = useState(false)
   const { lng } = useLanguageContext()

   const { t: adminT } = useTranslation(lng, 'admin')
   const { t } = useTranslation(lng, 'transition')

   return (
      <form
         onSubmit={handleSubmit(async (data) => {
            setIsLoading(true)
            try {
               await request.put('/api/users/' + defaultUser.id, {
                  username: data.username,
               })
               toast.success(t('actions.updateSuccessful'))
            } catch {
               // noop
            } finally {
               setIsLoading(false)
            }
         })}
      >
         <div className='grid grid-cols-1 gap-6'>
            <div>
               <p className='text-gray-700 mb-1'>
                  {adminT('settings.pluginToken')}
               </p>
               <CopyToken />
            </div>
            <label className='block'>
               <span className='text-gray-700'>
                  {adminT('settings.username')}
               </span>
               <input
                  type='text'
                  className='
                  form-input
  mt-1
  block
  w-full
  rounded-md
  bg-gray-100
  border-transparent
  focus:border-gray-500 focus:bg-white focus:ring-0
'
                  {...register('username')}
               />
            </label>
            <label className='block'>
               <span className='text-gray-700'>
                  {adminT('settings.emailAddress')}
               </span>
               <input
                  type='email'
                  disabled
                  className='cursor-not-allowed
                  form-input
  mt-1
  block
  w-full
  rounded-md
  bg-gray-100
  border-transparent
  focus:border-gray-500 focus:bg-white focus:ring-0
'
                  {...register('email')}
               />
               <p className='pt-2 text-gray-500'>
                  {adminT('settings.emailNotModifiable')}
               </p>
            </label>

            {/* <label className='block'>
         <span className='text-gray-700'>When is your event?</span>
         <input
            type='date'
            className='
  mt-1
  block
  w-full
  rounded-md
  bg-gray-100
  border-transparent
  focus:border-gray-500 focus:bg-white focus:ring-0
'
         />
      </label>
      <label className='block'>
         <span className='text-gray-700'>
            What type of event is it?
         </span>
         <select
            className='
  block
  w-full
  mt-1
  rounded-md
  bg-gray-100
  border-transparent
  focus:border-gray-500 focus:bg-white focus:ring-0
'
         >
            <option>Corporate event</option>
            <option>Wedding</option>
            <option>Birthday</option>
            <option>Other</option>
         </select>
      </label>
      <label className='block'>
         <span className='text-gray-700'>Additional details</span>
         <textarea
            className='
  mt-1
  block
  w-full
  rounded-md
  bg-gray-100
  border-transparent
  focus:border-gray-500 focus:bg-white focus:ring-0
'
            rows={3}
         ></textarea>
      </label>
      <div className='block'>
         <div className='mt-2'>
            <div>
               <label className='inline-flex items-center'>
                  <input
                     type='checkbox'
                     className='
        rounded
        bg-gray-200
        border-transparent
        focus:border-transparent focus:bg-gray-200
        text-gray-700
        focus:ring-1 focus:ring-offset-2 focus:ring-gray-500
      '
                  />
                  <span className='ml-2'>
                     Email me news and special offers
                  </span>
               </label>
            </div>
         </div>
      </div> */}
         </div>
         <AuthModalButton
            className='mt-6'
            block
            type='submit'
            loading={isLoading}
         >
            {t('actions.update')}
         </AuthModalButton>
      </form>
   )
}

export default function Settings() {
   const user = useUserContext()
   const { lng } = useLanguageContext()
   const { t: adminT } = useTranslation(lng, 'admin')

   return (
      <Page title={adminT('settings.userConfig')}>
         <div className='py-4 max-w-xl'>
            {user && <SettingsForm defaultUser={user} />}
         </div>
      </Page>
   )
}
