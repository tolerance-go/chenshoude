interface Props {
   className?: string
}

const StarIcon = (props: Props) => {
   return (
      <svg
         fill='none'
         viewBox='0 0 24 24'
         xmlns='http://www.w3.org/2000/svg'
         className={props.className}
      >
         <path
            d='M11.049 2.92708C11.349 2.00608 12.652 2.00608 12.951 2.92708L14.47 7.60108C14.5354 7.80157 14.6625 7.97626 14.8331 8.10018C15.0037 8.22411 15.2091 8.29092 15.42 8.29108H20.335C21.304 8.29108 21.706 9.53108 20.923 10.1011L16.947 12.9891C16.7762 13.1132 16.6491 13.2883 16.5839 13.4891C16.5187 13.6899 16.5187 13.9063 16.584 14.1071L18.102 18.7811C18.402 19.7031 17.347 20.4691 16.564 19.8991L12.588 17.0111C12.4171 16.8869 12.2113 16.8199 12 16.8199C11.7887 16.8199 11.5829 16.8869 11.412 17.0111L7.436 19.8991C6.653 20.4691 5.598 19.7021 5.898 18.7811L7.416 14.1071C7.48128 13.9063 7.48132 13.6899 7.41611 13.4891C7.3509 13.2883 7.2238 13.1132 7.053 12.9891L3.077 10.1011C2.293 9.53108 2.697 8.29108 3.665 8.29108H8.579C8.79005 8.29113 8.99571 8.22442 9.16653 8.10048C9.33735 7.97654 9.46458 7.80173 9.53 7.60108L11.049 2.92708Z'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
         />
      </svg>
   )
}

export default StarIcon
