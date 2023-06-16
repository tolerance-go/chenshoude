'use client'

import clsx from 'clsx'
import { useState } from 'react'
import { IWantBtn } from './IWantBtn'

export const MainActions = () => {
   const [isChance, setIsChance] = useState(false)
   return (
      <div className='flex max-w-4xl gap-4 mt-10'>
         {!isChance && <IWantBtn />}
         <div
            onClick={() => {
               setIsChance(true)
            }}
            className={clsx(
               'border shadow-md border-gray-950 text-center px-10 py-5 rounded-full inline-flex gap-1',
               {
                  'flex-1': isChance,
                  'cursor-pointer': !isChance,
                  'transform active:scale-95 transition-transform duration-50':
                     !isChance,
               },
            )}
         >
            <img src='/icons/search.svg' className='w-5'></img>
            {isChance ? (
               <input
                  type='text'
                  placeholder='输入关键字进行搜索'
                  className='outline-none w-full'
                  autoFocus
                  onKeyDown={(event) => {
                     // 如果按下 esc 退出
                     if (event.key === 'Escape') {
                        setIsChance(false)
                     }
                  }}
               ></input>
            ) : (
               '随便看看'
            )}
            {isChance && (
               <img
                  src='/icons/close.svg'
                  className='w-5 cursor-pointer'
                  onClick={(event) => {
                     event.stopPropagation()
                     setIsChance(false)
                  }}
               ></img>
            )}
         </div>
      </div>
   )
}
