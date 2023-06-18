'use client'

import { validatePhoneNumber } from '@/utils/validatePhoneNumber'
import clsx from 'clsx'
/**
 * 在浏览器中，当一个表单（form）包含一个输入框（input）和一个按钮（button）时，按下回车键通常会触发与按钮关联的点击事件。这是因为按钮默认情况下会被视为表单的默认提交按钮，而在输入框中按下回车键会触发表单的提交行为。

当按下回车键时，浏览器会尝试找到最近的按钮元素并模拟点击事件。如果在输入框旁边有一个按钮，并且该按钮没有被禁用（disabled），浏览器会将回车键事件传递给该按钮，触发与该按钮关联的点击事件。

这种行为是浏览器默认的表单交互行为，旨在提供方便的用户体验。用户可以在输入完成后直接按下回车键，而不需要手动定位和点击按钮来提交表单。

如果你希望阻止按下回车键时触发按钮点击事件，你可以使用以下方法之一：

将按钮的 type 属性设置为 "button"，而不是默认的 "submit"。这样做会阻止按钮被视为默认的表单提交按钮。
 */

/**
 * 修改代码，支持调用接口发送验证码，30秒之内不能再次发送，发送后显示倒计时，数据存储在浏览器端，刷新后依然从上次倒计时开始
 */
import { useEffect, useState } from 'react'
import { useWatch } from 'react-hook-form'

export const SendMsgBtn = ({ control }: { control: any }) => {
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

   const countryCode = useWatch({
      control,
      name: 'countryCode',
   })

   const phoneNumber = useWatch({
      control,
      name: 'phoneNumber',
   })

   const phoneNumberError = !validatePhoneNumber(countryCode, phoneNumber)

   const disabled = !phoneNumber || !!phoneNumberError || countdown > 0

   return (
      <button
         className={clsx(
            'flex-none bg-gray-200 rounded-lg flex items-center justify-center w-32 disabled:cursor-not-allowed',
            'disabled:text-gray-500 disabled:opacity-70',
         )}
         onClick={handleSendMsgClick}
         disabled={disabled}
      >
         {countdown > 0 ? `重新发送(${countdown})` : '发送验证码'}
      </button>
   )
}
