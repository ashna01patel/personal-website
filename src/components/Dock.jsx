import { motion } from 'framer-motion'
import AppIcon from '../icons'
import './Dock.css'

const ICON_SIZE = 56

const APP_NAMES = {
  terminal: 'Introduction',
  messages: 'Get in touch',
  safari: 'Projects',
  photos: 'Artwork',
  preview: 'Experience',
  calendar: 'Calendar',
  notes: 'Recent thoughts',
}

export default function Dock({ apps, openAppIds, bouncingApps, onAppClick }) {
  return (
    <div className="dock-wrapper">
      <div className="dock">
        {apps.map((appId) => {
          const isBouncing = bouncingApps.has(appId)
          const isOpen = openAppIds.has(appId)

          return (
            <div key={appId} className="dock-item">
              <span className="dock-label">{APP_NAMES[appId]}</span>
              <motion.div
                className="dock-bounce"
                animate={isBouncing ? { y: [0, -20, 0, -13, 0, -7, 0] } : { y: 0 }}
                transition={isBouncing ? { duration: 0.85, ease: 'easeOut' } : { duration: 0 }}
              >
                <div className="dock-icon" onClick={() => onAppClick(appId)}>
                  <AppIcon appId={appId} size={ICON_SIZE} />
                </div>
              </motion.div>
              <div className={`dock-dot ${isOpen ? 'visible' : ''}`} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
