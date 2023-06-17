import clsx from 'clsx'

export default function AuthModalButton({
   loading = false,
   children,
   ...attrs
}: {
   loading?: boolean
   children?: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
   return (
      <button
         {...attrs}
         className={clsx(
            'bg-blue-500 hover:bg-blue-400 focus:bg-blue-400 font-semibold rounded-lg flex items-center justify-center h-12',
            'w-full text-white',
            attrs.className,
         )}
      >
         {loading ? (
            <div
               className='inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]'
               role='status'
            >
               <span className='!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]'>
                  Loading...
               </span>
            </div>
         ) : (
            children
         )}
      </button>
   )
}
