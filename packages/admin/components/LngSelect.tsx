'use client'

import { usePathname, useRouter } from 'next/navigation'

const languages = [
   {
      name: 'English',
      icon: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1ec-1f1e7.svg',
      code: 'en',
   },
   // {
   //    name: 'Español',
   //    icon: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1ea-1f1f8.svg',
   //    code: 'es',
   // },
   // {
   //    name: 'Français',
   //    icon: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1eb-1f1f7.svg',
   //    code: 'fr',
   // },
   // {
   //    name: 'Indonesia',
   //    icon: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1ee-1f1e9.svg',
   //    code: 'id',
   // },
   // {
   //    name: '日本語',
   //    icon: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1ef-1f1f5.svg',
   //    code: 'ja',
   // },
   // {
   //    name: '한국어',
   //    icon: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1f0-1f1f7.svg',
   //    code: 'ko',
   // },
   // {
   //    name: 'Português',
   //    icon: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1e7-1f1f7.svg',
   //    code: 'pt',
   // },
   // {
   //    name: 'Русский',
   //    icon: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1f7-1f1fa.svg',
   //    code: 'ru',
   // },
   {
      name: '中文',
      icon: 'https://cdnjs.cloudflare.com/ajax/libs/twemoji/14.0.0/svg/1f1e8-1f1f3.svg',
      code: 'zh',
   },
]

/**
 * 选择后，替换当前页面的语言
 * 将路径中的 [lng] 替换为选择的语言
 * /[lng]/path/to/page
 */
export const LngSelect = () => {
   const router = useRouter()
   const pathname = usePathname()

   const currentLng = pathname.split('/')[1]

   return (
      <div title='Change Language' className='dropdown dropdown-end'>
         <div tabIndex={0} className='btn btn-ghost normal-case'>
            <svg
               className='h-5 w-5 fill-current'
               xmlns='http://www.w3.org/2000/svg'
               width='20'
               height='20'
               viewBox='0 0 512 512'
            >
               <path d='M363,176,246,464h47.24l24.49-58h90.54l24.49,58H480ZM336.31,362,363,279.85,389.69,362Z'></path>
               <path d='M272,320c-.25-.19-20.59-15.77-45.42-42.67,39.58-53.64,62-114.61,71.15-143.33H352V90H214V48H170V90H32v44H251.25c-9.52,26.95-27.05,69.5-53.79,108.36-32.68-43.44-47.14-75.88-47.33-76.22L143,152l-38,22,6.87,13.86c.89,1.56,17.19,37.9,54.71,86.57.92,1.21,1.85,2.39,2.78,3.57-49.72,56.86-89.15,79.09-89.66,79.47L64,368l23,36,19.3-11.47c2.2-1.67,41.33-24,92-80.78,24.52,26.28,43.22,40.83,44.3,41.67L255,362Z'></path>
            </svg>{' '}
            <svg
               width='12px'
               height='12px'
               className='hidden h-2 w-2 fill-current opacity-60 sm:inline-block'
               xmlns='http://www.w3.org/2000/svg'
               viewBox='0 0 2048 2048'
            >
               <path d='M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z'></path>
            </svg>
         </div>{' '}
         <div className='dropdown-content bg-base-200 text-base-content rounded-box top-px mt-16 w-56 overflow-y-auto shadow'>
            <ul className='menu menu-sm gap-1' tabIndex={0}>
               {languages.map((language) => (
                  <li key={language.code}>
                     <button
                        onClick={() => {
                           const lng = language.code
                           // Split the current path into an array of segments
                           const pathArray = pathname.split('/')

                           // Replace the first segment with the new language
                           pathArray[1] = lng

                           // Join the segments back together into a new path
                           const newPath = pathArray.join('/')

                           router.push(newPath)
                        }}
                        className={language.code === currentLng ? 'active' : ''}
                     >
                        <img
                           className='drop-shadow'
                           loading='lazy'
                           width='20'
                           height='20'
                           alt={language.name}
                           src={language.icon}
                        />{' '}
                        {language.name}{' '}
                     </button>
                  </li>
               ))}
            </ul>
         </div>
      </div>
   )
}
