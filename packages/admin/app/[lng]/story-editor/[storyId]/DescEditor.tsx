'use client'

import EditorItem from '@/components/EditorItem'

export default function DescEditor() {
   return (
      <EditorItem defaultText='简介' className='text-gray-500' maxLines={3} />
   )
}
