interface Props {
   className?: string
}

const ArrowsExpandOutlineIcon = (props: Props) => {
   return (
      <svg
         fill='none'
         viewBox='0 0 40 40'
         xmlns='http://www.w3.org/2000/svg'
         className={props.className}
      >
         <path
            d='M6.66663 13.3333V6.66663M6.66663 6.66663H13.3333M6.66663 6.66663L15 15M33.3333 13.3333V6.66663M33.3333 6.66663H26.6666M33.3333 6.66663L25 15M6.66663 26.6666V33.3333M6.66663 33.3333H13.3333M6.66663 33.3333L15 25M33.3333 33.3333L25 25M33.3333 33.3333V26.6666M33.3333 33.3333H26.6666'
            stroke='black'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
         />
      </svg>
   )
}

export default ArrowsExpandOutlineIcon
