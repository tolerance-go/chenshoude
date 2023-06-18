export function mergeRefs<T>(...refs: React.Ref<T>[]): React.RefCallback<T> {
   return (value: T) => {
      refs.forEach((ref) => {
         if (typeof ref === 'function') {
            ref(value)
         } else if (ref != null) {
            ;(ref as React.MutableRefObject<T>).current = value
         }
      })
   }
}
