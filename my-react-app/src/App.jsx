import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <h1>🚀 Meine React-App im Docker!</h1>
        <p>Count: {count}</p>
        <button onClick={() => setCount(c => c + 1)}>
          +1
        </button>
      </div>

      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>Vite + React</h1>
      <p className="read-the-docs">
        Hinweis: HMR funktioniert im Dev-Server (npm run dev). 
        Im Docker/Nginx (Production) wird die Seite neu gebaut (npm run build) und ohne HMR ausgeliefert.
      </p>
    </>
  )
}

export default App
