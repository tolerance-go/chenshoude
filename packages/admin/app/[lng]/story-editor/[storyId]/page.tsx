import DetailHeaderImage from '@/components/DetailHeaderImage'
import ArrowsExpandOutlineIcon from '@/components/icons/ArrowsExpandOutlineIcon'
import ShareIcon from '@/components/icons/ShareIcon'
import SortUp from '@/components/icons/SortUp'
import UploadIcon from '@/components/icons/UploadIcon'
import ZoomInOutlineIcon from '@/components/icons/ZoomInOutlineIcon'
import ZoomOutOutlineIcon from '@/components/icons/ZoomOutOutlineIcon'
import DescEditor from './DescEditor'
import TitleEditor from './TitleEditor'

export default function StoryEditor() {
   return (
      <div className='flex items-stretch h-screen'>
         <div className='w-1/5 border-r'>
            <div className='relative'>
               <DetailHeaderImage />
               <div className='absolute inset-0'>
                  <label
                     htmlFor='file'
                     className='w-full h-full flex justify-center items-center cursor-pointer'
                  >
                     <UploadIcon className='w-5 h-5' />
                  </label>
                  <input id='file' type='file' className='hidden' />
               </div>
            </div>
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
            <div>
               <div className='flex justify-between px-1 items-center relative'>
                  <span>目录</span>
                  <div className='flex gap-2 items-center'>
                     <SortUp className='w-4 h-4 opacity-20'></SortUp>
                  </div>
                  <div className='absolute text-sm link link-primary top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                     上次看到 #91 40%
                  </div>
               </div>
               <div className='border-t mt-1'>
                  {['第一章', '第二章', '第三章'].map((item, index) => {
                     return (
                        <div className='flex items-center border-b' key={index}>
                           <img
                              className='h-16 w-16 object-cover'
                              src='https://images.openai.com/blob/992f3298-aa47-47df-9ab0-e75d3aa1d116/openai-cybersecurity-grant-program.png?trim=0,0,0,0&width=800'
                           ></img>
                           <span className='flex-grow px-4'>{item}</span>
                           <div className='flex items-center gap-3 px-1'>
                              <span className='text-gray-300'>2023/4/22</span>
                              <ShareIcon className='w-4 h-4 opacity-20' />
                              <span>#91</span>
                           </div>
                        </div>
                     )
                  })}
               </div>
            </div>
         </div>
         <div className='flex-grow'>
            <div className='flex flex-col gap-4 absolute right-8 bottom-10'>
               <ArrowsExpandOutlineIcon className='w-5 h-5 cursor-pointer' />
               <ZoomOutOutlineIcon className='w-5 h-5 cursor-pointer' />
               <ZoomInOutlineIcon className='w-5 h-5 cursor-pointer' />
               {/* <AdjustmentsOutlineIcon className='w-5 h-5' /> */}
            </div>
            <div className='flex justify-center'>
               <div className='overflow-y-auto h-screen no-scrollbar'>
                  <article className='prose lg:prose-xl py-10'>
                     <h1>《九天神尊》 第一章：天命降临</h1>
                     <p>
                        九天之上，神秘莫测的宇宙，有着无尽的神灵和仙佛，传说中的九天神尊即将降临。
                        在一个古老的修炼世家，孤儿林逸生活着。他生性聪明机敏，但却被人看不起，因为他的修为在家族中是最低微的。然而，他内心深处却有着不屈的决心，他相信自己注定要成就一番伟业。
                        一天，一位神秘的老者来到了林逸的身边，他自称为天命使者。他告诉林逸，他是九天神尊的唯一传人，注定要成为九天之尊，统御万界。林逸虽然对此感到疑惑，但内心深处却充满了无尽的激动。
                        第二章：修炼之路
                     </p>
                     <p>
                        林逸决定离开家族，踏上修炼之路。他带着天命使者留下的一本古老经书，开始了漫长而艰辛的修炼。他在修炼的过程中遭遇了无数的困难和挑战，但他始终没有放弃。
                        经过数年的苦修，林逸终于突破了自己的修为，成为了一个强大的修士。他获得了神秘的天地之力，能够操控元素，驱使雷电，炼制丹药。他的名字开始在修真界传开，成为了无数修士仰慕和敬畏的对象。
                        第三章：战斗与阴谋
                     </p>
                     <p>
                        随着修为的提升，林逸逐渐揭开了九天神尊的秘密。原来，九天神尊的降临并非只是一种传说，而是一个伟大的阴谋。九天神尊的力量源自于九个神秘的天界，只有掌握了这九个天界的力量，才能真正成为九天神尊。
                        林逸决心要揭穿这个阴谋，他踏上了寻找九个天界的旅程。在这个过程中，他结识了许多志同道合的伙伴，一起面对各种危险和敌人。他们相互扶持，共同战斗，终于找到了第一个天界的
                     </p>
                     <p>
                        随着修为的提升，林逸逐渐揭开了九天神尊的秘密。原来，九天神尊的降临并非只是一种传说，而是一个伟大的阴谋。九天神尊的力量源自于九个神秘的天界，只有掌握了这九个天界的力量，才能真正成为九天神尊。
                        林逸决心要揭穿这个阴谋，他踏上了寻找九个天界的旅程。在这个过程中，他结识了许多志同道合的伙伴，一起面对各种危险和敌人。他们相互扶持，共同战斗，终于找到了第一个天界的
                     </p>
                     <p>
                        随着修为的提升，林逸逐渐揭开了九天神尊的秘密。原来，九天神尊的降临并非只是一种传说，而是一个伟大的阴谋。九天神尊的力量源自于九个神秘的天界，只有掌握了这九个天界的力量，才能真正成为九天神尊。
                        林逸决心要揭穿这个阴谋，他踏上了寻找九个天界的旅程。在这个过程中，他结识了许多志同道合的伙伴，一起面对各种危险和敌人。他们相互扶持，共同战斗，终于找到了第一个天界的
                     </p>{' '}
                     <p>
                        随着修为的提升，林逸逐渐揭开了九天神尊的秘密。原来，九天神尊的降临并非只是一种传说，而是一个伟大的阴谋。九天神尊的力量源自于九个神秘的天界，只有掌握了这九个天界的力量，才能真正成为九天神尊。
                        林逸决心要揭穿这个阴谋，他踏上了寻找九个天界的旅程。在这个过程中，他结识了许多志同道合的伙伴，一起面对各种危险和敌人。他们相互扶持，共同战斗，终于找到了第一个天界的
                     </p>{' '}
                     <p>
                        随着修为的提升，林逸逐渐揭开了九天神尊的秘密。原来，九天神尊的降临并非只是一种传说，而是一个伟大的阴谋。九天神尊的力量源自于九个神秘的天界，只有掌握了这九个天界的力量，才能真正成为九天神尊。
                        林逸决心要揭穿这个阴谋，他踏上了寻找九个天界的旅程。在这个过程中，他结识了许多志同道合的伙伴，一起面对各种危险和敌人。他们相互扶持，共同战斗，终于找到了第一个天界的
                     </p>
                  </article>
               </div>
            </div>
         </div>
      </div>
   )
}
