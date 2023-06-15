'use client'

import { useLanguageContext } from '@/components/LanguageContext'
import { useTranslation } from '@/i18n/client'
import request from '@/utils/request'
import { Project } from '@chenshoude-admin/db'
import clsx from 'clsx'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-toastify'
import useSWR from 'swr'
import PublishAction from './RowActions'

export function ProjectTable() {
   const { lng } = useLanguageContext()
   const { t } = useTranslation(lng, 'admin')

   const [key, setKey] = useState('')
   const { data, mutate } = useSWR('/api/projects?random=' + key, (url) =>
      request.get<Project[]>(url).then((res) => res.data),
   )

   return (
      <table className='w-full text-sm text-left text-gray-500 dark:text-gray-400'>
         <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
               <th scope='col' className='px-6 py-3'>
                  {t('projects.appName')}
               </th>
               <th scope='col' className='px-6 py-3'>
                  {t('projects.operation')}
               </th>
            </tr>
         </thead>
         <tbody>
            {data?.map((project, index) => (
               <tr
                  key={index}
                  className={clsx(`border-b dark:border-gray-700`, {
                     'bg-gray-50 dark:bg-gray-800': index % 2,
                     'bg-white dark:bg-gray-900': !(index % 2),
                  })}
               >
                  <th
                     scope='row'
                     className='px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white'
                  >
                     {project.name}
                  </th>
                  <td className='px-6 py-4'>
                     {/* <a
                        href='#'
                        className='font-medium text-blue-600 dark:text-blue-500 hover:underline'
                     >
                        预览
                     </a> */}
                     <div className='flex items-center gap-4'>
                        <PublishAction
                           reload={() => {
                              setKey(Date.now().toString())
                           }}
                           text={t('projects.publish')}
                           updateProject={(project) => {
                              mutate((prev) => {
                                 if (prev) {
                                    const cloned = [...prev]
                                    cloned.splice(index, 1, project)
                                    return cloned
                                 }
                                 return prev
                              })
                           }}
                           project={project}
                        />
                        {project.pageHtml && (
                           <Link
                              target='_blank'
                              href={'/views/' + project.id}
                              className='text-blue-500 link link-hover'
                           >
                              Web
                           </Link>
                        )}
                        {/* Open the modal using ID.showModal() method */}
                        <a
                           className='link link-error link-hover'
                           onClick={() =>
                              window[
                                 `project_remove_modal-${project.name}`
                              ]?.showModal()
                           }
                        >
                           {t('projects.delete')}
                        </a>
                        <dialog
                           id={`project_remove_modal-${project.name}`}
                           className='modal'
                        >
                           <form method='dialog' className='modal-box'>
                              <h3 className='font-bold text-lg'>
                                 {t('projects.confirmDelete')}
                              </h3>
                              <p className='py-4'>
                                 {t('projects.deletingProject')} {project.name}
                              </p>
                              <div className='modal-action'>
                                 {/* if there is a button in form, it will close the modal */}
                                 <button className='btn'>
                                    {t('projects.cancel')}
                                 </button>
                                 <button
                                    className='btn btn-primary text-gray-50'
                                    onClick={async () => {
                                       try {
                                          await request.delete(
                                             `/api/projects/${project.id}`,
                                          )
                                          toast.success(
                                             t('projects.deletedSuccessfully'),
                                          )
                                          mutate((prev) => {
                                             if (prev) {
                                                const cloned = [...prev]
                                                cloned.splice(index, 1)
                                                return cloned
                                             }
                                             return prev
                                          })
                                       } catch (error) {
                                          // ignore
                                       }
                                    }}
                                 >
                                    {t('projects.confirm')}
                                 </button>
                              </div>
                           </form>
                        </dialog>
                     </div>
                  </td>
               </tr>
            ))}
         </tbody>
      </table>
   )
}
