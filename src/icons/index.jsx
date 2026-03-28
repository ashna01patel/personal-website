const ICON_SRCS = {
  terminal: '/icons/terminal.webp',
  messages: '/icons/messages.png',
  safari:   '/icons/safari.png',
  photos:   '/icons/photos.png',
  notes:    '/icons/notes.webp',
  preview:  '/icons/pages.png',
  calendar: '/icons/calendar.webp',
  facetime: '/icons/facetime.png',
}

// Border radius for icons that don't have rounded corners baked in
const ICON_RADIUS = {
  preview: '22%',
}

// Scale corrections for icons with extra transparent padding in the source image
const ICON_SCALE = {
  terminal: 1.22,
  messages: 1.0,
  safari:   1.0,
  photos:   1.0,
  notes:    1.62,
  preview:  1.4,
  calendar: 1.0,
  facetime: 1.0,
}

export default function AppIcon({ appId, size = 56 }) {
  // Calendar is rendered dynamically so it always shows today's date
  if (appId === 'calendar') return <CalendarIcon size={size} />

  const src = ICON_SRCS[appId]
  if (!src) return null

  const scale = ICON_SCALE[appId] ?? 1.0

  const radius = ICON_RADIUS[appId] ?? 0

  return (
    <div style={{
      width: size,
      height: size,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden',
      flexShrink: 0,
      borderRadius: radius,
    }}>
      <img
        src={src}
        alt={appId}
        draggable={false}
        style={{
          width: size * scale,
          height: size * scale,
          objectFit: 'contain',
          display: 'block',
          pointerEvents: 'none',
          flexShrink: 0,
        }}
      />
    </div>
  )
}

function CalendarIcon({ size }) {
  const now = new Date()
  const month = now.toLocaleString('default', { month: 'short' }).toUpperCase()
  const day = now.getDate()
  const radius = Math.round(size * 0.22)

  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: radius,
      background: 'white',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden',
      boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
      flexShrink: 0,
    }}>
      {/* Red header */}
      <div style={{
        width: '100%',
        height: '36%',
        background: 'linear-gradient(180deg, #FF4545 0%, #E8261A 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        <span style={{
          color: 'white',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: size * 0.165,
          fontWeight: '700',
          letterSpacing: 0.5,
          userSelect: 'none',
        }}>{month}</span>
      </div>
      {/* Day number */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <span style={{
          color: '#1C1C1E',
          fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: size * 0.42,
          fontWeight: '200',
          lineHeight: 1,
          userSelect: 'none',
        }}>{day}</span>
      </div>
    </div>
  )
}
