import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Analytics } from '@vercel/analytics/react'
import Desktop from './components/Desktop'
import Dock from './components/Dock'
import Window from './components/Window'
import Terminal from './components/apps/Terminal'
import Messages from './components/apps/Messages'
import Photos from './components/apps/Photos'
import Notes from './components/apps/Notes'
import Preview from './components/apps/Preview'
import Safari from './components/apps/Safari'

const APP_CONFIG = {
  terminal: {
    id: 'terminal',
    name: 'Terminal',
    title: 'personalwebsite — ashnapatel',
    defaultWidth: 660,
    defaultHeight: 400,
    component: Terminal,
  },
  messages: {
    id: 'messages',
    name: 'Messages',
    title: 'Messages',
    defaultWidth: 640,
    defaultHeight: 560,
    component: Messages,
  },
  safari: {
    id: 'safari',
    name: 'Safari',
    title: 'Safari — Projects',
    defaultWidth: 760,
    defaultHeight: 520,
    component: Safari,
  },
  photos: {
    id: 'photos',
    name: 'Photos',
    title: 'Photos',
    defaultWidth: 760,
    defaultHeight: 520,
    component: Photos,
  },
  notes: {
    id: 'notes',
    name: 'Notes',
    title: 'Notes',
    defaultWidth: 780,
    defaultHeight: 560,
    component: Notes,
  },
  preview: {
    id: 'preview',
    name: 'Preview',
    title: 'Experience',
    defaultWidth: 935,
    defaultHeight: 580,
    component: Preview,
  },
  calendar: { id: 'calendar', name: 'Calendar', placeholder: true },
}

export const DOCK_APPS = ['terminal', 'messages', 'safari', 'photos', 'preview', 'calendar', 'notes']

export default function App() {
  const [windows, setWindows] = useState([])
  const [topZ, setTopZ] = useState(100)
  const [bouncingApps, setBouncingApps] = useState(new Set())

  useEffect(() => {
    const timer = setTimeout(() => openApp('terminal'), 600)
    return () => clearTimeout(timer)
  }, [])

  function openApp(appId) {
    const config = APP_CONFIG[appId]
    if (!config || config.placeholder) return

    const alreadyOpen = windows.find(w => w.id === appId)
    if (alreadyOpen) {
      bringToFront(appId)
      return
    }

    const vw = window.innerWidth
    const vh = window.innerHeight
    const x = Math.max(60, (vw - config.defaultWidth) / 2 + (Math.random() - 0.5) * 160)
    const y = Math.max(40, (vh - config.defaultHeight) / 2 - 40 + (Math.random() - 0.5) * 80)

    const newZ = topZ + 1
    setTopZ(newZ)

    setWindows(current => [...current, {
      ...config,
      x: Math.round(x),
      y: Math.round(y),
      zIndex: newZ,
    }])
  }

  function triggerBounce(appId) {
    setBouncingApps(prev => new Set([...prev, appId]))
    setTimeout(() => {
      setBouncingApps(prev => {
        const next = new Set(prev)
        next.delete(appId)
        return next
      })
    }, 900)
  }

  function closeWindow(appId) {
    setWindows(prev => prev.filter(w => w.id !== appId))
  }

  function bringToFront(appId) {
    setTopZ(prev => {
      const newZ = prev + 1
      setWindows(ws => ws.map(w => w.id === appId ? { ...w, zIndex: newZ } : w))
      return newZ
    })
  }

  const openAppIds = new Set(windows.map(w => w.id))

  return (
    <Desktop>
      <AnimatePresence>
        {windows.map(win => {
          const AppComponent = win.component
          return (
            <Window
              key={win.id}
              id={win.id}
              title={win.title}
              zIndex={win.zIndex}
              defaultX={win.x}
              defaultY={win.y}
              defaultWidth={win.defaultWidth}
              defaultHeight={win.defaultHeight}
              onClose={closeWindow}
              onFocus={bringToFront}
            >
              <AppComponent />
            </Window>
          )
        })}
      </AnimatePresence>
      <Dock
        apps={DOCK_APPS}
        openAppIds={openAppIds}
        bouncingApps={bouncingApps}
        onAppClick={openApp}
      />
      <Analytics />
    </Desktop>
  )
}
