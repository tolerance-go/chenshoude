import Badge from '@/components/Badge'
import DetailHeaderImage from '@/components/DetailHeaderImage'
import EditorItem from '@/components/EditorItem'
import ImageUpload from '@/components/ImageUpload'
import UserBar from '@/components/UserBar'
import {
   EllipsisHorizontalIcon,
   PaperAirplaneIcon,
} from '@heroicons/react/24/outline'
import TabGroup from './TabGroup'

export default function StoryEditor() {
   return (
      <div className='flex items-stretch h-screen'>
         <div className='w-1/5 flex flex-col border-r overflow-y-auto no-scrollbar'>
            <div className='flex-grow'>
               <div className='relative'>
                  <DetailHeaderImage />
                  <ImageUpload className='w-5 h-5' />
               </div>
               <TabGroup />
               <div>
                  <div className='flex justify-between px-1 items-center relative'>
                     <span>目录</span>
                  </div>
                  <div className='border-t mt-1'>
                     {['第一章', '第二章', '第三章'].map((item, index) => {
                        return (
                           <div
                              className='flex items-center border-b'
                              key={index}
                           >
                              <div className='relative'>
                                 <img
                                    className='h-16 w-16 object-cover'
                                    src='https://images.openai.com/blob/992f3298-aa47-47df-9ab0-e75d3aa1d116/openai-cybersecurity-grant-program.png?trim=0,0,0,0&width=800'
                                 ></img>
                                 <ImageUpload className='w-3.5 h-3.5' />
                              </div>
                              <span className='flex-grow px-4'>
                                 <EditorItem
                                    defaultText={item}
                                    inputMaxLength={12}
                                    inputMaxWidth='12rem'
                                 />
                              </span>
                              <div className='flex items-center gap-3 px-1'>
                                 <span>#91</span>
                              </div>
                           </div>
                        )
                     })}
                  </div>
                  <div className='transform mt-4 mx-2 active:scale-95 transition-transform duration-50 border cursor-pointer shadow-md border-gray-950 flex-1 text-center px-10 py-5 rounded-full'>
                     新增章节
                  </div>
               </div>
            </div>
            <UserBar />
         </div>
         <div className='flex-grow overflow-y-auto h-screen no-scrollbar'>
            <div className='flex justify-center'>
               <article className='prose py-10'>
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
         <div className='w-1/3 border-l flex flex-col'>
            <div className='flex-grow overflow-y-auto no-scrollbar'>
               <div className='flex h-full flex-col bg-white'>
                  <div className='flex flex-none border-b h-10 justify-between items-center px-2'>
                     <div></div>
                     <div>小创</div>
                     <EllipsisHorizontalIcon className='w-5 h-5' />
                  </div>
                  <div className='flex-1 overflow-y-auto py-4'>
                     {[
                        {
                           id: 1,
                           name: 'John Doe',
                           avatar:
                              'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                           message:
                              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                           isOwnMessage: false,
                        },
                        {
                           id: 2,
                           name: 'Jesse',
                           avatar:
                              'https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                           message:
                              'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
                           isOwnMessage: true,
                        },
                        // ...更多聊天数据
                     ].map(({ id, name, avatar, message, isOwnMessage }) => (
                        <div
                           className={`mb-4 flex ${
                              isOwnMessage ? 'flex-row-reverse' : ''
                           } items-start`}
                           key={id}
                        >
                           <div
                              className={`flex flex-none flex-col items-center justify-center space-y-1 w-20`}
                           >
                              <img
                                 className='h-10 w-10 rounded-full'
                                 src={avatar}
                              />
                              <a
                                 href='#'
                                 className='block text-xs hover:underline'
                              >
                                 {name}
                              </a>
                           </div>
                           <div
                              className={`relative mb-2 flex-1 rounded-lg ${
                                 isOwnMessage ? 'bg-blue-100' : 'bg-blue-400'
                              } px-4 py-2 ${
                                 isOwnMessage ? 'text-gray-800' : 'text-white'
                              }`}
                           >
                              <div>{message}</div>
                              {/* arrow */}
                              <div
                                 className={`absolute ${
                                    isOwnMessage ? 'right' : 'left'
                                 }-0 top-5 h-2 w-2 ${
                                    isOwnMessage
                                       ? 'translate-x-1/2'
                                       : '-translate-x-1/2'
                                 } rotate-45 transform ${
                                    isOwnMessage ? 'bg-blue-100' : 'bg-blue-400'
                                 }`}
                              />
                              {/* end arrow */}
                           </div>
                           <div className='w-20 flex-none'></div>
                        </div>
                     ))}
                  </div>
               </div>
            </div>
            <div className='h-48 border-t flex-none flex flex-col p-2'>
               <div className='flex-none flex items-center'>
                  <span className='text-gray-400 text-sm'>常用代词:</span>
                  <div className='flex gap-2 ml-2'>
                     {['标签1', '标签2'].map((item, index) => {
                        return <Badge key={index}>{item}</Badge>
                     })}
                  </div>
                  <PaperAirplaneIcon className='w-5 h-5 absolute right-4 bottom-4' />
               </div>
               <textarea
                  placeholder='请输入'
                  className='outline-none w-full flex-grow mt-2'
               ></textarea>
            </div>
         </div>
      </div>
   )
}
