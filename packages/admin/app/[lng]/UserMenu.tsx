'use client'

export const UserMenu = () => {
   return (
      <div>
         <img
            onClick={(event) => {
               event.preventDefault()
               window.authDialog?.openModal()
            }}
            src='/icons/user.svg'
            className='w-8'
         ></img>
      </div>
   )
}
