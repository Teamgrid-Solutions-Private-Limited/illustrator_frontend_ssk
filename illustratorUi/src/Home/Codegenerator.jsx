import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  OutlinedInput,
  Button,
  Paper,
  Snackbar,
  Alert,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ContentCopy } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header";

const products = [
  { id: Math.floor(100 + Math.random() * 900), name: "Demo, A Multi-Year Guaranteed Annuity" },
  { id: Math.floor(100 + Math.random() * 900), name: "Demo, A Fixed Indexed Annuity" },
  { id: Math.floor(100 + Math.random() * 900), name: "Staysail, A Multi-Year Guaranteed Annuity" },
  { id: Math.floor(100 + Math.random() * 900), name: "Chartline, A Fixed Indexed Annuity" },
  { id: Math.floor(100 + Math.random() * 900), name: "Product 5" },
  { id: Math.floor(100 + Math.random() * 900), name: "Product 6" },
    { id: Math.floor(100 + Math.random() * 900), name: "Product 7" },
  { id: Math.floor(100 + Math.random() * 900), name: "Product 8" },
  { id: Math.floor(100 + Math.random() * 900), name: "Product 9" },

      { id: Math.floor(100 + Math.random() * 900), name: "Product 10" },

];

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
    background: {
      default: "#f5f7fa",
      paper: "#ffffff",
    },
  },
});

