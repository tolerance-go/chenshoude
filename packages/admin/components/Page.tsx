export default function Page({
   children,
   title,
   actionSlot,
}: {
   children?: React.ReactNode
   actionSlot?: React.ReactNode
   title: string
}) {
   return (
      <div>
         <div className='flex justify-between items-center mb-4'>
            <h2 className='text-lg font-medium'>{title}</h2>
            {actionSlot}
         </div>
         <div className='bg-white rounded-lg p-4'>{children}</div>
      </div>
   )
}
