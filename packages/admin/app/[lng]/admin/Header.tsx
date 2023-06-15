'use client'

import { LngSelect } from '@/components/LngSelect'
import { UserItem } from './User'

export const Header = () => {
   return (
      <header className='flex items-center h-20 px-6 sm:px-10 bg-white'>
         <div className='flex flex-shrink-0 items-center ml-auto gap-2'>
            <UserItem />
            <LngSelect />
         </div>
      </header>
   )
}