function Codegenerator() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [accentColor, setAccentColor] = useState("#1976d2");
  const [buttonColor, setButtonColor] = useState("#dc004e");
  const [hoverColor, setHoverColor] = useState("#ff4081");
  const [baseColor, setBaseColor] = useState("#f5f5f5");
  const [iframeUrl, setIframeUrl] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showEmbedCode, setShowEmbedCode] = useState(false);
  const navigate = useNavigate();

  // Generate iframe URL whenever settings change
  useEffect(() => {
    const productIds = selectedProducts.join(",");
    const url = `https://illustrationinnovators.com/illustration/?product=${productIds}&accentColor=${encodeURIComponent(
      accentColor
    )}&buttonColor=${encodeURIComponent(
      buttonColor
    )}&hoverColor=${encodeURIComponent(
      hoverColor
    )}&baseColor=${encodeURIComponent(baseColor)}`;
    setIframeUrl(url);
  }, [selectedProducts, accentColor, buttonColor, hoverColor, baseColor]);

  const handleProductToggle = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map(p => p.id));
    }
  };

  const generateEmbedCode = () => {
    return `<iframe id="crossDomainIframe" src="${iframeUrl}" width="100%" height="600" frameborder="0"></iframe>`;
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(generateEmbedCode())
      .then(() => {
        setSnackbarOpen(true);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
      });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  const handleGenerateEmbedCode = () => {
    setShowEmbedCode(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: "100vh",
          background: "linear-gradient(to bottom right, #ffffff, #cce0ff)",
          py: 4,
        }}
      >
        <Container maxWidth="lg" sx={{ height: "100%" }}>
          <Header />
          <Box sx={{ mt: 10, mb: 4 }}>
            <Box sx={{ pt: 5 }}>
              <Typography
                variant="h5"
                gutterBottom
                sx={{
                  color: "#11233E",
                  fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
                  fontStyle: "normal",
                  fontSize: "24px",
                  mb: 4,
                }}
              >
                Customize Your Embed
              </Typography>

              <Grid container spacing={6} sx={{ mb: 3, display: "flex", justifyContent: "space-between" }}>
                {/* Left Side - Always Visible Product Selection */}
                <Paper sx={{ p: 4, borderRadius: 2, flex: 1 }}> 
                  <Typography sx={{ mb: 2, color: "#2c3e50", fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif` }}>
                    Configuration
                  </Typography>
                  <Grid item xs={12} sx={{ display: "flex", flexDirection: "column" }}>
                    {/* Select All Checkbox */}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedProducts.length === products.length}
                          indeterminate={selectedProducts.length > 0 && selectedProducts.length < products.length}
                          onChange={handleSelectAll}
                        />
                      }
                      label={`Select All (${selectedProducts.length}/${products.length} selected)`}
                      sx={{ mb: 2 }}
                    />
                    
                    {/* Always Visible Product List */}
                    {/* Always Visible Product List (No Checkbox) */}
<Paper 
  variant="outlined" 
  sx={{ 
    maxHeight: 300, 
    overflow: "auto",
    p: 1,
    border: "1px solid #ddd"
  }}
>
  <List dense sx={{ width: "100%" }}>
    {products.map((product) => {
      const selected = selectedProducts.includes(product.id);
      return (
        <ListItem
          key={product.id}
          sx={{
            borderBottom: "1px solid #f0f0f0",
            "&:last-child": { borderBottom: "none" },
            py: 0.5,          // reduce vertical padding
            px: 1,            // optional horizontal padding
            cursor: "pointer",
            fontSize: "0.875rem", // smaller text
            backgroundColor: selected ? "#102442" : "transparent",
            color: selected ? "white" : "inherit",
            "&:hover": {
              backgroundColor: selected ? "#102442" : "#f5f5f5",
            }
          }}
          onClick={() => handleProductToggle(product.id)}
        >
          <ListItemText 
            primary={product.name} 
          
            primaryTypographyProps={{ fontSize: "0.875rem" }}
            secondaryTypographyProps={{ fontSize: "0.75rem" }}
          />
        </ListItem>
      );
    })}
  </List>
</Paper>


                    
                    {/* Selected Products Chips */}
                    {/* <Typography variant="subtitle2" sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
                      Selected Products:
                    </Typography> */}
                    {/* <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, minHeight: 60 }}>
                      {selectedProducts.length > 0 ? (
                        selectedProducts.map((id) => {
                          const product = products.find((p) => p.id === id);
                          return (
                            <Chip
                              key={id}
                              label={product?.name}
                              size="small"
                              onDelete={() => handleProductToggle(id)}
                              color="primary"
                              variant="filled"
                              sx={{ fontWeight: "medium", background: "#11233E", color: "white" }}
                            />
                          );
                        })
                      ) : (
                        <Typography variant="body2" color="text.secondary" fontStyle="italic">
                          No products selected
                        </Typography>
                      )}
                    </Box> */}
                  </Grid>
                </Paper>

                {/* Right Side - Colors + Current Settings */}
                <Paper sx={{ p: 4, borderRadius: 2, flex: 1 }}>
                  <Grid item xs={12} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {/* Color Pickers */}
                    <Box
                      sx={{
                        display: "grid",
                        gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                        gap: 2,
                      }}
                    >
                      <TextField
                        fullWidth
                        label="Accent Color"
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                      <TextField
                        fullWidth
                        label="Button Color"
                        type="color"
                        value={buttonColor}
                        onChange={(e) => setButtonColor(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                      <TextField
                        fullWidth
                        label="Hover Color"
                        type="color"
                        value={hoverColor}
                        onChange={(e) => setHoverColor(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                      <TextField
                        fullWidth
                        label="Base Color"
                        type="color"
                        value={baseColor}
                        onChange={(e) => setBaseColor(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                      />
                    </Box>

                    {/* Current Settings */}
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2.5,
                        background: "linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%)",
                        border: "1px solid",
                        borderColor: "primary.light",
                        borderRadius: 2,
                        boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
                      }}
                    >
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        Current Settings
                      </Typography>

                      {/* Products */}
                      <Typography variant="subtitle2" sx={{ fontWeight: "bold", mb: 1 }}>
                        Products Selected:
                      </Typography>
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1, mb: 2 }}>
                        {selectedProducts.length > 0 ? (
                          selectedProducts.map((id) => {
                            const product = products.find((p) => p.id === id);
                            return (
                              <Chip
                                key={id}
                                label={product?.name}
                                size="small"
                                color="primary"
                                variant="filled"
                                sx={{ fontWeight: "medium", background: "#11233E", color: "white" }}
                              />
                            );
                          })
                        ) : (
                          <Typography variant="body2" color="text.secondary" fontStyle="italic">
                            No products selected
                          </Typography>
                        )}
                      </Box>

                      {/* Colors */}
                      <Grid container spacing={2}>
                        <Grid item xs={6}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box sx={{ width: 20, height: 20, borderRadius: "50%", bgcolor: accentColor, border: "2px solid white" }} />
                            <Typography variant="subtitle2">Accent: {accentColor}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box sx={{ width: 20, height: 20, borderRadius: "50%", bgcolor: buttonColor, border: "2px solid white" }} />
                            <Typography variant="subtitle2">Button: {buttonColor}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box sx={{ width: 20, height: 20, borderRadius: "50%", bgcolor: hoverColor, border: "2px solid white" }} />
                            <Typography variant="subtitle2">Hover: {hoverColor}</Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Box sx={{ width: 20, height: 20, borderRadius: "50%", bgcolor: baseColor, border: "2px solid white" }} />
                            <Typography variant="subtitle2">Base: {baseColor}</Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Paper>
                  </Grid>
                </Paper>
              </Grid>

              <Divider sx={{ my: 3 }} />

              {/* Generate Embed Code Button */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleGenerateEmbedCode}
                  disabled={selectedProducts.length === 0}
                  sx={{
                    background: "linear-gradient(320.1deg, #11233E 44.4%, #567BB0 97.6%)",
                    px: 4,
                    py: 1.5,
                    fontWeight: '600',
                    fontSize: '16px',
                    '&:disabled': {
                      background: '#cccccc',
                      color: '#666666'
                    }
                  }}
                >
                  {selectedProducts.length === 0 ? 'Select Products First' : 'Generate Embed Code'}
                </Button>
              </Box>

              {/* Embed Code and Preview Grid */}
              {showEmbedCode && (
                <Grid container spacing={6} sx={{ mt: 2 }}>
                  <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        color: "#11233E",
                        fontFamily: "Rift",
                        fontWeight: 400,
                        fontStyle: "normal",
                        fontSize: "20px",
                      }}
                    >
                      Embed Code
                    </Typography>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        bgcolor: "#f8f9fa",
                        border: "1px solid #e9ecef",
                        borderRadius: 1,
                        display: "flex",
                        flexDirection: "column",
                        gap: 2,
                      }}
                    >
                      <Box
                        sx={{
                          p: 2,
                          bgcolor: "#f8f9fa",
                          border: "1px solid #e9ecef",
                          borderRadius: 1,
                          overflow: "auto",
                          fontSize: "0.875rem",
                          fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', monospace",
                          lineHeight: 1.6,
                          color: "#2d3748",
                          minHeight: '150px'
                        }}
                      >
                        <Box sx={{ color: "#e53e3e" }}>{`<`}<span style={{ color: "#3182ce" }}>iframe</span></Box>
                        <Box sx={{ pl: 2, color: "#2d3748" }}>
                          <span style={{ color: "#dd6b20" }}>id</span>=<span style={{ color: "#38a169" }}>"crossDomainIframe"</span>
                        </Box>
                        <Box sx={{ pl: 2, color: "#2d3748" }}>
                          <span style={{ color: "#dd6b20" }}>src</span>=<span style={{ color: "#38a169" }}>"{iframeUrl}"</span>
                        </Box>
                        <Box sx={{ pl: 2, color: "#2d3748" }}>
                          <span style={{ color: "#dd6b20" }}>width</span>=<span style={{ color: "#38a169" }}>"100%"</span>
                        </Box>
                        <Box sx={{ pl: 2, color: "#2d3748" }}>
                          <span style={{ color: "#dd6b20" }}>height</span>=<span style={{ color: "#38a169" }}>"600"</span>
                        </Box>
                        <Box sx={{ pl: 2, color: "#2d3748" }}>
                          <span style={{ color: "#dd6b20" }}>frameborder</span>=<span style={{ color: "#38a169" }}>"0"</span>
                        </Box>
                        <Box sx={{ pl: 2, color: "#2d3748" }}>
                          <span style={{ color: "#dd6b20" }}>title</span>=<span style={{ color: "#38a169" }}>"Illustration Widget"</span>
                        </Box>
                        <Box sx={{ color: "#e53e3e" }}>{`></`}<span style={{ color: "#3182ce" }}>iframe</span>{`>`}</Box>
                      </Box>

                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          background: "linear-gradient(320.1deg, #11233E 44.4%, #567BB0 97.6%)",
                          py: 1.5,
                          fontWeight: '600'
                        }}
                        startIcon={<ContentCopy />}
                        onClick={copyToClipboard}
                      >
                        Copy Code
                      </Button>
                    </Paper>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        color: "#11233E",
                        fontFamily: "Rift",
                        fontWeight: 400,
                        fontStyle: "normal",
                        fontSize: "20px",
                      }}
                    >
                      Live Preview
                    </Typography>
                    <Paper
                      variant="outlined"
                      sx={{
                        p: 2,
                        bgcolor: "background.default",
                        height: '100%',
                        minHeight: '300px',
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {selectedProducts.length > 0 ? (
                        <Box
                          sx={{
                            width: "100%",
                            height: "400px",
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2,
                            overflow: "hidden",
                          }}
                        >
                          <iframe
                            id="crossDomainIframe"
                            src={iframeUrl}
                            width="100%"
                            height="100%"
                            frameBorder="0"
                            title="Embed Preview"
                            style={{ borderRadius: 4 }}
                          />
                        </Box>
                      ) : (
                        <Typography variant="body2" color="text.secondary">
                          Select at least one product to see preview
                        </Typography>
                      )}
                    </Paper>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Box>

          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          >
            <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: "100%" }}>
              Embed code copied to clipboard!
            </Alert>
          </Snackbar>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default Codegenerator;