import clsx from 'clsx'
import countriesList from 'countries-list'
import { useEffect, useRef, useState } from 'react'

// 定义 countries 元素类型
type Country = {
   code: string
   name: string
   emoji: string
   number: string
}

let china: Country

const countries = Object.entries(countriesList.countries)
   .map(([countryCode, country]) => {
      const item = {
         code: countryCode,
         name: country.name,
         emoji: country.emoji,
         number: country.phone,
      }
      if (item.code === 'CN') {
         china = item
      }
      return item
   })
   .filter((item) => item.code !== 'TW')

// 这个 hooks 接收一个 dom 数组，如果点击事件不在这个 dom 数组内，就会触发回调
// 用于点击其他地方关闭弹窗
function useClickAway(
   callback: () => void,
   refs: React.MutableRefObject<HTMLElement | null>[],
) {
   useEffect(() => {
      function handleClickAway(event: MouseEvent) {
         if (
            !refs.some((item) => {
               return item.current?.contains(event.target as HTMLElement)
            })
         ) {
            callback()
         }
      }
      // 这里使用捕获阶段判断，有些元素禁止冒泡，比如 headlessui 的 modal 实现
      document.addEventListener('click', handleClickAway, true)
      return () => {
         document.removeEventListener('click', handleClickAway, true)
      }
   }, [])
}

export default function Example({ onSelected }: { onSelected?: () => void }) {
   const [selected, setSelected] = useState<Country | undefined>(
      china ?? countries[0],
   )
   const [query, setQuery] = useState('')

   // focus state
   const [isFocused, setIsFocused] = useState(false)

   // input ref
   const inputRef = useRef<HTMLInputElement>(null)

   // dropdown ref
   const dropdownRef = useRef<HTMLDivElement>(null)

   console.log('selected?.number', selected)

   // blur 处理事件
   useClickAway(() => {
      setIsFocused(false)
      setQuery('')
   }, [inputRef, dropdownRef])

   return (
      <div className='overflow-visible w-20 absolute'>
         <input
            ref={inputRef}
            value={
               isFocused
                  ? query || ''
                  : selected?.emoji + ' ' + selected?.number ?? query
            }
            onFocus={() => {
               setIsFocused(true)
            }}
            placeholder={
               isFocused ? selected?.emoji + ' ' + selected?.number : ''
            }
            // 点击 dropdown 的时候也会触发，这样就会导致 dropdown 点击失效，query 会被清空，重新渲染
            // onBlur={() => {
            //    setIsFocused(false)
            //    setQuery('')
            // }}
            onChange={(e) => setQuery(e.target.value)}
            className='px-4 w-full rounded-lg bg-transparent focus:outline-none h-12'
         ></input>
         <div
            ref={dropdownRef}
            className={clsx(
               'absolute -bottom-1 z-50 translate-y-full inset-x-0 min-w-max max-h-44 border rounded-md overflow-y-auto bg-white',
               {
                  hidden: !isFocused,
               },
            )}
         >
            {countries
               .filter((item) => {
                  // 根据 query 输入过滤
                  return (
                     item.name.toLowerCase().includes(query.toLowerCase()) ||
                     item.number.includes(query)
                  )
               })
               .map((item) => (
                  <div
                     key={item.code}
                     className='flex items-center justify-between gap-2 hover:bg-blue-100 py-1 px-2'
                     onClick={() => {
                        setSelected(item)
                        setQuery('')
                        setIsFocused(false)
                        onSelected?.()
                     }}
                  >
                     <div className='flex items-center gap-1'>
                        <div>{item.emoji}</div>
                        <div>+{item.number}</div>
                     </div>
                     <div className='text-sm'>{item.name}</div>
                  </div>
               ))}
         </div>
      </div>
   )
}
