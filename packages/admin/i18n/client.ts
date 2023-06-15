// 导入 i18next 包，i18next 是一个强大的国际化框架
import i18next from 'i18next'

// 导入资源到后端的插件，用于动态加载翻译资源
import resourcesToBackend from 'i18next-resources-to-backend'

// 导入 React 的 useEffect 钩子，用于在组件挂载或者更新时执行副作用函数
import { useEffect, useRef } from 'react'

// 导入一些 react-i18next 提供的工具和钩子
import {
   UseTranslationOptions,
   initReactI18next,
   useTranslation as useTranslationOrg, // 原生的 useTranslation 钩子，用于获取翻译函数和 i18next 实例
} from 'react-i18next'

// 导入语言检测器插件，用于自动检测用户的语言
import LanguageDetector from 'i18next-browser-languagedetector'

// 导入一些 i18next 的配置项
import { getOptions } from './settings'
import { I18nLng, I18nNamespace } from './types'

// 初始化 i18next 实例，并使用一些插件
i18next
   .use(initReactI18next) // 使用 initReactI18next 插件
   .use(LanguageDetector) // 使用 LanguageDetector 插件
   .use(
      resourcesToBackend(
         (language: string, namespace: string) =>
            // 使用 resourcesToBackend 插件，并设置动态导入翻译资源的函数
            import(`./locales/${language}/${namespace}.json`),
      ),
   )
   .init({
      // 初始化 i18next 实例，并设置一些配置项
      ...getOptions(),
      lng: undefined, // 让语言检测器自动检测语言
      detection: {
         order: ['path', 'htmlTag', 'cookie', 'navigator'], // 设置语言检测的顺序
      },
   })

// 检测当前代码是否运行在服务器端
const runsOnServerSide = typeof window === 'undefined'

// 导出一个新的 useTranslation 钩子，这个钩子会在必要的时候改变语言
export function useTranslation(
   lng: I18nLng,
   namespace: I18nNamespace = 'transition',
   options: UseTranslationOptions & { from?: string } = {},
) {
   const { from, ...rest } = options
   // !! useTranslation 返回的 i18next 不是全局的，但是有些属性是全局的，比如 resolvedLanguage，
   // !! 我们不能根据 resolvedLanguage 判断当前语言是否和预期的语言一致，所以我们需要自己维护一个 currentLng
   // !! 有些场景下，我们需要 changeLanguage 执行，来触发组件更新，如果用全局 resolvedLanguage 判断，就会跳过某些父组件的更新
   // 使用原生的 useTranslation 钩子获取翻译函数和 i18next 实例
   const ret = useTranslationOrg(namespace, rest)
   const { i18n } = ret
   const currentLngRef = useRef<string | undefined>(i18n.resolvedLanguage)

   // 如果当前运行在服务器端，并且语言和预期的语言不一致，就改变语言
   if (runsOnServerSide && i18n.resolvedLanguage !== lng) {
      i18n.changeLanguage(lng)
   } else {
      // 如果当前运行在客户端，就使用 useEffect 钩子在必要的时候改变语言
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
         if (currentLngRef.current === lng) return
         i18n.changeLanguage(lng)
         currentLngRef.current = lng
      }, [lng, i18n])
   }

   // 返回原生的 useTranslation 钩子的返回值
   return ret
}
