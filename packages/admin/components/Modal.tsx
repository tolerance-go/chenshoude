'use client'

import { Dialog, Transition } from '@headlessui/react'
import {
   Fragment,
   ReactElement,
   ReactNode,
   cloneElement,
   forwardRef,
   useEffect,
   useImperativeHandle,
   useRef,
   useState,
} from 'react'
import { useLatest } from 'react-use'

export interface ModalProps {
   title?: string
   children?: ReactNode
   trigger?: ReactElement
   autoCloseTime?: number
   closable?: boolean
   onClose?: () => void
}

function isElementChild(container: HTMLElement, target: HTMLElement): boolean {
   let node = target.parentNode

   while (node !== null) {
      if (node === container) {
         return true
      }
      node = node.parentNode
   }

   return false
}

export interface ModalHandles {
   openModal: () => void
   closeModal: () => void
}

const Modal = forwardRef<ModalHandles, ModalProps>(
   (
      { children, title, trigger, autoCloseTime, onClose, closable = true },
      ref,
   ) => {
      let [isOpen, setIsOpen] = useState(false)
      const latestOnClose = useLatest(onClose)

      const containerRef = useRef<HTMLDivElement>(null)

      function closeModal() {
         setIsOpen(false)
      }

      function openModal() {
         setIsOpen(true)
      }

      useImperativeHandle(ref, () => ({
         openModal,
         closeModal,
      }))

      useEffect(() => {
         if (isOpen && autoCloseTime) {
            const timeoutId = setTimeout(() => {
               closeModal()
            }, autoCloseTime)
            return () => clearTimeout(timeoutId)
         }
      }, [isOpen, autoCloseTime])

      return (
         <>
            {trigger &&
               cloneElement(trigger, {
                  onClick: (event: Event) => {
                     setIsOpen(true)
                     trigger.props.onClick?.(event)
                  },
               })}

            <Transition
               appear
               show={isOpen}
               as={Fragment}
               afterLeave={() => {
                  latestOnClose.current?.()
               }}
            >
               <Dialog
                  ref={containerRef}
                  as='div'
                  className='relative z-10'
                  // https://github.com/tailwindlabs/headlessui/issues/621
                  onClose={() => {}}
                  onClick={(event) => {
                     /**
                      * disable close modal when click outside of modal
                      */
                     if (
                        isElementChild(
                           containerRef.current!,
                           event.target as HTMLElement,
                        )
                     ) {
                        closeModal()
                     }
                  }}
               >
                  <Transition.Child
                     as={Fragment}
                     enter='ease-out duration-300'
                     enterFrom='opacity-0'
                     enterTo='opacity-100'
                     leave='ease-in duration-200'
                     leaveFrom='opacity-100'
                     leaveTo='opacity-0'
                  >
                     <div className='fixed inset-0 bg-black bg-opacity-25' />
                  </Transition.Child>

                  <div className='fixed inset-0 overflow-y-auto'>
                     <div className='flex min-h-full items-center justify-center p-4 text-center'>
                        <Transition.Child
                           as={Fragment}
                           enter='ease-out duration-300'
                           enterFrom='opacity-0 scale-95'
                           enterTo='opacity-100 scale-100'
                           leave='ease-in duration-200'
                           leaveFrom='opacity-100 scale-100'
                           leaveTo='opacity-0 scale-95'
                        >
                           <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                              {closable && (
                                 <button
                                    onClick={(event) => {
                                       closeModal()
                                    }}
                                    className='top-0 absolute right-0 p-4'
                                 >
                                    <svg
                                       xmlns='http://www.w3.org/2000/svg'
                                       fill='none'
                                       viewBox='0 0 24 24'
                                       strokeWidth='1.5'
                                       stroke='currentColor'
                                       className='w-6 h-6'
                                    >
                                       <path
                                          strokeLinecap='round'
                                          strokeLinejoin='round'
                                          d='M6 18L18 6M6 6l12 12'
                                       />
                                    </svg>
                                 </button>
                              )}
                              {title && (
                                 <Dialog.Title
                                    as='h3'
                                    className='mb-2 text-lg font-medium leading-6 text-gray-900'
                                 >
                                    {title}
                                 </Dialog.Title>
                              )}
                              {children}
                           </Dialog.Panel>
                        </Transition.Child>
                     </div>
                  </div>
               </Dialog>
            </Transition>
         </>
      )
   },
)
Modal.displayName = 'Modal'

export default Modal
