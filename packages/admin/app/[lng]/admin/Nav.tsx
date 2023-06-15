'use client'

import clsx from 'clsx'
import Link from 'next/link'

import { usePathname } from 'next/navigation'
import { match } from 'path-to-regexp'

const navItems = [
   {
      name: 'projects',
      path: '/admin/projects',
      svg: (
         <svg
            aria-hidden='true'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            className='h-6 w-6'
         >
            <path
               strokeLinecap='round'
               strokeLinejoin='round'
               strokeWidth='2'
               d='M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z'
            />
         </svg>
      ),
   },
   // {
   //    name: 'Dashboard',
   //    svg: (
   //       <svg
   //          aria-hidden='true'
   //          fill='none'
   //          viewBox='0 0 24 24'
   //          stroke='currentColor'
   //          className='h-6 w-6'
   //       >
   //          <path
   //             strokeLinecap='round'
   //             strokeLinejoin='round'
   //             strokeWidth='2'
   //             d='M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
   //          />
   //       </svg>
   //    ),
   // },
]

function extractParams(
   path: string,
   pattern: string,
): Record<string, string | undefined> {
   const matchFn = match(pattern, { decode: decodeURIComponent })
   const result = matchFn(path)
   if (result) {
      const { params } = result
      return params as Record<string, string>
   } else {
      return {}
   }
}

export function Nav() {
   const pathname = usePathname()

   const pattern = '/:lng/admin/:pageItem?'
   const { lng, pageItem } = extractParams(pathname, pattern)
   console.log(lng, pathname, pageItem)

   return (
      <nav className='flex flex-col mx-4 my-6 space-y-4'>
         {navItems.map((item, index) => (
            <Link
               key={index}
               href={`/${lng}${item.path}`}
               className={clsx(
                  'inline-flex items-center justify-center py-3 hover:bg-gray-700 rounded-lg',
                  {
                     'text-gray-400': pageItem !== item.name,
                     'text-blue-400 bg-gray-700': pageItem === item.name,
                  },
               )}
            >
               {item.svg}
            </Link>
         ))}
      </nav>
   )
}
