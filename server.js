import { GoogleGenerativeAI } from '@google/generative-ai'
import express from 'express'
import cors from 'cors'
import SYSTEM_PROMPT from './system-prompt.js'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
const app = express()

app.use(cors())
app.use(express.json())

app.post('/api/chat', async (req, res) => {
  const { messages } = req.body

  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('X-Accel-Buffering', 'no')

  try {
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
      systemInstruction: SYSTEM_PROMPT,
    })

    // Convert message format: 'assistant' → 'model', content string → parts array
    const history = messages.slice(0, -1).map(m => ({
      role: m.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: m.content }],
    }))

    const lastMessage = messages[messages.length - 1].content

    const chat = model.startChat({ history })
    const result = await chat.sendMessageStream(lastMessage)

    for await (const chunk of result.stream) {
      const text = chunk.text()
      if (text) res.write(text)
    }

    res.end()
  } catch (err) {
    console.error('Gemini API error:', err.message)
    res.status(500).end('Error: could not reach Gemini API. Check your GEMINI_API_KEY.')
  }
})

const PORT = 3001
app.listen(PORT, () => console.log(`API server running on http://localhost:${PORT}`))
