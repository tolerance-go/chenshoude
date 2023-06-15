import CopyToken from '@/components/CopyToken'
import Page from '@/components/Page'
import { useTranslation } from '@/i18n'
import { I18nLng } from '@/i18n/types'
import Link from 'next/link'
import { Trans } from 'react-i18next/TransWithoutContext'

export default async function Home({
   params: { lng },
}: {
   params: {
      lng: I18nLng
   }
}) {
   const { t } = await useTranslation(lng, 'admin')
   return (
      <Page title={t('index.home')}>
         <h2 className='mb-3 text-md'>{t('index.usage')}</h2>
         <ol className='relative border-l border-gray-200 dark:border-gray-700'>
            <li className='mb-10 ml-4'>
               <div className='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
               <h3 className='mb-1 text-lg font-semibold text-gray-900 dark:text-white'>
                  {t('index.step1')}
               </h3>
               <p className='mb-4 text-base font-normal text-gray-500 dark:text-gray-400'>
                  {t('index.installInfo')}
               </p>
               <Link
                  target='_blank'
                  href='https://www.figma.com/community/plugin/1239442570532327240'
                  className='inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700'
               >
                  Figma{' '}
                  <svg
                     className='w-3 h-3 ml-2'
                     fill='currentColor'
                     viewBox='0 0 20 20'
                     xmlns='http://www.w3.org/2000/svg'
                  >
                     <path
                        fillRule='evenodd'
                        d='M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z'
                        clipRule='evenodd'
                     ></path>
                  </svg>
               </Link>
            </li>
            <li className='mb-10 ml-4'>
               <div className='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
               <h3 className='mb-1 text-lg font-semibold text-gray-900 dark:text-white'>
                  {t('index.step2')}
               </h3>
               <p className='text-base mb-4 font-normal text-gray-500 dark:text-gray-400'>
                  <Trans
                     i18nKey='index.getToken'
                     components={{
                        Link: (
                           <Link
                              href={`/admin/settings`}
                              className='text-blue-700'
                           />
                        ),
                     }}
                     t={t}
                  ></Trans>
               </p>
               <CopyToken />
            </li>
            <li className='ml-4 mb-10'>
               <div className='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
               <h3 className='mb-1 text-lg font-semibold text-gray-900 dark:text-white'>
                  {t('index.step3')}
               </h3>
               <p className='text-base font-normal text-gray-500 dark:text-gray-400'>
                  {t('index.startUpload')}
               </p>
            </li>
            <li className='ml-4'>
               <div className='absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -left-1.5 border border-white dark:border-gray-900 dark:bg-gray-700'></div>
               <h3 className='mb-1 text-lg font-semibold text-gray-900 dark:text-white'>
                  {t('index.step4')}
               </h3>
               <p className='text-base font-normal text-gray-500 dark:text-gray-400'>
                  <Trans
                     i18nKey='index.publishPreview'
                     components={{
                        Link: (
                           <Link
                              href={`/admin/projects`}
                              className='text-blue-700'
                           />
                        ),
                     }}
                     t={t}
                  ></Trans>
               </p>
            </li>
         </ol>
      </Page>
   )
}
