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
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
} from "@mui/icons-material";
import axios from "axios";
import { API_URL } from "../Api/Api";

const SignupPage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "error",
  });
  const navigate = useNavigate();

  const validateEmail = (email) =>
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);

  const validate = () => {
    const newErrors = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    else if (!validateEmail(form.email))
      newErrors.email = "Enter a valid email address";
    if (!form.password) newErrors.password = "Password is required";
    if (!form.confirmPassword)
      newErrors.confirmPassword = "Confirm your password";
    else if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      setSnackbar({
        open: true,
        message: Object.values(newErrors)[0],
        severity: "error",
      });
    }
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const handleSnackbarClose = () =>
    setSnackbar({ open: false, message: "", severity: "error" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const response = await axios.post(`${API_URL}/api/auth/register`, form);
      if (
        (response.status === 201 || response.data.token) &&
        response.data.token
      ) {
        setSnackbar({
          open: true,
          message: response.data.message || "Signup successful!",
          severity: "success",
        });
        localStorage.setItem("token", response.data.token);
        setForm({ name: "", email: "", password: "", confirmPassword: "" });
        setTimeout(() => {
          navigate("/login");
        }, 1000);
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Signup failed!",
        severity: "error",
      });
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
            minWidth: { xs: 0, sm: 300 },
            maxWidth: 380,
            width: "100%",
            mx: { xs: 0.5, sm: "auto" }, 
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
                Create
              </Box>{" "}
              Account
            </Typography>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 500,
                color: "#4e4e4eff",
                fontSize: { xs: "0.7rem", sm: "0.8rem" },
              }}
            >
              Please fill in the details to sign up.
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
              name="name"
              size="small"
              value={form.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
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
              error={!!errors.name}
              helperText={errors.name}
              autoFocus
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person sx={{ color: "#567BB0", fontSize: 18, mr: 1 }} />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              name="email"
              value={form.email}
              size="small"
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
              size="small"
              onChange={handleChange}
              required
              placeholder="Enter your password"
              type={showPassword ? "text" : "password"}
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
              error={!!errors.password}
              helperText={errors.password}
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
            <TextField
              name="confirmPassword"
              value={form.confirmPassword}
              size="small"
              onChange={handleChange}
              required
              placeholder="Confirm your password"
              type={showConfirmPassword ? "text" : "password"}
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
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock sx={{ color: "#567BB0", fontSize: 18, mr: 1 }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowConfirmPassword}
                      edge="end"
                    >
                      {showConfirmPassword ? (
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
              size="small"
              sx={{
                background: "#102442",
                color: "#fff",
                fontWeight: 500,
                borderRadius: 2,
                textTransform: "none",
                fontSize: "1rem",
                "&:hover": { background: "#1a2f5c" },
              }}
              fullWidth
              type="submit"
            >
              Sign Up
            </Button>
            <Box sx={{ textAlign: "center" }}>
              Already have an account?
              <Button
                onClick={() => navigate("/login")}
                color="primary"
                sx={{
                  fontWeight: 500,
                  textTransform: "none",
                  "&:hover": {
                    background: "transparent",
                  },
                }}
              >
                Sign In
              </Button>
            </Box>
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
          <Typography fontSize={11} sx={{ color: "#D5E5FC", mb: 0.5 }}>
            Copyright © 2025 Illustrata. All Rights Reserved.{" "}
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

export default SignupPage;
