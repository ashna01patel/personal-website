import { useState, useEffect, useRef } from 'react'
import './Terminal.css'

const PROMPT = 'ashna@macbook-pro ~ % '

// ─── EDIT YOUR INTRO TEXT HERE ───────────────────────────────────────────────
const INTRO_TEXT = `Last login: ${new Date().toDateString()} on ttys000

${PROMPT}cat intro.txt

Hi! I'm Ashna Patel — I'm an AI-focused Product Manager turning customer
insights into growth-driving product strategy.

Feel free to explore the apps below to get to know me, or ask me anything.

`
// ─────────────────────────────────────────────────────────────────────────────

export default function Terminal() {
  const [displayed, setDisplayed] = useState('')
  const [phase, setPhase] = useState('typing')
  const [history, setHistory] = useState([])
  const [streamingOutput, setStreamingOutput] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [currentInput, setCurrentInput] = useState('')
  const [cursorOn, setCursorOn] = useState(true)
  const [conversationHistory, setConversationHistory] = useState([])
  const containerRef = useRef(null)
  const inputRef = useRef(null)

  // Typewriter intro
  useEffect(() => {
    let i = 0
    let timer
    function typeNext() {
      if (i >= INTRO_TEXT.length) {
        setPhase('interactive')
        return
      }
      setDisplayed(INTRO_TEXT.slice(0, i + 1))
      i++
      timer = setTimeout(typeNext, 16)
    }
    timer = setTimeout(typeNext, 400)
    return () => clearTimeout(timer)
  }, [])

  // Blinking cursor
  useEffect(() => {
    const blink = setInterval(() => setCursorOn(c => !c), 530)
    return () => clearInterval(blink)
  }, [])

  // Auto-scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [displayed, history, streamingOutput, currentInput])

  // Focus input when interactive
  useEffect(() => {
    if (phase === 'interactive') inputRef.current?.focus()
  }, [phase])

  async function submitCommand(input) {
    const trimmed = input.trim()
    if (!trimmed) return

    const userMessage = { role: 'user', content: trimmed }
    const newHistory = [...conversationHistory, userMessage]

    setIsStreaming(true)
    setStreamingOutput('')

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newHistory }),
      })

      if (!response.ok) {
        const errText = await response.text()
        setHistory(h => [...h, { input: trimmed, output: errText }])
        setIsStreaming(false)
        return
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let fullText = ''

      while (true) {
        const { done, value } = await reader.read()
        if (done) break
        const chunk = decoder.decode(value, { stream: true })
        fullText += chunk
        setStreamingOutput(fullText)
      }

      setHistory(h => [...h, { input: trimmed, output: fullText }])
      setConversationHistory([...newHistory, { role: 'assistant', content: fullText }])
    } catch {
      setHistory(h => [...h, { input: trimmed, output: 'Error: could not connect to server.' }])
    }

    setIsStreaming(false)
    setStreamingOutput('')
  }

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !isStreaming) {
      const val = currentInput
      setCurrentInput('')
      submitCommand(val)
    }
  }

  return (
    <div
      className="terminal"
      ref={containerRef}
      onClick={() => phase === 'interactive' && !isStreaming && inputRef.current?.focus()}
    >
      {/* Typewritten intro */}
      <pre className="terminal-text">
        {displayed}
        {phase === 'typing' && (
          <span className={`terminal-cursor ${cursorOn ? 'on' : ''}`}>█</span>
        )}
      </pre>

      {/* Command history */}
      {phase === 'interactive' && history.map((entry, i) => (
        <pre key={i} className="terminal-text">
          {PROMPT}<span className="terminal-cmd">{entry.input}</span>{'\n'}
          <span className="terminal-output">{entry.output}</span>{'\n'}
        </pre>
      ))}

      {/* Streaming response */}
      {isStreaming && (
        <pre className="terminal-text">
          {PROMPT}<span className="terminal-cmd">{currentInput || history[history.length]?.input}</span>{'\n'}
          <span className="terminal-output">{streamingOutput}</span>
          <span className={`terminal-cursor ${cursorOn ? 'on' : ''}`}>█</span>
        </pre>
      )}

      {/* Live input prompt */}
      {phase === 'interactive' && !isStreaming && (
        <div className="terminal-input-row">
          <pre className="terminal-text">{PROMPT}</pre>
          <pre className="terminal-text terminal-cmd">
            {currentInput}
            <span className={`terminal-cursor ${cursorOn ? 'on' : ''}`}>█</span>
          </pre>
          <input
            ref={inputRef}
            className="terminal-hidden-input"
            value={currentInput}
            onChange={e => setCurrentInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
        </div>
      )}
    </div>
  )
}
