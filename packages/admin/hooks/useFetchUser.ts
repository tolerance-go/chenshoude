import { User } from '@/../db/dist'
import request from '@/utils/request'
import useSWR from 'swr'

export const useFetchUser = () => {
   const { data, error } = useSWR<User>('/api/users/session', (url) =>
      request.get(url).then((res) => res.data),
   )

   if (error) {
      return {}
   }

   return {
      user: data,
   }
}
