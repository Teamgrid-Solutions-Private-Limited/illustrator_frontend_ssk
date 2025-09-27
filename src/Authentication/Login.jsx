import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
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
import { API_URL } from "../Api/Api";
import axios from "axios";
import logoFooter from "../assets/LogoFooter.svg"
import logoHeader from "../assets/LogoHeader.svg"

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
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

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
      const response = await axios.post(`${API_URL}/api/auth/login`, form);
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
    <Box
      sx={{
        height: "calc(100vh - 80px)",
        background: "linear-gradient(-315deg, #f5f7fa 50%, #cce0ff 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
    
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          pb: { xs: 6, sm: 8 }, 
        }}
      >
        <Box
          component="img"
          src={logoHeader}
          alt="Logo"
          sx={{
            width: { xs: 120, sm: 160, md: 180 },
            height: "auto",
            mb: { xs: 2, sm: 5 },
            alignSelf: "center",
            maxWidth: "80vw",
          }}
        />
        <Paper
          elevation={8}
          sx={{
            borderRadius: 3,
            p: { xs: 4, sm: 5, md: 5 },
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
            alignItems: "stretch",
            justifyContent: "center",
            gap: { xs: 3, md: 0 },
            maxWidth: { xs: 280, sm: 360 },
            width: "100%",
            mx: { xs: 0.5, sm: "auto" },
          }}
        >
          <Box
            component="form"
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            sx={{
              display: "flex",
              flexDirection: "column",
            }}
            gap={4}
          >
            <TextField
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              variant="standard"
              sx={{
                "& .MuiInputBase-root": {
                  color: "#102442",
                },
                "& .MuiInput-underline:before": {
                  borderBottomColor: "#ccc",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#567BB0",
                },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "#ccc",
                },
                "& input::placeholder": {
                  fontSize: "0.95rem",
                },
                background: "transparent",
              }}
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
              sx={{
                "& .MuiInputBase-root": {
                  color: "#102442",
                },
                "& .MuiInput-underline:before": {
                  borderBottomColor: "#ccc",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#567BB0",
                },
                "& .MuiInput-underline:hover:not(.Mui-disabled):before": {
                  borderBottomColor: "#ccc",
                },
                "& input::placeholder": {
                  fontSize: "0.95rem",
                },
                background: "transparent",
              }}
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
              variant="contained"
              sx={{
                background: "#102442",
                color: "#fff",
                fontWeight: 500,
                borderRadius: 1,
                fontSize: "1rem",
                "&:hover": { background: "#1a2f5c" },
                textTransform: "none",
              }}
              fullWidth
              type="submit"
              disabled={loading}
              size="small"
              startIcon={
                loading ? <CircularProgress size={22} color="inherit" /> : null
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
        sx={{
          '& .MuiPaper-root': {
            borderRadius: 2,
            boxShadow: 4,
          },
        }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
          sx={{
            width: '100%',
            borderRadius: 2,
            boxShadow: 4,
            fontWeight: 500,
            fontSize: '1rem',
            alignItems: 'center',
          }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Box
        sx={{
          width: "100%",
          background: "linear-gradient(90deg, #1a3c6c 0%, #3a6db3 100%)",
          py: { xs: 2, sm: 3, md: 4 },
          textAlign: "center",
          position: "fixed",
          bottom: 0,
          left: 0,
          zIndex: 1200,
          borderTop: "1.5px solid #e3eafc",
          boxShadow: "0 -2px 12px 0 rgba(31, 38, 135, 0.07)",
        }}
      >
        <Container maxWidth="md" sx={{ px: { xs: 1, sm: 2 } }}>
          <Typography
            sx={{
              fontSize: { xs: "15px", sm: "18px" },
              fontWeight: "bold",
              letterSpacing: 2,
              color: "#D7D7D7",
              mb: 1,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              component="img"
              src={logoFooter}
              sx={{ width: { xs: 110, sm: 150, md: 170 }, height: "auto", maxWidth: "80vw" }}
              alt="Footer Logo"
            />
          </Typography>
          <Typography sx={{ color: "#D5E5FC", mb: 0.5, fontSize: { xs: "11px", sm: "14px" }, fontWeight: 400, wordBreak: "break-word" }}>
            Copyright © 2025 Illustrata. All Rights Reserved.{' '}
            <Box
              component="span"
              sx={{
                textDecoration: "underline",
                cursor: "pointer",
                color: "#D5E5FC",
              }}
            >
              Statement of Independence
            </Box>
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};

export default LoginPage;
