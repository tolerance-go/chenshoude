import Flowers from '@/components/Flowers'
import Link from 'next/link'
import { AuthDialog } from './AuthDialog'
import { HeaderItem } from './HeaderItem'
import { MainActions } from './MainActions'
import { UserWantTyped } from './UserWantTyped'

export default function Home({
   children,
   params: { lng },
}: {
   children: React.ReactNode
   params: {
      lng: string
   }
}) {
   return (
      <div className='px-20 py-10 pb-48'>
         <AuthDialog />
         {/* header */}
         <HeaderItem />
         {/* 用户提问 */}
         <div className='flex items-center mt-10'>
            <img
               src='https://i.pravatar.cc/300'
               className='w-14 rounded-full'
            ></img>
            <div className='relative pl-3'>
               <span className='text-4xl px-2'>“</span>
               <UserWantTyped />
               <span className='text-4xl relative top-7 px-2'>”</span>
            </div>
            <div className='text-sm text-gray-400 relative pl-3 top-5'>
               小王，<span className='link link-primary'>《天王老子》</span>
               的作者
            </div>
         </div>
         {/* 主操作 */}
         <MainActions />
         {/* 陈列室 */}
         <div className='grid grid-cols-3 gap-y-8 max-w-4xl gap-4 mt-8'>
            {[
               {
                  id: '1',
               },
               {
                  id: '2',
               },
               {
                  id: '3',
               },
               {
                  id: '4',
               },
               {
                  id: '5',
               },
            ].map((item, index) => {
               return (
                  <Link
                     href={`/${lng}/story/${item.id}`}
                     key={item.id}
                     className='flex flex-col group hover:cursor-pointer'
                  >
                     <div className='h-40 relative'>
                        <img className='bg-gray-300 w-full h-full block'></img>
                        <img
                           src={'https://i.pravatar.cc/1' + index}
                           className='w-9 rounded-full absolute z-10 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2'
                        ></img>
                        <span className='absolute bottom-1 right-1 text-gray-500'>
                           连载中
                        </span>
                     </div>
                     <div className='flex flex-col gap-1 mt-4'>
                        <h4 className='text-2xl leading-8 group-hover:link-primary'>
                           bilibili-bg
                        </h4>
                        <div className='text-gray-500 mt-1'>
                           一个浏览器插件，帮你把 bilibili 官
                           网的背景改成自己喜欢的图片
                        </div>
                        <div className='mt-2 flex justify-between items-center'>
                           <span className='text-gray-400 text-sm'>
                              玄幻，200万字
                           </span>
                           <Flowers />
                        </div>
                     </div>
                  </Link>
               )
            })}
         </div>
      </div>
   )
}
