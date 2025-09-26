import './App.css';
import Login from './Authentication/Login';
import Signup from './Authentication/Signup';
import Codegenerator from './Home/Codegenerator';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoute from './Authentication/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route 
          path="/" 
          element={
            <PrivateRoute>
              <Codegenerator />
            </PrivateRoute>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
