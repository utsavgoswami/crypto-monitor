import './App.css'
import { SplitLayout } from './components/SplitLayout'
import { ErrorNotification } from './components/ErrorNotification'
import { useAppSelector } from './hooks';

function App() {
  const errorMessage = useAppSelector((state) => state.error.message);

  return (
    <>
      {errorMessage.length > 0 && <ErrorNotification errorMessage={errorMessage} />}
      <SplitLayout />
    </>
  )
}

export default App
