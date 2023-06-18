interface SMSResponse {
   success: boolean
   message: string
}

class SMSService {
   sendSMS(phoneNumber: string, code: string): SMSResponse {
      // 实现发送短信的逻辑，可以是真实的短信服务商的 SDK 或 API 调用
      // 这里只是模拟实现，直接打印日志
      console.log(`Sending SMS to ${phoneNumber}: Verification code is ${code}`)
      return { success: true, message: 'SMS sent successfully' }
   }
}

// 创建一个模拟的 smsService 实例
export const smsService = new SMSService()
