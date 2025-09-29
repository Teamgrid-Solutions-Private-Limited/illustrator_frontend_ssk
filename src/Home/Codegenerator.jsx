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
  const [baseColor, setBaseColor] = useState("#ebf3f9");
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
        <Box className="codegenBox">
          <Container maxWidth="lg" className="codegenCon">
            <Header />
            <Box className="codegen-mainbox">
              <Box sx={{ pt: 9 }}>
                <Grid
                  container
                  spacing={6}
                  className="mainGrid"
                >
                  <Paper className="config-custom-paper">
                    <Typography className="config-custom-typo">
                      Configuration
                    </Typography>
                    <Grid
                      item
                      xs={12}
                     className="secondary-grid"
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
                        className="products-paper"
                      >
                        <List dense className="product-list">
                          {products.map((product) => {
                            const selected = selectedProducts.includes(
                              product.id
                            );
                            return (
                              <ListItem
                                key={product.id}
                                className={`product-list-item ${selected ? "selected" : ""}`}
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
                  <Paper className="config-custom-paper">
                    <Typography className="config-custom-typo">
                      Color Customization
                    </Typography>
                    <Grid
                      item
                      xs={12}
                      className="color-customization-grid"
                    >
                      <Box className="color-customization-inputs">
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
                        className="color-settings-panel"
                      >
                        <Typography
                          variant="h6"
                          className="color-settings-title"
                        >
                          Current Settings
                        </Typography>
                        <Typography
                          variant="subtitle2"
                          className="color-settings-subtitle"
                        >
                          Products Selected:
                        </Typography>
                        <Box className="selected-products">
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
                                  className="custom-chip"
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
                            <Box className="color-preview">
                              <Box className="color-circle" style={{ backgroundColor: accentColor }} />
                              <Typography variant="subtitle2">
                                Accent: {accentColor}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="color-preview">
                              <Box className="color-circle" style={{ backgroundColor: buttonColor }} />
                              <Typography variant="subtitle2">
                                Button: {buttonColor}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="color-preview">
                              <Box className="color-circle" style={{ backgroundColor: hoverColor }}/>
                              <Typography variant="subtitle2">
                                Hover: {hoverColor}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box className="color-preview">
                              <Box className="color-circle" style={{ backgroundColor: baseColor }}/>
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
                    sx={{
                      background:
                        selectedProducts.length === 0
                          ? "grey"
                          : "linear-gradient(320.1deg, #11233E 44.4%, #567BB0 97.6%)",
                      px: 4,
                      py: 1.5,
                      fontWeight: "600",
                      fontSize: "16px",
                      textTransform: "none",
                      "&.Mui-disabled": {
                        background: "#ccc",
                        color: "#666",
                      },
                    }}
                  >
                    Generate Embed Code
                  </Button>
                </Box>
                {showEmbedCode && (
                  <Box
                    sx={{
                      mt: 2,
                      width: "100%",
                      minHeight: "500px",
                    }}
                  >
                    <Paper
                      variant="outlined"
                      sx={{
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                        borderBottom: "none",
                      }}
                    >
                      <Tabs
                        value={activeTab}
                        onChange={(event, newValue) => setActiveTab(newValue)}
                        variant="fullWidth"
                        sx={{
                          minHeight: "48px",
                          "& .MuiTab-root": {
                            minHeight: "48px",
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                          },
                          
                        }}
                      >
                        <Tab
                          label="Embed Code"
                          value="code"
                          sx={{
                            color: "text.secondary", 
                            "&.Mui-selected": {
                              color: "#11233E",
                            },
                          }}
                        />
                        <Tab
                          label="Live Preview"
                          value="preview"
                          sx={{
                            color: "text.secondary", 
                            "&.Mui-selected": {
                              color: "#11233E",
                            },
                          }}
                        />
                      </Tabs>
                    </Paper>

                    {/* Tab Content */}
                    <Paper
                      variant="outlined"
                      sx={{
                        borderTopLeftRadius: 0,
                        borderTopRightRadius: 0,
                        minHeight: "450px",
                      }}
                    >
                      {/* Embed Code Tab */}
                      {activeTab === "code" && (
                        <Box
                          sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            gap: 2,
                            height: "100%",
                            minHeight: "450px",
                          }}
                        >

                          {/* Code Box */}
                          <Box
                            sx={{
                              p: 2,
                              bgcolor: "#243241ff",
                              border: "1px solid #2d2d2d",
                              borderRadius: 2,
                              overflowX: "auto",
                              overflowY: "auto",
                              fontSize: "0.85rem",
                              fontFamily:
                                "'Fira Code', 'Consolas', 'Monaco', monospace",
                              lineHeight: 1.6,
                              color: "#d4d4d4",
                              minHeight: "300px",
                              flex: 1,
                              wordWrap: "break-word",
                              whiteSpace: "pre-wrap",
                              boxShadow: "inset 0 0 8px rgba(0,0,0,0.6)",
                            }}
                          >
                            <Box sx={{ color: "#569cd6" }}>{`<iframe`}</Box>
                            <Box sx={{ pl: 2 }}>
                              <span style={{ color: "#9cdcfe" }}>id</span>=
                              <span style={{ color: "#ce9178" }}>
                                "crossDomainIframe"
                              </span>
                            </Box>
                            <Box sx={{ pl: 2 }}>
                              <span style={{ color: "#9cdcfe" }}>src</span>=
                              <span style={{ color: "#ce9178" }}>
                                "{iframeUrl}"
                              </span>
                            </Box>
                            <Box sx={{ pl: 2 }}>
                              <span style={{ color: "#9cdcfe" }}>width</span>=
                              <span style={{ color: "#ce9178" }}>"100%"</span>
                            </Box>
                            <Box sx={{ pl: 2 }}>
                              <span style={{ color: "#9cdcfe" }}>height</span>=
                              <span style={{ color: "#ce9178" }}>"600"</span>
                            </Box>
                            <Box sx={{ pl: 2 }}>
                              <span style={{ color: "#9cdcfe" }}>
                                frameborder
                              </span>
                              =<span style={{ color: "#ce9178" }}>"0"</span>
                            </Box>
                            <Box sx={{ pl: 2 }}>
                              <span style={{ color: "#9cdcfe" }}>title</span>=
                              <span style={{ color: "#ce9178" }}>
                                "Illustration Widget"
                              </span>
                            </Box>
                            <Box sx={{ color: "#569cd6" }}>{`></iframe>`}</Box>

                            {/* Script tag */}
                            <Box sx={{ color: "#569cd6" }}>{`<script`}</Box>
                            <Box sx={{ pl: 2 }}>
                              <span style={{ color: "#9cdcfe" }}>src</span>=
                              <span style={{ color: "#ce9178" }}>
                                "https://demos.godigitalalchemy.com/illustrata/embed/autoheight.js"
                              </span>
                            </Box>
                            <Box sx={{ color: "#569cd6" }}>{`></script>`}</Box>
                          </Box>

                          {/* Copy Button */}
                          <Button
                            variant="contained"
                            fullWidth
                            sx={{
                              background:
                                "linear-gradient(320.1deg, #11233E 44.4%, #567BB0 97.6%)",
                              py: 1.5,
                              fontWeight: "600",
                              textTransform: "none",
                            }}
                            startIcon={<ContentCopy />}
                            onClick={copyToClipboard}
                          >
                            Copy Code
                          </Button>
                        </Box>
                      )}

                      {/* Live Preview Tab */}
                      {activeTab === "preview" && (
                        <Box
                          sx={{
                            p: 2,
                            display: "flex",
                            flexDirection: "column",
                            height: "100%",
                            minHeight: "450px",
                          }}
                        >
                          {/* Preview Content */}
                          <Box
                            sx={{
                              flex: 1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              minHeight: "380px",
                            }}
                          >
                            {iframeUrl ? (
                              <Box
                                sx={{
                                  width: "100%",
                                  height: 380,
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
                              <Box sx={{ textAlign: "center", p: 3 }}>
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
