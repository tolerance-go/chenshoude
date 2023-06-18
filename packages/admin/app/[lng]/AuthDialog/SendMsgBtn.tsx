'use client'

/**
 * 修改代码，支持调用接口发送验证码，30秒之内不能再次发送，发送后显示倒计时，数据存储在浏览器端，刷新后依然从上次倒计时开始
 */
import { useEffect, useState } from 'react'

export const SendMsgBtn = () => {
   const [countdown, setCountdown] = useState(0)

   // 从 localStorage 中获取上次发送验证码的倒计时
   useEffect(() => {
      const savedCountdown = localStorage.getItem('countdown')
      if (savedCountdown) {
         const remainingTime =
            parseInt(savedCountdown) - Math.floor(Date.now() / 1000)
         if (remainingTime > 0) {
            setCountdown(remainingTime)
         }
      }
   }, [])

   // 处理发送验证码按钮点击事件
   const handleSendMsgClick = () => {
      if (countdown > 0) return // 倒计时中，不允许再次发送验证码

      const newCountdown = 30 // 设置倒计时时长（秒）
      setCountdown(newCountdown)
      localStorage.setItem(
         'countdown',
         (Math.floor(Date.now() / 1000) + newCountdown).toString(),
      )
   }

   // 每秒更新倒计时
   useEffect(() => {
      let timer: ReturnType<typeof setInterval> | undefined
      if (countdown > 0) {
         timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1)
         }, 1000)
      }

      return () => {
         clearInterval(timer)
      }
   }, [countdown])

   return (
      <button
         className='flex-none bg-gray-200 rounded-lg flex items-center justify-center w-32 disabled:cursor-not-allowed'
         onClick={handleSendMsgClick}
         disabled={countdown > 0}
      >
         {countdown > 0 ? `重新发送(${countdown})` : '发送验证码'}
      </button>
   )
}
