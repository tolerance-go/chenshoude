'use client'

export const UserMenu = () => {
   return (
      <div>
         <img
            onClick={() => window.authDialog.showModal()}
            src='/icons/user.svg'
            className='w-8'
         ></img>
      </div>
   )
}
