import { UserContext } from '@/components/UserContext'
import { useContext } from 'react'

export const useUserContext = () => {
   const context = useContext(UserContext)
   return context
}
