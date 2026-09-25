import React, { useEffect, useState } from 'react'

const DEFAULT_SECONDS = 20 * 60

function formatTime(totalSeconds) {
  const hours = Math.floor(totalSeconds / 3600)
  const minutes = Math.floor((totalSeconds % 3600) / 60)
  const seconds = totalSeconds % 60
  const pad = (n) => String(n).padStart(2, '0')

  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`
}

function parseTime(value) {
  const parts = value
    .split(':')
    .slice(-3)
    .map((part) => parseInt(part, 10))
  while (parts.length < 3) parts.unshift(0)

  const [hours, minutes, seconds] = parts.map((n) => (Number.isNaN(n) ? 0 : n))

  return Math.max(0, hours * 3600 + minutes * 60 + seconds)
}

function Timer() {
  const [remaining, setRemaining] = useState(DEFAULT_SECONDS)
  const [running, setRunning] = useState(false)
  const [editing, setEditing] = useState(false)
  const [draft, setDraft] = useState('')

  useEffect(() => {
    if (!running) return undefined

    const interval = setInterval(() => {
      setRemaining((current) => (current > 0 ? current - 1 : 0))
    }, 1000)

    return () => clearInterval(interval)
  }, [running])

  useEffect(() => {
    if (running && remaining === 0) setRunning(false)
  }, [running, remaining])

  const startEditing = () => {
    if (running) return
    setDraft(formatTime(remaining))
    setEditing(true)
  }

  const commitEdit = () => {
    setRemaining(parseTime(draft))
    setEditing(false)
  }

  const handleToggle = () => {
    if (running) {
      setRunning(false)
    } else if (remaining > 0) {
      setRunning(true)
    }
  }

  return (
    <div className="piece-spotlight-timer">
      {editing ? (
        <input
          className="piece-spotlight-timer-input"
          value={draft}
          autoFocus
          onChange={(event) => setDraft(event.target.value)}
          onBlur={commitEdit}
          onKeyDown={(event) => {
            if (event.key === 'Enter') commitEdit()
          }}
        />
      ) : (
        <span className="piece-spotlight-timer-display" onClick={startEditing}>
          {formatTime(remaining)}
        </span>
      )}
      <button className="piece-spotlight-timer-toggle" onClick={handleToggle}>
        {running ? 'Stop' : 'Start'}
      </button>
    </div>
  )
}

export default Timer
