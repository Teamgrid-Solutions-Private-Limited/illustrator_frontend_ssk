import './App.css'
import Login from './Authentication/Login'
import Codegenerator from './Home/Codegenerator'
import { createTheme, ThemeProvider } from '@mui/material'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'

const theme = createTheme({
  typography: {
    fontFamily: `"proxima-nova", sans-serif`,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
  }
})

function App() {

  const PrivateRoute = ({ element }) => {
    const token = localStorage.getItem('token');
    // Note: the path here should be relative to basename
    return token ? element : <Navigate to="/login" replace />;
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename="/illustrata/embedsolution/">
        <Routes>
          {/* Use relative paths, not full paths */}
          <Route path="/" element={<PrivateRoute element={<Codegenerator />} />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;
