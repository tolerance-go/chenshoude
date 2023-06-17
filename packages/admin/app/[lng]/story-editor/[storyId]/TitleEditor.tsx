'use client'

import EditorItem from '@/components/EditorItem'

export default function TitleEditor() {
   return (
      <EditorItem
         defaultText='标题'
         maxWidth='calc(100% - 1.75rem)'
         iconClassName='w-[1.5rem] h-[1.5rem] ml-[0.25rem]'
         className='text-3xl font-medium'
      />
   )
}
