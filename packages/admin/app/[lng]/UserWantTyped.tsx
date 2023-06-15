'use client'

import TypedReact from '@/components/TypedReact'

export const UserWantTyped = () => {
   return (
      <span className='text-xl'>
         <TypedReact
            strings={['我想有个工具可以把 B 站的背景改成 EVA !']}
         ></TypedReact>
      </span>
   )
}
