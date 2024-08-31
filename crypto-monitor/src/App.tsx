import './App.css'
import { LiveChart } from './components/LiveChart'
function App() {
  return (
    <div>
      <LiveChart id="bitcoin" vsCurrency="usd" days="365" />
    </div>
  )
}

export default App
