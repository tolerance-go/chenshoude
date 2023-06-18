import './globals.css'

import { GlobalModal } from '@/components/GlobalModal'
import { GlobalToast } from '@/components/GlobalToast'
import { dir } from 'i18next'
import { Metadata, ResolvingMetadata } from 'next'
import { useTranslation } from '../../i18n'
import { fallbackLng, languages } from '../../i18n/settings'
import { I18nLng } from '../../i18n/types'
import { LanguageContextWrapper } from './LanguageContextWrapper'
import { UserContextWrapper } from './UserContextWrapper'

export async function generateMetadata(
   {
      params: { lng },
   }: {
      params: { lng: I18nLng }
   },
   parent?: ResolvingMetadata,
): Promise<Metadata> {
   if (languages.indexOf(lng) < 0) lng = fallbackLng
   // eslint-disable-next-line react-hooks/rules-of-hooks
   const { t } = await useTranslation(lng)

   return {
      title: t('adminTitle'),
      description: t('adminDesc'),
   }
}

/**
 *
 * 总的来说，generateStaticParams 是一种优化静态页面生成的策略，尤其是在处理动态路由时。
 * 通过在构建时间就生成所有可能的静态页面，而不是等到请求时间，可以大大提高响应速度，并允许搜索引擎更好地索引你的网站内容。
 */
export async function generateStaticParams() {
   return languages.map((lng) => ({ lng }))
}

export default async function RootLayout({
   children,
   params: { lng },
}: {
   children: React.ReactNode
   params: { lng: string }
}) {
   const dir_ = dir(lng)

   // https://github.com/vercel/next.js/issues/49373
   // const cookieStore = cookies()

   // const i18nCookie = cookieStore.get(I18N_COOKIE_NAME)
   // const serverCookie = cookieStore.get(EXPRESS_SESSION_SID)

   // await request.get('/api/session')

   return (
      <html lang={lng} dir={dir(lng)} data-theme='light'>
         <UserContextWrapper>
            <LanguageContextWrapper lng={lng === 'zh' ? 'zh' : 'en'} dir={dir_}>
               <body>
                  {children}
                  <GlobalModal />
                  <GlobalToast />
               </body>
            </LanguageContextWrapper>
         </UserContextWrapper>
      </html>
   )
}
