import express from 'express'

const viewsRouter = express.Router()

// viewsRouter.get(
//    '/views/:id',
//    catchErrorReturnHttp500(async function (req, res) {
//       if (!req.user) {
//          throw new Error('Unauthorized')
//       }

//       const project = await prisma.project.findUnique({
//          where: { id: parseInt(req.params.id) },
//       })

//       if (!project) throw new Error('Project not found')

//       res.render('page', { htmlContent: project?.pageHtml })
//    }),
// )

export { viewsRouter }
