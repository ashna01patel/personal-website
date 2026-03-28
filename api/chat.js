import { GoogleGenerativeAI } from '@google/generative-ai'
import SYSTEM_PROMPT from '../system-prompt.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).end('Method Not Allowed')
  }

  const { messages } = req.body

  res.setHeader('Content-Type', 'text/plain; charset=utf-8')
  res.setHeader('Cache-Control', 'no-cache')
  res.setHeader('X-Accel-Buffering', 'no')

  try {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY)
    const model = genAI.getGenerativeModel({
      model: 'gemini-2.0-flash',
      systemInstruction: SYSTEM_PROMPT,
    })

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
    console.error('Gemini error:', err.message)
    res.status(500).end('Error contacting Gemini API.')
  }
}
