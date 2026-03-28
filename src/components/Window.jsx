import { Rnd } from 'react-rnd'
import { motion } from 'framer-motion'
import './Window.css'

export default function Window({
  id, title, zIndex,
  defaultX, defaultY, defaultWidth, defaultHeight,
  onClose, onFocus, children,
}) {
  return (
    <Rnd
      default={{ x: defaultX, y: defaultY, width: defaultWidth, height: defaultHeight }}
      style={{ zIndex }}
      onMouseDown={() => onFocus(id)}
      dragHandleClassName="window-titlebar"
      minWidth={380}
      minHeight={260}
      bounds="parent"
      enableResizing={{
        top: true, right: true, bottom: true, left: true,
        topRight: true, bottomRight: true, bottomLeft: true, topLeft: true,
      }}
    >
      <motion.div
        className="window"
        initial={{ scale: 0.82, opacity: 0, y: 16 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 12 }}
        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
        style={{ width: '100%', height: '100%' }}
      >
        <div className="window-titlebar">
          <div className="traffic-lights">
            <button
              className="traffic-btn traffic-red"
              onClick={() => onClose(id)}
              title="Close"
            >
              <span className="traffic-icon">✕</span>
            </button>
            <button className="traffic-btn traffic-yellow" title="Minimize (disabled)" />
            <button className="traffic-btn traffic-green" title="Maximize (disabled)" />
          </div>
          <span className="window-title">{title}</span>
          <div style={{ width: 52 }} />
        </div>
        <div className="window-content">
          {children}
        </div>
      </motion.div>
    </Rnd>
  )
}
