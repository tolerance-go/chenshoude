'use client'

import {
   forwardRef,
   useCallback,
   useEffect,
   useImperativeHandle,
   useMemo,
   useState,
} from 'react'

declare global {
   interface Window {
      alert3: GlobalModalMethods
   }
}

export type GlobalModalMethods = {
   show: (title: string, message: string) => void
   hide: () => void
}

const GlobalModal = forwardRef<GlobalModalMethods, {}>((props, ref) => {
   const [message, setMessage] = useState<string>()
   const [title, setTitle] = useState<string>()

   const hide = useCallback(() => {
      const dialog = window['global_modal']
      dialog?.close()
      setMessage(undefined)
   }, [])

   const show = useCallback((title: string, message: string) => {
      setTitle(title)
      setMessage(message)
      const dialog = window['global_modal']
      dialog?.showModal()
   }, [])

   const methods = useMemo(() => ({ show, hide }), [show, hide])

   useImperativeHandle(ref, () => methods)

   // 在 window 上挂一个 alert3 对象，用于调用 alert3.show(message) 来显示全局消息
   useEffect(() => {
      window['alert3'] = methods
   }, [methods])

   return (
      <dialog id={`global_modal`} className='modal'>
         <form method='dialog' className='modal-box'>
            <h3 className='font-bold text-lg'>{title}</h3>
            <p className='py-4'>{message}</p>
            <div className='modal-action'>
               {/* if there is a button in form, it will close the modal */}
               <button className='btn'>取消</button>
            </div>
         </form>
      </dialog>
   )
})

GlobalModal.displayName = 'GlobalModal'

export { GlobalModal }
