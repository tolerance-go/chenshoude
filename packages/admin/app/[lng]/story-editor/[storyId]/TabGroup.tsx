'use client'

import { Tab } from '@headlessui/react'
import clsx from 'clsx'
import DescEditor from './DescEditor'
import TitleEditor from './TitleEditor'

export default function TabGroup() {
   return (
      <Tab.Group>
         <Tab.List
            className={
               'flex gap-2 px-3 py-2 no-scrollbar overflow-x-auto w-full items-center'
            }
         >
            {[
               {
                  name: '大纲',
               },
               {
                  name: '故事背景',
               },
               {
                  name: '时间线',
               },
               {
                  name: '人物关系',
               },
               {
                  name: '时间线',
               },
               {
                  name: '人物设定',
               },
            ].map((item) => {
               return (
                  <Tab
                     key={item.name}
                     className={({ selected }) =>
                        clsx(
                           'flex-none rounded-lg px-4 py-2.5 text-sm font-medium leading-5 text-blue-700',
                           'focus:outline-none',
                           selected ? 'bg-white shadow' : 'text-gray-400',
                        )
                     }
                  >
                     {item.name}
                  </Tab>
               )
            })}
         </Tab.List>
         <Tab.Panels>
            <Tab.Panel>
               <div className='p-5'>
                  <TitleEditor />
                  {/* <div className='text-3xl font-medium'>标题</div> */}
                  <div className='flex items-center justify-between mt-2'>
                     <span>作者</span>
                  </div>
                  <div className='flex justify-between items-center mt-2'>
                     <div className='flex gap-2 items-center'>
                        {['标签1', '标签2'].map((item, index) => {
                           return (
                              <span
                                 key={index}
                                 className='px-2 text-sm py-1 border inline-block rounded-full border-black'
                              >
                                 {item}
                              </span>
                           )
                        })}
                     </div>
                     <div className='text-sm'>130万字</div>
                  </div>
                  <div className='mt-2 relative'>
                     <DescEditor />
                  </div>
               </div>
            </Tab.Panel>
            <Tab.Panel>
               <textarea className='p-5 outline-none w-full'></textarea>
            </Tab.Panel>
            <Tab.Panel>
               <textarea className='p-5 outline-none w-full'></textarea>
            </Tab.Panel>
         </Tab.Panels>
      </Tab.Group>
   )
}
