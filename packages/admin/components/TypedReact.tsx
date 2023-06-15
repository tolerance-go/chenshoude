import { useEffect, useRef } from 'react'
import Typed from 'typed.js'

const TypedReact = ({ strings }: { strings: string[] }) => {
   const typedTarget = useRef(null)

   useEffect(() => {
      const typed = new Typed(typedTarget.current, {
         strings: strings,
         typeSpeed: 40,
         backSpeed: 40,
      })

      return () => {
         typed.destroy()
      }
   }, [strings])

   return <span ref={typedTarget} />
}

export default TypedReact
