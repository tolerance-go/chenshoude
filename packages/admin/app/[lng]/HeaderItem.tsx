'use client'

import { useEffect } from 'react'
import './HeaderItem.scss'
import { UserMenu } from './UserMenu'

export const HeaderItem = () => {
   useEffect(() => {
      const handler = () => {
         const header = document.getElementById('header')
         if (!header) return
         if (window.scrollY > 30) {
            header.classList.add('scrolled')
         } else {
            header.classList.remove('scrolled')
         }
      }
      window.addEventListener('scroll', handler)

      return () => {
         window.removeEventListener('scroll', handler)
      }
   })

   return (
      <div
         id='header'
         className='flex items-center justify-between min-h-[4.5rem] bg-white z-50'
      >
         <div className='flex items-center gap-8'>
            {/* logo */}
            <div className='flex flex-col items-center justify-center'>
               <h1 className='text-[2.8rem] leading-[3.2rem] transition-all'>
                  趁手的
               </h1>
               <h4 className='text-xs text-gray-400 transition-all'>
                  www.chenshoude.com
               </h4>
            </div>
            {/* slog */}
            <div>
               <h3 className='inline-flex items-center gap-2'>
                  <span>1 块钱帮你解决一个小问题</span>{' '}
                  <img src='/icons/clap.svg' className='w-5'></img>
               </h3>
            </div>
         </div>
         {/* actions */}
         <UserMenu />
      </div>
   )
}
