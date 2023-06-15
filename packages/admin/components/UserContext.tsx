import { User } from '@chenshoude-admin/db'
import { createContext, useContext } from 'react'

// The type of the context value
export interface UserContextType extends User {}

// Create the context
export const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUserContext = () => {
   const context = useContext(UserContext)
   return context
}
