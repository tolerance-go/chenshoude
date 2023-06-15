import { User } from '@/../db/dist'
import request from '@/utils/request'
import { redirect } from 'next/navigation'
import useSWR from 'swr'

export const useUser = () => {
   const { data, error } = useSWR<User>('/api/users/session', (url) =>
      request.get(url).then((res) => res.data),
   )

   if (error) {
      console.error(error)
      redirect('/login')
   }

   return {
      user: data,
   }
}
