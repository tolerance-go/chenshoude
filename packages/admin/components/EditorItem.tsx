'use client'

import clsx from 'clsx'
import { useEffect, useRef, useState } from 'react'
import ContentEditable from 'react-contenteditable'
import './EditorItem.scss'

type EditorItemProps = {
   defaultText: string
   maxWidth?: string
   className: string
   maxLines?: number // 添加行数限制属性
}

const EditorItem: React.FC<EditorItemProps> = ({
   defaultText,
   maxWidth,
   className,
   maxLines,
}) => {
   const [text, setText] = useState(defaultText)
   const [editing, setEditing] = useState(false)
   // 远程同步网络状态
   const [syncing, setSyncing] = useState(false)

   const startEditing = () => setEditing(true)
   const cancelEditing = () => setEditing(false)
   const finishEditing = () => {
      //   request.post('/api/stories/1', { title: text })
      try {
         // 远程同步网络状态
         setSyncing(true)
         setEditing(false)
      } finally {
         // 远程同步网络状态
         setSyncing(false)
      }
   }

   const contentEditableRef = useRef<HTMLInputElement>(null)

   useEffect(() => {
      if (editing && contentEditableRef.current) {
         contentEditableRef.current.focus()

         const range = document.createRange()
         range.selectNodeContents(contentEditableRef.current)
         const sel = window.getSelection()
         sel?.removeAllRanges()
         sel?.addRange(range)
      }
   }, [editing])

   return (
      <ContentEditable
         tagName='div'
         innerRef={contentEditableRef}
         className={clsx(
            editing
               ? 'w-full outline-none'
               : maxLines
               ? 'truncate-multiline'
               : 'truncate',
            className,
            !editing && ['underline-dot', 'underline', 'underline-offset-4'],
         )}
         style={{
            maxWidth: editing ? undefined : maxWidth,
            ...(maxLines
               ? {
                    WebkitLineClamp: editing ? undefined : maxLines,
                 }
               : undefined),
         }}
         html={text} // innerHTML of the editable div
         disabled={!editing} // use true to disable edition
         onChange={(event) => {
            const target = event.target
            setText(target.value)
         }} // handle innerHTML change
         onKeyDown={(event) => {
            //    const target = event.target as HTMLInputElement
            if (
               maxLines
                  ? event.altKey && event.key === 'Enter'
                  : event.key === 'Enter'
            ) {
               finishEditing()
            }
         }}
         onBlur={() => {
            cancelEditing()
         }}
         onClick={() => {
            startEditing()
         }}
      />
   )
}

export default EditorItem
