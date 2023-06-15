import Page from '@/components/Page'
import { useTranslation } from '@/i18n'
import { I18nLng } from '@/i18n/types'
import { ProjectTable } from './ProjectTable'

export default async function Project({
   params: { lng },
}: {
   params: { lng: I18nLng }
}) {
   const { t } = await useTranslation(lng, 'admin')
   return (
      <Page title={t('projects.appManage')}>
         <ProjectTable />
      </Page>
   )
}
