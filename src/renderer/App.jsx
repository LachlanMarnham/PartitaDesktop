import React from 'react'

function App() {
  const handleClick = async () => {
    const message = await window.api.getMessage()
    alert(message)
  }

  return (
    <div>
      <h1>Partita</h1>
      <button onClick={handleClick}>Get Message</button>
    </div>
  )
}

export default App
