import "./styles/App.css";
import Login from "./auth/Login"
import Codegenerator from "./home/Codegenerator";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./auth/PrivateRoute";

const theme = createTheme({
  typography: {
    fontFamily: `"proxima-nova", sans-serif`,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightSemiBold: 600,
    fontWeightBold: 700,
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter basename="/illustrata/embedsolution/">
        <Routes>
          <Route
            path="/"
            element={<PrivateRoute element={<Codegenerator />} />}
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
