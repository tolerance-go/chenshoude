'use client'

import { UserContext } from '@/components/UserContext'
import { useFetchUser } from '@/hooks/useFetchUser'

export const UserContextWrapper = ({
   children,
}: {
   children: React.ReactNode
}) => {
   const { user } = useFetchUser()

   return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}
