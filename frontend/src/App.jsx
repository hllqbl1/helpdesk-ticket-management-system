import { BrowserRouter } from 'react-router'
import AppRoutes from './routes/AppRoutes'
import Navbar from './components/Navbar'
import './index.css'

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App