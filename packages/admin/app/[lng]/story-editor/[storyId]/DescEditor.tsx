'use client'

import EditorItem from '@/components/EditorItem'

export default function DescEditor() {
   return (
      <EditorItem
         defaultText='简介'
         maxWidth='calc(100% - 1.25rem)'
         iconClassName='w-[1rem] h-[1rem] ml-[0.25rem] text-gray-500'
         className='text-gray-500'
      />
   )
}
