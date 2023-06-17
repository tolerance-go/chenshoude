export default function Badge(props: { children?: React.ReactNode }) {
   return (
      <span className='px-2 text-sm py-1 border inline-block rounded-full border-black'>
         {props.children}
      </span>
   )
}
