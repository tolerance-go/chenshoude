// 引入 'accept-language'，一个处理 HTTP Accept-Language 请求头的库
import acceptLanguage from 'accept-language'

// 引入 'next/server' 中的 NextRequest 和 NextResponse
import { NextRequest, NextResponse } from 'next/server'

// 引入你的 i18n 设置，包括备用语言和所有支持的语言
import { I18N_COOKIE_NAME } from '@chenshoude-admin/common/dist/constants'
import { fallbackLng, languages } from './i18n/settings'

// 将所有的支持语言传给 'accept-language' 库
acceptLanguage.languages(languages)

// 导出一个配置对象，其中 matcher 属性用来匹配路由
export const config = {
   matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)'],
}

// 设置一个 cookie 名字，用于存储当前的语言
const cookieName = I18N_COOKIE_NAME

// 中间件函数，用于处理进入的请求
export function middleware(req: NextRequest) {
   // 如果请求路径包含 'icon' 或 'chrome'，则跳过此次处理，直接返回
   if (
      req.nextUrl.pathname.indexOf('icon') > -1 ||
      req.nextUrl.pathname.indexOf('chrome') > -1
   )
      return NextResponse.next()

   // 用于存储解析出的语言
   let lng: string | null = null

   // 如果请求中包含语言的 cookie，那么尝试从 cookie 中获取语言
   if (req.cookies.has(cookieName)) {
      lng = acceptLanguage.get(req.cookies.get(cookieName)!.value)
   }

   // 如果还没有找到语言，那么尝试从 'Accept-Language' 请求头中获取语言
   if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language')!)

   // 如果还没有找到语言，那么使用默认的备用语言
   if (!lng) lng = fallbackLng

   // 如果请求路径不包含任何支持的语言，并且路径不以 '/_next' 开头，那么进行重定向，将语言添加到路径中
   if (
      !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
      !req.nextUrl.pathname.startsWith('/_next')
   ) {
      return NextResponse.redirect(
         new URL(`/${lng}${req.nextUrl.pathname}`, req.url),
      )
   }

   const last = languages.find((l) => req.nextUrl.pathname.startsWith(`/${l}`))
   const response = NextResponse.next()
   if (last) response.cookies.set(cookieName, last)

   return response
}
