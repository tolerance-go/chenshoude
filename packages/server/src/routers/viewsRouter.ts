import prisma from '@chenshoude-admin/db'
import express from 'express'
import { catchErrors } from '../utils/catchErrors'

const viewsRouter = express.Router()

viewsRouter.get(
   '/views/:id',
   catchErrors(async function (req, res) {
      if (!req.user) {
         throw new Error('Unauthorized')
      }

      const project = await prisma.project.findUnique({
         where: { id: parseInt(req.params.id) },
      })

      if (!project) throw new Error('Project not found')

      res.render('page', { htmlContent: project?.pageHtml })
   }),
)

export { viewsRouter }
