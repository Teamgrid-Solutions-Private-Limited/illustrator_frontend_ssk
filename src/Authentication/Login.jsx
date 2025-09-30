import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton,
  Snackbar,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { BASE_API_URL } from "../Constant";
import axios from "axios";
import logoHeader from "../assets/LogoHeader.svg";
import Footer from "../components/Footer";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const navigate = useNavigate();

 const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);

  const validate = () => {
    const newErrors = {};
    if (!form.email) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(form.email)) {
      newErrors.email = "Enter a valid email address";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleClickShowPassword = () => {
    setShowPassword((show) => !show);
  };

  const handleSnackbarClose = () => {
    setSnackbar({ open: false, message: "", severity: "info" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const response = await axios.post(`${BASE_API_URL}/api/auth/login`, form);
      if (response.status === 200 && response.data.token) {
        setSnackbar({
          open: true,
          message: response.data.message || "Logged in successfully!",
          severity: "success",
        });
        localStorage.setItem("token", response.data.token);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: err.response?.data?.message || "Failed to log in.",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Box className="container">
        <Box className="mainBox">
          <Box
            component="img"
            src={logoHeader}
            alt="Logo"
            className="logoHeader"
          />
          <Paper elevation={6} className="loginBox">
            <Box
              component="form"
              noValidate
              autoComplete="off"
              onSubmit={handleSubmit}
              className="loginForm"
            >
              <TextField
                className="textField"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                variant="standard"
                InputLabelProps={{ required: false }}
                error={!!errors.email}
                helperText={errors.email}
                autoFocus
                size="small"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email sx={{ color: "#567BB0", fontSize: 18, mr: 1 }} />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                className="textField"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                type={showPassword ? "text" : "password"}
                variant="standard"
                size="small"
                error={!!errors.password}
                helperText={errors.password}
                InputLabelProps={{ required: false }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock sx={{ color: "#567BB0", fontSize: 18, mr: 1 }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={handleClickShowPassword} edge="end">
                        {showPassword ? (
                          <VisibilityOff sx={{ fontSize: 18 }} />
                        ) : (
                          <Visibility sx={{ fontSize: 18 }} />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                className="loginButton"
                variant="contained"
                fullWidth
                type="submit"
                disabled={loading}
                size="small"
                startIcon={
                  loading ? (
                    <CircularProgress size={22} color="inherit" />
                  ) : null
                }
              >
                {loading ? "Signing In..." : "Sign In"}
              </Button>
            </Box>
          </Paper>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={4000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          className="customSnackbar"
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbar.severity}
            variant="filled"
            className="customAlert"
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Box>
      <Footer />
    </>
  );
};

export default LoginPage;
