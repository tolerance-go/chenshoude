import { User } from '@chenshoude-admin/db'
import { createContext } from 'react'

// The type of the context value
export interface UserContextType extends User {}

// Create the context
export const UserContext = createContext<UserContextType | undefined>(undefined)
