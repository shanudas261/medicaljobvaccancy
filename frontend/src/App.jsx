import Home from './Pages/Home'
import Admin from './Pages/Admin'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Login from './Pages/Login'
import ProtectedRoute from './Components/ProtectedRoute'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />
      
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
