import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
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
  AppBar,
  Toolbar,
  Tabs,
  Tab,
  Grid,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ContentCopy } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { IconButton } from "@mui/material";
import { Logout } from "@mui/icons-material";
const products = [
  { id: 1, name: "Product 1" },
  { id: 2, name: "Product 2" },
  { id: 3, name: "Product 3" },
  { id: 4, name: "Product 4" },
  { id: 5, name: "Product 5" },
  { id: 6, name: "Product 6" },
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
  const [tabValue, setTabValue] = useState(0);
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

  const handleProductChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedProducts(typeof value === "string" ? value.split(",") : value);
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

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          background: "linear-gradient(to bottom right, #ffffff, #cce0ff)",
        }}
      >
        {/* Top App Bar */}
        <AppBar
          position="static"
          elevation={1}
          sx={{
            background:
              "linear-gradient(320.1deg, #11233E 44.4%, #567BB0 97.6%)",
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                flexGrow: 1,
                fontFamily: "Rift",
                fontWeight: 400,
                fontStyle: "normal", // or 'italic' if you meant italic, 'Demi' is not standard CSS
                fontSize: "36px",
              }}
            >
              Embed Code Generator
            </Typography>

            {/* Logout Button */}
            <IconButton
              color="inherit"
              onClick={() => {
               localStorage.clear();
               navigate("/login")
              }}
            >
              <Logout />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Tabs */}
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Paper elevation={3}>
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
            >
              <Tab label="Customize" />
              <Tab label="Preview" />
              <Tab label="Embed Code" />
            </Tabs>

            {/* Customize Tab */}
            {tabValue === 0 && (
              <Box sx={{ p: 3 }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{
                    textColor: "#11233E",
                    fontFamily: "Rift",
                    fontWeight: 400,
                    fontStyle: "normal", 
                    fontSize: "24px",
                    mb: 3,
                  }}
                >
                  Customize Your Embed
                </Typography>
                <FormControl fullWidth sx={{ mb: 3 }}>
                  <InputLabel id="product-select-label">
                    Select Product
                  </InputLabel>
                  <Select
                    labelId="product-select-label"
                    id="product-select"
                    multiple
                    value={selectedProducts}
                    onChange={handleProductChange}
                    input={<OutlinedInput label="Select Product" />}
                    renderValue={(selected) => (
                      <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                        {selected.map((value) => (
                          <Chip
                            key={value}
                            label={
                              products.find((p) => p.id === value)?.name ||
                              value
                            }
                            size="small"
                          />
                        ))}
                      </Box>
                    )}
                  >
                    {products.map((product) => (
                      <MenuItem key={product.id} value={product.id}>
                        {product.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
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

                <Divider sx={{ my: 3 }} />
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    textColor: "#11233E",
                    fontFamily: "Rift",
                    fontWeight: 400,
                    fontStyle: "normal", // or 'italic' if you meant italic, 'Demi' is not standard CSS
                    fontSize: "24px",
                  }}
                >
                  Current Settings
                </Typography>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2.5,
                    background:
                      "linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%)",
                    border: "1px solid",
                    borderColor: "primary.light",
                    borderRadius: 2,
                    boxShadow: "0 2px 8px rgba(25, 118, 210, 0.08)",
                  }}
                >
                  <Box
                    sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                  >
                    {/* Products Setting */}
                    <Box
                      sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}
                    >
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="subtitle2"
                          sx={{
                            fontWeight: "bold",
                            color: "text.primary",
                            mb: 0.5,
                          }}
                        >
                          Products Selected
                        </Typography>
                        <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
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
                                  sx={{
                                    fontWeight: "medium",
                                    background: " #11233E",
                                    color: "white",
                                  }}
                                />
                              );
                            })
                          ) : (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              fontStyle="italic"
                            >
                              No products selected
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Box>

                    <Divider sx={{ my: 1 }} />

                    {/* Color Settings Grid */}
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mb: 1.5,
                          }}
                        >
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              borderRadius: "50%",
                              bgcolor: accentColor,
                              border: "2px solid white",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            }}
                          />
                          <Box>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: "bold" }}
                            >
                              Accent Color
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {accentColor}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mb: 1.5,
                          }}
                        >
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              borderRadius: "50%",
                              bgcolor: buttonColor,
                              border: "2px solid white",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            }}
                          />
                          <Box>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: "bold" }}
                            >
                              Button Color
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {buttonColor}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mb: 1.5,
                          }}
                        >
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              borderRadius: "50%",
                              bgcolor: hoverColor,
                              border: "2px solid white",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            }}
                          />
                          <Box>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: "bold" }}
                            >
                              Hover Color
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {hoverColor}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1.5,
                            mb: 1.5,
                          }}
                        >
                          <Box
                            sx={{
                              width: 20,
                              height: 20,
                              borderRadius: "50%",
                              bgcolor: baseColor,
                              border: "2px solid white",
                              boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                            }}
                          />
                          <Box>
                            <Typography
                              variant="subtitle2"
                              sx={{ fontWeight: "bold" }}
                            >
                              Base Color
                            </Typography>
                            <Typography
                              variant="caption"
                              color="text.secondary"
                            >
                              {baseColor}
                            </Typography>
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Paper>
              </Box>
            )}

            {/* Preview Tab */}
            {tabValue === 1 && (
              <Box sx={{ p: 3 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    fontFamily: "Rift",
                    fontWeight: 400,
                    fontStyle: "normal", // or 'italic' if you meant italic, 'Demi' is not standard CSS
                    fontSize: "24px",
                  }}
                >
                  Live Preview
                </Typography>
                <Paper
                  variant="outlined"
                  sx={{
                    p: 2,
                    bgcolor: "background.default",
                    minHeight: 300,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {selectedProducts.length > 0 ? (
                    <Box
                      sx={{
                        width: "100%",
                        height: 400,
                        border: "1px solid",
                        borderColor: "divider",
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
              </Box>
            )}

            {/* Embed Code Tab */}
          {tabValue === 2 && (
  <Box sx={{ p: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
    <Typography
      variant="h6"
      gutterBottom
      sx={{
        color: "#11233E",
        fontFamily: "Rift",
        fontWeight: 400,
        fontStyle: "normal",
        fontSize: "24px",
        mb: 2
      }}
    >
      Embed Code
    </Typography>
    
    <Paper 
      variant="outlined" 
      sx={{ 
        p: 2, 
        mb: 2, 
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minHeight: '400px'
      }}
    >
      {/* <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: '600' }}>
          HTML Embed Code
        </Typography>
        <Chip 
          label="Ready to use" 
          size="small" 
          color="success" 
          variant="outlined"
        />
      </Box> */}
      
      <Box
        sx={{
          p: 2,
          bgcolor: "#f8f9fa",
          border: "1px solid #e9ecef",
          borderRadius: 1,
          overflow: "auto",
          fontSize: "0.875rem",
          mb: 2,
          flex: 1,
          fontFamily: "'SF Mono', 'Monaco', 'Inconsolata', monospace",
          lineHeight: 1.6,
          color: "#2d3748"
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
      
      <Box sx={{ display: 'flex', gap: 1 }}>
        <Button
          variant="contained"
          sx={{
            flex: 1,
            background: "linear-gradient(320.1deg, #11233E 44.4%, #567BB0 97.6%)",
            py: 1.5,
            fontWeight: '600'
          }}
          startIcon={<ContentCopy />}
          onClick={copyToClipboard}
        >
          Copy Code
        </Button>
      </Box>
    </Paper>
    
  </Box>
)}
          </Paper>
        </Container>

        {/* Snackbar */}
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity="success"
            sx={{ width: "100%" }}
          >
            Embed code copied to clipboard!
          </Alert>
        </Snackbar>
      </Box>
    </ThemeProvider>
  );
}

export default Codegenerator;
