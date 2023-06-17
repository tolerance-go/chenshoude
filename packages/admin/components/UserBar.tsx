import { EllipsisHorizontalIcon } from '@heroicons/react/24/outline'

export default function UserBar() {
   return (
      <button className='flex-none border-t py-3 hover:bg-gray-50 focus:bg-gray-50 cursor-pointer px-4 flex justify-between items-center'>
         <span>Yarnb</span>
         <EllipsisHorizontalIcon className='w-5 h-5' />
      </button>
   )
}
