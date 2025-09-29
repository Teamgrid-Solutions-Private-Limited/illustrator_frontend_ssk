import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Chip,
  Button,
  Paper,
  Snackbar,
  Alert,
  Grid,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  FormControlLabel,
  Tabs,
  Tab,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ContentCopy } from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Header from "../components/Header";
import Footer from "../components/Footer";

const products = [
  { id: 1103, name: "Demo, A Multi-Year Guaranteed Annuity" },
  { id: 1041, name: "Demo, A Fixed Indexed Annuity" },
  { id: 1069, name: "Staysail, A Multi-Year Guaranteed Annuity" },
  { id: 1122, name: "Chartline, A Fixed Indexed Annuity" },
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
  const [accentColor, setAccentColor] = useState("#131e27");
  const [buttonColor, setButtonColor] = useState("#ffc000");
  const [hoverColor, setHoverColor] = useState("#f8f9fa");
  const [baseColor, setBaseColor] = useState("#EBF3F9");
  const [iframeUrl, setIframeUrl] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [showEmbedCode, setShowEmbedCode] = useState(false);
  const [activeTab, setActiveTab] = useState("code");
  const navigate = useNavigate();

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
    setSelectedProducts((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleSelectAll = () => {
    if (selectedProducts.length === products.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(products.map((p) => p.id));
    }
  };

  const generateEmbedCode = () => {
    return `<iframe id="crossDomainIframe" src="${iframeUrl}" width="100%" height="600" frameborder="0"></iframe>
    <script src="https://demos.godigitalalchemy.com/illustrata/embed/autoheight.js"></script>`;
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
    const productIds = selectedProducts.join(",");
    const url = `https://demos.godigitalalchemy.com/illustrata/embed/illustration/?product=${productIds}&accentColor=${encodeURIComponent(
      accentColor
    )}&buttonColor=${encodeURIComponent(
      buttonColor
    )}&hoverColor=${encodeURIComponent(
      hoverColor
    )}&baseColor=${encodeURIComponent(baseColor)}`;
    setIframeUrl(url);
    setShowEmbedCode(true);
  };

  return (
    <>
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
              <Box sx={{ pt: 9 }}>
                <Grid
                  container
                  spacing={6}
                  sx={{
                    mb: 5,
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <Paper sx={{ p: 4, borderRadius: 2, flex: 1 }}>
                    <Typography
                      sx={{
                        mb: 2,
                        color: "#2c3e50",
                        fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
                        fontWeight: 600,
                        fontSize: "20px",
                      }}
                    >
                      Configuration
                    </Typography>
                    <Grid
                      item
                      xs={12}
                      sx={{ display: "flex", flexDirection: "column" }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={
                              selectedProducts.length === products.length
                            }
                            indeterminate={
                              selectedProducts.length > 0 &&
                              selectedProducts.length < products.length
                            }
                            onChange={handleSelectAll}
                          />
                        }
                        label={`Select All (${selectedProducts.length}/${products.length} selected)`}
                        sx={{ mb: 2 }}
                      />
                      <Paper
                        variant="outlined"
                        sx={{
                          maxHeight: 300,
                          overflow: "auto",
                          p: 1,
                          border: "1px solid #ddd",
                        }}
                      >
                        <List dense sx={{ width: "100%" }}>
                          {products.map((product) => {
                            const selected = selectedProducts.includes(
                              product.id
                            );
                            return (
                              <ListItem
                                key={product.id}
                                sx={{
                                  borderBottom: "1px solid #f0f0f0",
                                  "&:last-child": { borderBottom: "none" },
                                  py: 0.5,
                                  px: 1,
                                  cursor: "pointer",
                                  fontSize: "0.875rem",
                                  backgroundColor: selected
                                    ? "#102442"
                                    : "transparent",
                                  color: selected ? "white" : "inherit",
                                  "&:hover": {
                                    backgroundColor: selected
                                      ? "#102442"
                                      : "#f5f5f5",
                                  },
                                }}
                                onClick={() => handleProductToggle(product.id)}
                              >
                                <ListItemText
                                  primary={product.name}
                                  primaryTypographyProps={{
                                    fontSize: "0.875rem",
                                  }}
                                  secondaryTypographyProps={{
                                    fontSize: "0.75rem",
                                  }}
                                />
                              </ListItem>
                            );
                          })}
                        </List>
                      </Paper>
                    </Grid>
                  </Paper>
                  <Paper sx={{ p: 4, borderRadius: 2, flex: 1 }}>
                    <Typography
                      sx={{
                        mb: 2,
                        color: "#2c3e50",
                        fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
                        fontWeight: 600,
                        fontSize: "20px",
                      }}
                    >
                      Color Customization
                    </Typography>
                    <Grid
                      item
                      xs={12}
                      sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
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
                        <Typography
                          variant="h6"
                          sx={{ fontWeight: 600, mb: 1 }}
                        >
                          Current Settings
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: "bold", mb: 1 }}
                        >
                          Products Selected:
                        </Typography>
                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                            mb: 2,
                          }}
                        >
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
                                    background: "#11233E",
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
                        <Grid container spacing={2}>
                          <Grid item xs={6}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: "50%",
                                  bgcolor: accentColor,
                                  border: "2px solid white",
                                }}
                              />
                              <Typography variant="subtitle2">
                                Accent: {accentColor}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: "50%",
                                  bgcolor: buttonColor,
                                  border: "2px solid white",
                                }}
                              />
                              <Typography variant="subtitle2">
                                Button: {buttonColor}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: "50%",
                                  bgcolor: hoverColor,
                                  border: "2px solid white",
                                }}
                              />
                              <Typography variant="subtitle2">
                                Hover: {hoverColor}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Box
                                sx={{
                                  width: 20,
                                  height: 20,
                                  borderRadius: "50%",
                                  bgcolor: baseColor,
                                  border: "2px solid white",
                                }}
                              />
                              <Typography variant="subtitle2">
                                Base: {baseColor}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Paper>
                    </Grid>
                  </Paper>
                </Grid>
                <Box sx={{ display: "flex", justifyContent: "center", mb: 5 }}>
                  <Button
                    variant="contained"
                    size="large"
                    onClick={handleGenerateEmbedCode}
                    disabled={selectedProducts.length === 0}
                    className="generate-btn"
                  >
                    Generate Embed Code
                  </Button>
                </Box>
                {showEmbedCode && (
                  <Box className="embed-container">
                    <Paper className="tabs-paper">
                      <Tabs
                        value={activeTab}
                        onChange={(event, newValue) => setActiveTab(newValue)}
                        variant="fullWidth"
                        className="embed-tabs"
                      >
                        <Tab
                          label="Embed Code"
                          value="code"
                          className="embed-tab"
                        />
                        <Tab
                          label="Live Preview"
                          value="preview"
                          className="embed-tab"
                        />
                      </Tabs>
                    </Paper>
                    <Paper className="content-paper">
                      {activeTab === "code" && (
                        <Box className="code-tab-content">
                          <Box className="code-box">
                            <Box className="code-line">{`<iframe`}</Box>
                            <Box className="code-indent">
                              <span className="code-attribute">id</span>=
                              <span className="code-value">
                                "crossDomainIframe"
                              </span>
                            </Box>
                            <Box className="code-indent">
                              <span className="code-attribute">src</span>=
                              <span className="code-value">"{iframeUrl}"</span>
                            </Box>
                            <Box className="code-indent">
                              <span className="code-attribute">width</span>=
                              <span className="code-value">"100%"</span>
                            </Box>
                            <Box className="code-indent">
                              <span className="code-attribute">height</span>=
                              <span className="code-value">"600"</span>
                            </Box>
                            <Box className="code-indent">
                              <span className="code-attribute">
                                frameborder
                              </span>
                              =<span className="code-value">"0"</span>
                            </Box>
                            <Box className="code-indent">
                              <span className="code-attribute">title</span>=
                              <span className="code-value">
                                "Illustration Widget"
                              </span>
                            </Box>
                            <Box className="code-line">{`></iframe>`}</Box>
                            <Box className="code-line">{`<script`}</Box>
                            <Box className="code-indent">
                              <span className="code-attribute">src</span>=
                              <span className="code-value">
                                "https://demos.godigitalalchemy.com/illustrata/embed/autoheight.js"
                              </span>
                            </Box>
                            <Box className="code-line">{`></script>`}</Box>
                          </Box>
                          <Button
                            variant="contained"
                            fullWidth
                            className="generate-btn"
                            startIcon={<ContentCopy />}
                            onClick={copyToClipboard}
                          >
                            Copy Code
                          </Button>
                        </Box>
                      )}
                      {activeTab === "preview" && (
                        <Box className="preview-tab-content">
                          <Box className="preview-container">
                            {iframeUrl ? (
                              <Box className="preview-iframe-wrapper">
                                <iframe
                                  id="crossDomainIframe"
                                  src={iframeUrl}
                                  width="100%"
                                  height="100%"
                                  frameBorder="0"
                                  title="Embed Preview"
                                  className="preview-iframe"
                                />
                              </Box>
                            ) : (
                              <Box className="preview-placeholder">
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                  gutterBottom
                                >
                                  {selectedProducts &&
                                  selectedProducts.length === 0
                                    ? "Select at least one product to see preview"
                                    : "Loading preview..."}
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Box>
                      )}
                    </Paper>
                  </Box>
                )}
              </Box>
            </Box>

            <Snackbar
              open={snackbarOpen}
              autoHideDuration={3000}
              onClose={handleSnackbarClose}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert
                onClose={handleSnackbarClose}
                severity="success"
                sx={{ width: "100%" }}
              >
                Embed code copied to clipboard!
              </Alert>
            </Snackbar>
          </Container>
        </Box>
      </ThemeProvider>
      <Footer />
    </>
  );
}

export default Codegenerator;
