// 导入i18next的createInstance方法，这个方法用于创建一个i18next实例
import { createInstance } from 'i18next'
// 导入i18next-resources-to-backend插件，这个插件用于从服务器加载本地化资源
import resourcesToBackend from 'i18next-resources-to-backend'
// 导入initReactI18next，这是一个可以将i18next集成到React中的工具
import { initReactI18next } from 'react-i18next/initReactI18next'
// 导入getOptions方法，这个方法应该会返回初始化i18next所需要的配置对象
import { getOptions } from './settings'
// 导入I18nLng和I18nNamespace类型，这两个类型可能用于约束语言和命名空间的字符串类型
import { I18nLng, I18nNamespace } from './types'

// 定义一个函数initI18next，这个函数将接收语言和命名空间作为参数
const initI18next = async (lng: string, namespace: string) => {
   // 在服务器端，我们为每次渲染都创建一个新的i18next实例，因为在编译过程中，所有操作似乎都是并行执行的
   const i18nInstance = createInstance()
   // 初始化i18next实例
   await i18nInstance
      // 使用initReactI18next插件
      .use(initReactI18next)
      // 使用resourcesToBackend插件，并通过函数的方式指定资源的加载路径
      .use(
         resourcesToBackend(
            (language: string, namespace: string) =>
               import(`./locales/${language}/${namespace}.json`),
         ),
      )
      // 调用init方法来初始化i18next实例，并传入getOptions方法生成的配置对象
      .init(getOptions(lng, namespace))
   // 返回初始化好的i18next实例
   return i18nInstance
}

// 定义一个名为useTranslation的函数，这个函数也接收语言和命名空间作为参数，且命名空间有默认值'transition'
export async function useTranslation(
   lng: I18nLng,
   namespace: I18nNamespace = 'transition',
) {
   // 调用initI18next函数来获取一个初始化好的i18next实例
   const i18nextInstance = await initI18next(lng, namespace)
   // 返回一个对象，对象包含一个t方法和一个i18n属性
   // t方法是i18next实例的getFixedT方法，这个方法用于获取特定语言和命名空间的翻译函数
   // i18n属性则是i18next实例本身
   return {
      t: i18nextInstance.getFixedT(lng, namespace),
      i18n: i18nextInstance,
   }
}
