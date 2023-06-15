'use client'

import { UserContext } from '@/components/UserContext'
import { useUser } from '@/hooks/useUser'

export const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
   const { user } = useUser()

   return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
