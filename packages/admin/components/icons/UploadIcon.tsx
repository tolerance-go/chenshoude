interface Props {
   className?: string
}

const UploadIcon = (props: Props) => {
   return (
      <svg
         fill='none'
         viewBox='0 0 40 40'
         xmlns='http://www.w3.org/2000/svg'
         className={props.className}
      >
         <path
            d='M6 34C6 33.4696 6.21071 32.9609 6.58579 32.5858C6.96086 32.2107 7.46957 32 8 32H32C32.5304 32 33.0391 32.2107 33.4142 32.5858C33.7893 32.9609 34 33.4696 34 34C34 34.5304 33.7893 35.0391 33.4142 35.4142C33.0391 35.7893 32.5304 36 32 36H8C7.46957 36 6.96086 35.7893 6.58579 35.4142C6.21071 35.0391 6 34.5304 6 34ZM12.586 13.414C12.2111 13.0389 12.0004 12.5303 12.0004 12C12.0004 11.4697 12.2111 10.9611 12.586 10.586L18.586 4.586C18.9611 4.21106 19.4697 4.00043 20 4.00043C20.5303 4.00043 21.0389 4.21106 21.414 4.586L27.414 10.586C27.7783 10.9632 27.9799 11.4684 27.9753 11.9928C27.9708 12.5172 27.7605 13.0188 27.3896 13.3896C27.0188 13.7605 26.5172 13.9708 25.9928 13.9753C25.4684 13.9799 24.9632 13.7783 24.586 13.414L22 10.828V26C22 26.5304 21.7893 27.0391 21.4142 27.4142C21.0391 27.7893 20.5304 28 20 28C19.4696 28 18.9609 27.7893 18.5858 27.4142C18.2107 27.0391 18 26.5304 18 26V10.828L15.414 13.414C15.0389 13.7889 14.5303 13.9996 14 13.9996C13.4697 13.9996 12.9611 13.7889 12.586 13.414Z'
            fill='currentColor'
            fillRule='evenodd'
         />
      </svg>
   )
}

export default UploadIcon
