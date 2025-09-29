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
        sx={{
          background: "white",
          color: "#0d1b3d",
          borderRadius: "20px",
          px: 4,
          py: 2,
          mt: 2,
          top: 25,
          left: 0,
          right: 0,
          margin: "0 auto",
          maxWidth: "1160px",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box
            component="img"
            src={illustrataLogo}
            alt="Illustrata Logo"
            sx={{ height: 30 }}
          />
          <Button
            variant="contained"
            disabled={logoutInProgress}
            sx={{
              backgroundColor: logoutInProgress ? "#cccccc" : "#016cd6",
              borderRadius: "10px",
              px: 3,
              fontWeight: 400,
              fontSize: "14px",
              textTransform: "none",
              "&:hover": {
                backgroundColor: logoutInProgress ? "#cccccc" : "#23455c",
              },
            }}
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
          sx={{ width: "100%" }}
        >
          Logging out...
        </Alert>
      </Snackbar>
    </>
  );
};

export default Header;
