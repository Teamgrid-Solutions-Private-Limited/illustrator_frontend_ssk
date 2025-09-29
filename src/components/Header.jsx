import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert,
} from "@mui/material";
import illustrataLogo from "../assets/Link.svg";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [logoutInProgress, setLogoutInProgress] = useState(false);

  const handleLogout = () => {
    if (logoutInProgress) return;

    setLogoutInProgress(true);
    setSnackbarOpen(true);
    setTimeout(() => {
      localStorage.clear();
      navigate("/login");
    }, 2000);
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <>
      <AppBar
        position="absolute"
        elevation={1}
        className="custom-header"
      >
        <Toolbar className="header-toolbar">
          <Box
            component="img"
            src={illustrataLogo}
            alt="Illustrata Logo"
            className="header-logo"
          />
          <Button
            variant="contained"
            disabled={logoutInProgress}
            className={`logout-button ${logoutInProgress ? 'logout-button-disabled' : ''}`}
            onClick={handleLogout}
          >
            {logoutInProgress ? "Logging Out..." : "Log Out"}
          </Button>
        </Toolbar>
      </AppBar>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={2000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="info"
          className="snackbar-alert"
        >
          Logging out...
        </Alert>
      </Snackbar>
    </>
  );
};

export default Header;