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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff, Email, Lock } from "@mui/icons-material";
import { API_URL } from "../Api/Api";
import axios from "axios";

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
          navigate("/dashboard");
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
        minHeight: "100vh",
        background: "linear-gradient(180deg, #f5f7fa 0%, #1a3c6c 100%)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
        }}
      >
        <Paper
          elevation={8}
          sx={{
            borderRadius: 3,
            p: { xs: 2, sm: 3, md: 3, lg: 5 },
            display: "flex",
            flexDirection: "column",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.15)",
            alignItems: "stretch",
            justifyContent: "center",
            gap: { xs: 3, md: 0 },
            minWidth: { xs: "100%", sm: 300 },
            maxWidth: 380,
            width: "100%",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
              mb: 4,
            }}
          >
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                mb: 1,
                color: "#102442",
                letterSpacing: 1,
                fontSize: { xs: "1.8rem", sm: "2rem" },
              }}
            >
              <Box component="span" sx={{ color: "#567BB0" }}>
                Welcome
              </Box>{" "}
              Back!
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 500,
                color: "#4e4e4eff",
                fontSize: { xs: "0.7rem", sm: "0.8rem" },
              }}
            >
              Please sign in to your account to continue.
            </Typography>
          </Box>

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

            <Box sx={{ textAlign: "center" }}>
              Don't have an account?
              <Button
                onClick={() => navigate("/signup")}
                color="primary"
                sx={{
                  fontWeight: 500,
                  textTransform: "none",
                  "&:hover": {
                    background: "transparent",
                  },
                }}
              >
                Sign Up
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleSnackbarClose}
        message={snackbar.message}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />

      <Box
        sx={{
          width: "100%",
          background: "linear-gradient(90deg, #1a3c6c 0%, #3a6db3 100%)",
          py: 2,
          textAlign: "center",
        }}
      >
        <Container maxWidth="md">
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: "bold",
              letterSpacing: 2,
              color: "#D7D7D7",
              mb: 1,
            }}
          >
            ILLUSTRATA
          </Typography>
          <Typography fontSize={11} sx={{ color: "#fff", mb: 0.5 }}>
            Copyright © 2025 Illustrata. All Rights Reserved.{" "}
            <Box
              component="span"
              sx={{
                textDecoration: "underline",
                cursor: "pointer",
                color: "#fff",
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
