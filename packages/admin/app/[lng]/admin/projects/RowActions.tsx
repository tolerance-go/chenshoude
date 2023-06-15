import { BtnLoading } from '@/components/BtnLoading'
import request from '@/utils/request'
import { Project } from '@chenshoude-admin/db'
import { useState } from 'react'

export default function PublishAction({
   reload,
   updateProject,
   project,
   text,
}: {
   reload: () => void
   updateProject: (project: Project) => void
   project: Project
   text: string
}) {
   const [loading, setLoading] = useState(false)
   return (
      <div className='dropdown'>
         <label tabIndex={0} className='btn btn-sm btn-primary text-gray-50'>
            {text}
            {loading && <BtnLoading className='ml-1' />}
         </label>
         <ul
            tabIndex={0}
            className='dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 z-10'
         >
            <li>
               <a
                  onClick={async () => {
                     setLoading(true)
                     try {
                        const { data: newProject } = await request.post(
                           '/api/projects/render-static-node',
                           {
                              id: project.id,
                           },
                        )
                        updateProject(newProject)
                     } finally {
                        setLoading(false)
                     }
                  }}
               >
                  Web
               </a>
            </li>
         </ul>
      </div>
   )
}
