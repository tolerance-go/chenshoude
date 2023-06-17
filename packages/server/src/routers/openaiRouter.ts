import express from 'express'

const openaiRouter = express.Router()

import { Configuration, OpenAIApi } from 'openai'
import { catchErrors } from '../utils/catchErrors'

const configuration = new Configuration({
   apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

// 设置登录路由，使用 Passport 进行认证
openaiRouter.get(
   '/openai',
   catchErrors(async (req, res) => {
      const response = await openai.createCompletion({
         model: 'text-davinci-003',
         prompt: '你好啊',
         temperature: 0.9,
         max_tokens: 150,
         top_p: 1,
         frequency_penalty: 0.0,
         presence_penalty: 0.6,
         stop: [' Human:', ' AI:'],
      })

      res.json(response.data.choices[0].text)
   }),
)

export { openaiRouter }
