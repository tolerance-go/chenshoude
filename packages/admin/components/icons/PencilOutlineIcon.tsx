'use client'

interface Props extends React.SVGProps<SVGSVGElement> {}

const PencilOutlineIcon = (props: Props) => {
   return (
      <svg
         {...props}
         fill='none'
         viewBox='0 0 24 24'
         xmlns='http://www.w3.org/2000/svg'
      >
         <path
            d='M15.232 5.23196L18.768 8.76796M16.732 3.73196C17.2009 3.26306 17.8369 2.99963 18.5 2.99963C19.1631 2.99963 19.7991 3.26306 20.268 3.73196C20.7369 4.20087 21.0003 4.83683 21.0003 5.49996C21.0003 6.16309 20.7369 6.79906 20.268 7.26796L6.5 21.036H3V17.464L16.732 3.73196Z'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
         />
      </svg>
   )
}

export default PencilOutlineIcon
