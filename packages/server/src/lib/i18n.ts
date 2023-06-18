import i18n from 'i18n'

i18n.configure({
   locales: ['en', 'zh'],
   directory: __dirname + '/locales',
   defaultLocale: 'en',
   autoReload: true,
   cookie: 'mictooon.lng',
})
