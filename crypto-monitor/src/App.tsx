import './App.css'
import { CoinChartRenderer } from './components/CoinChartRenderer'
import { LiveChart } from './components/LiveChart'
import { Button } from '@/components/ui/button'

const generateData = () => {
  const data = [];
  const startDate = new Date('2022-08-01').getTime();
  for (let i = 0; i < 12; i++) {
    data.push({
      price: Math.random() * 10000 + 20000, // Random price between 20000 and 30000
      time: startDate + i * 30 * 24 * 60 * 60 * 1000 // Approximately one month intervals
    });
  }
  return data;
};

function App() {
  return (
    <div>
      <LiveChart id="bitcoin" vsCurrency="usd" days="365" />
      <Button>Click me</Button>
      {/* <BitcoinPriceChart data={generateData()} /> */}
    </div>
  )
}

export default App
