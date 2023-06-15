import clsx from 'clsx'
import { BtnLoading } from '../BtnLoading'

export default function Button({
   isLoading = false,
   children,
   block,
   size = 'md',
   ...attrs
}: {
   block?: boolean
   size?: 'sm' | 'md' | 'lg'
   isLoading?: boolean
   children?: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
   return (
      <button
         {...attrs}
         className={clsx(
            'bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 text-white font-semibold rounded-lg px-6 py-3',
            {
               'w-full block': block,
               'text-sm': size === 'sm',
               'text-lg': size === 'lg',
            },
            attrs.className,
         )}
      >
         {isLoading ? <BtnLoading /> : children}
      </button>
   )
}
