import './App.css'
import Login from './Authentication/Login'
import Signup from './Authentication/Signup'
import Codegenerator from './Home/Codegenerator'
import { BrowserRouter, Routes, Route ,Navigate} from 'react-router-dom'
function App() {

  const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token');
  return token ? element : <Navigate to="/login" />;
};

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<PrivateRoute element={<Codegenerator />} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
