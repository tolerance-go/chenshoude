interface Props {
   className?: string
}

const SortUp = (props: Props) => {
   return (
      <svg
         fill='none'
         viewBox='0 0 20 20'
         xmlns='http://www.w3.org/2000/svg'
         className={props.className}
      >
         <path
            d='M3 3C2.73478 3 2.48043 3.10536 2.29289 3.29289C2.10536 3.48043 2 3.73478 2 4C2 4.26522 2.10536 4.51957 2.29289 4.70711C2.48043 4.89464 2.73478 5 3 5H14C14.2652 5 14.5196 4.89464 14.7071 4.70711C14.8946 4.51957 15 4.26522 15 4C15 3.73478 14.8946 3.48043 14.7071 3.29289C14.5196 3.10536 14.2652 3 14 3H3ZM3 7C2.73478 7 2.48043 7.10536 2.29289 7.29289C2.10536 7.48043 2 7.73478 2 8C2 8.26522 2.10536 8.51957 2.29289 8.70711C2.48043 8.89464 2.73478 9 3 9H8C8.26522 9 8.51957 8.89464 8.70711 8.70711C8.89464 8.51957 9 8.26522 9 8C9 7.73478 8.89464 7.48043 8.70711 7.29289C8.51957 7.10536 8.26522 7 8 7H3ZM3 11C2.73478 11 2.48043 11.1054 2.29289 11.2929C2.10536 11.4804 2 11.7348 2 12C2 12.2652 2.10536 12.5196 2.29289 12.7071C2.48043 12.8946 2.73478 13 3 13H7C7.26522 13 7.51957 12.8946 7.70711 12.7071C7.89464 12.5196 8 12.2652 8 12C8 11.7348 7.89464 11.4804 7.70711 11.2929C7.51957 11.1054 7.26522 11 7 11H3ZM13 16C13 16.2652 13.1054 16.5196 13.2929 16.7071C13.4804 16.8946 13.7348 17 14 17C14.2652 17 14.5196 16.8946 14.7071 16.7071C14.8946 16.5196 15 16.2652 15 16V10.414L16.293 11.707C16.4816 11.8892 16.7342 11.99 16.9964 11.9877C17.2586 11.9854 17.5094 11.8802 17.6948 11.6948C17.8802 11.5094 17.9854 11.2586 17.9877 10.9964C17.99 10.7342 17.8892 10.4816 17.707 10.293L14.707 7.293C14.5195 7.10553 14.2652 7.00021 14 7.00021C13.7348 7.00021 13.4805 7.10553 13.293 7.293L10.293 10.293C10.1975 10.3852 10.1213 10.4956 10.0689 10.6176C10.0165 10.7396 9.9889 10.8708 9.98775 11.0036C9.9866 11.1364 10.0119 11.2681 10.0622 11.391C10.1125 11.5139 10.1867 11.6255 10.2806 11.7194C10.3745 11.8133 10.4861 11.8875 10.609 11.9378C10.7319 11.9881 10.8636 12.0134 10.9964 12.0123C11.1292 12.0111 11.2604 11.9835 11.3824 11.9311C11.5044 11.8787 11.6148 11.8025 11.707 11.707L13 10.414V16Z'
            fill='currentColor'
         />
      </svg>
   )
}

export default SortUp