import { AuthDialog } from './AuthDialog'
import { MainActions } from './MainActions'
import { UserMenu } from './UserMenu'
import { UserWantTyped } from './UserWantTyped'

export default function Home({ children }: { children: React.ReactNode }) {
   return (
      <div className='px-20 py-10 pb-48'>
         <AuthDialog />
         {/* header */}
         <div className='flex items-center justify-between'>
            <div className='flex items-center gap-8'>
               {/* logo */}
               <div className='flex flex-col items-center justify-center'>
                  <h1 className='text-[2.8rem] leading-[3.2rem]'>趁手的</h1>
                  <h4 className='text-xs text-gray-400'>www.chenshoude.com</h4>
               </div>
               {/* slog */}
               <div>
                  <h3 className='inline-flex items-center gap-2'>
                     <span>1 块钱帮你解决一个小问题</span>{' '}
                     <img src='/icons/clap.svg' className='w-5'></img>
                  </h3>
               </div>
            </div>
            {/* actions */}
            <UserMenu />
         </div>
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
               14 天前
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
                  <div key={item.id} className='flex flex-col'>
                     <div className='h-40 relative'>
                        <img className='bg-gray-300 w-full h-full block'></img>
                        <img
                           src={'https://i.pravatar.cc/1' + index}
                           className='w-9 rounded-full absolute z-10 bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2'
                        ></img>
                        <span className='absolute bottom-1 right-1 text-gray-500'>
                           开发中
                        </span>
                     </div>
                     <div className='flex flex-col gap-1 mt-4'>
                        <h4 className='text-2xl leading-8'>bilibili-bg</h4>
                        <div className='text-gray-500 mt-1'>
                           一个浏览器插件，帮你把 bilibili 官
                           网的背景改成自己喜欢的图片
                        </div>
                        <div className='text-gray-400 text-sm mt-1'>
                           2024-2-13
                        </div>
                     </div>
                  </div>
               )
            })}
         </div>
      </div>
   )
}
