import prisma from '@chenshoude-admin/db'
import {
   BaseConvertSettings,
   ServerNode,
   renderStaticNode,
} from '@chenshoude/render-static-node'
import express from 'express'
import fs from 'fs'
import multer from 'multer'
import path from 'path'
import { pluginAuthenticate } from '../middleware/pluginAuthenticate'
import { assignParents } from '../utils/assignParents'
import { catchErrors } from '../utils/catchErrors'

/**
 * multer 会生成一个随机名字作为文件名，以防止上传的文件名之间有冲突。
 * 如果你希望保持原始的文件名，你可以在 multer 的配置中指定 filename 函数。
 * 这个函数接受三个参数：请求对象、文件对象和一个回调。你可以在这个函数中设置文件名。
 */
const storage = multer.diskStorage({
   destination: function (req, file, cb) {
      // 如果 uploads/${req.user!.id}/ 目录不存在，就创建它
      // 构建目标路径
      const dir = path.join(process.cwd(), 'uploads', String(req.user!.id))

      // 检查目标路径是否存在，如果不存在，则创建它
      if (!fs.existsSync(dir)) {
         fs.mkdirSync(dir, { recursive: true })
      }

      cb(null, 'uploads/' + req.user!.id + '/')
   },
   filename: function (req, file, cb) {
      cb(null, file.originalname) // 使用原始的文件名
   },
})

const upload = multer({
   storage,
   limits: { fileSize: 10000000 }, // 10MB
})

const projectRouter = express.Router()

projectRouter.get(
   '/projects',
   catchErrors(async (req, res) => {
      if (!req.user) {
         throw new Error('Unauthorized')
      }
      const { page, limit } = req.query
      const pageNumber = page ? parseInt(page as string) : 1
      const pageSize = limit ? parseInt(limit as string) : 10
      const projects = await prisma.project.findMany({
         where: { userId: req.user.id },
         skip: (pageNumber - 1) * pageSize,
         take: pageSize,
         // 按照时间倒序
         orderBy: { updatedAt: 'desc' },
      })
      res.json(projects)
   }),
)

projectRouter.post(
   '/projects/images/upload',
   pluginAuthenticate,
   upload.array('images', 500),
   catchErrors(async function (req, res) {
      // req.files 是 'images' 文件数组
      // req.body 将包含文本域的数据，如果有的话
      res.send('Successfully uploaded!')
   }),
)

projectRouter.post(
   '/projects/upload',
   pluginAuthenticate,
   catchErrors(async (req, res) => {
      if (!req.user) {
         res.status(401).send('Unauthorized')
         return
      }

      // 找到对应的用户
      const user = req.user
      // 根据 name 查找项目，如果存在则更新，否则创建
      const project = await prisma.project.findUnique({
         where: { name: req.body.name },
      })
      if (project) {
         const updatedProject = await prisma.project.update({
            where: { id: project.id },
            data: {
               nodeData: req.body.nodeData,
               settings: req.body.settings,
            },
         })
         res.json(updatedProject)
         return
      }

      // 创建项目
      const newProject = await prisma.project.create({
         data: {
            name: req.body.name,
            userId: user.id,
            nodeData: req.body.nodeData,
            settings: req.body.settings,
         },
      })
      res.json(newProject)
   }),
)

projectRouter.post(
   '/projects/render-static-node',
   catchErrors(async (req, res) => {
      if (!req.user) {
         throw new Error('Unauthorized')
      }
      const { id } = req.body

      const project = await prisma.project.findUnique({
         where: { id: parseInt(id) },
      })

      if (!project) throw new Error('Project not found')

      const { settings, nodeData } = project

      if (!settings) throw new Error('Project settings not found')

      if (!nodeData) throw new Error('Project nodeData not found')

      const content = renderStaticNode(
         settings as BaseConvertSettings,
         assignParents(nodeData as unknown as ServerNode),
         {
            convertBackgroundImageCss: (imageFileMeta, node) => {
               if ('imageFillSrc' in node) {
                  if (!node.imageFillSrc) {
                     return 'none'
                  }
                  return `url('${node.imageFillSrc}')`
               }
               return 'none'
            },
         },
      )

      const newProject = await prisma.project.update({
         where: { id: parseInt(id) },
         data: { pageHtml: content },
      })

      res.json(newProject)
   }),
)

projectRouter.post(
   '/projects',
   catchErrors(async (req, res) => {
      if (!req.user) {
         throw new Error('Unauthorized')
      }
      const newProject = await prisma.project.create({
         data: {
            ...req.body,
            userId: req.user.id,
         },
      })
      res.json(newProject)
   }),
)

projectRouter.get(
   '/projects/:id',
   catchErrors(async (req, res) => {
      if (!req.user) {
         throw new Error('Unauthorized')
      }
      const project = await prisma.project.findUnique({
         where: { id: parseInt(req.params.id) },
      })
      if (!project) throw new Error('Project not found')
      if (project.userId !== req.user.id) throw new Error('Unauthorized')
      res.json(project)
   }),
)

projectRouter.put(
   '/projects/:id',
   catchErrors(async (req, res) => {
      if (!req.user) {
         throw new Error('Unauthorized')
      }
      const project = await prisma.project.findUnique({
         where: { id: parseInt(req.params.id) },
      })
      if (!project) throw new Error('Project not found')
      if (project.userId !== req.user.id) throw new Error('Unauthorized')
      const updatedProject = await prisma.project.update({
         where: { id: parseInt(req.params.id) },
         data: req.body,
      })
      res.json(updatedProject)
   }),
)

projectRouter.delete(
   '/projects/:id',
   catchErrors(async (req, res) => {
      if (!req.user) {
         throw new Error('Unauthorized')
      }
      const project = await prisma.project.findUnique({
         where: { id: parseInt(req.params.id) },
      })
      if (!project) throw new Error('Project not found')
      if (project.userId !== req.user.id) throw new Error('Unauthorized')
      const deletedProject = await prisma.project.delete({
         where: { id: parseInt(req.params.id) },
      })
      res.json(deletedProject)
   }),
)

export { projectRouter }
