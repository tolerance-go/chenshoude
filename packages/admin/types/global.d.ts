export declare global {
   interface Window {
      [key: string]: any // 这里声明 window 对象可以有任何 string 类型的 key，并且值类型是 any
   }
}
