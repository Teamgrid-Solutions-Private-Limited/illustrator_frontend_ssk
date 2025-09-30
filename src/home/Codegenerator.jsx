import React, { useState } from "react";
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
import { ContentCopy } from "@mui/icons-material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { EMBED_BASE_URL } from "../constants/constants";
const products = [
  { id: 1103, name: "Demo, A Multi-Year Guaranteed Annuity" },
  { id: 1041, name: "Demo, A Fixed Indexed Annuity" },
  { id: 1069, name: "Staysail, A Multi-Year Guaranteed Annuity" },
  { id: 1122, name: "Chartline, A Fixed Indexed Annuity" },
];

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
    const url = `${EMBED_BASE_URL}/illustration/?product=${productIds}&accentColor=${encodeURIComponent(
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
      <Box className="codegenBox">
        <Container maxWidth="lg" className="codegenCon">
          <Header />
          <Box className="codegen-mainbox">
            <Box sx={{ pt: 9 }}>
              <Grid container spacing={6} className="mainGrid">
                <Paper className="config-custom-paper">
                  <Typography className="config-custom-typo">
                    Configuration
                  </Typography>
                  <Grid item xs={12} className="secondary-grid">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={selectedProducts.length === products.length}
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
                    <Paper variant="outlined" className="products-paper">
                      <List dense className="product-list">
                        {products.map((product) => {
                          const selected = selectedProducts.includes(
                            product.id
                          );
                          return (
                            <ListItem
                              key={product.id}
                              className={`product-list-item ${selected ? "selected" : ""
                                }`}
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
                  <Grid item xs={12} className="color-customization-grid">
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
                    <Paper variant="outlined" className="color-settings-panel">
                      <Typography variant="h6" className="color-settings-title">
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
                            <Box
                              className="color-circle"
                              style={{ backgroundColor: accentColor }}
                            />
                            <Typography variant="subtitle2">
                              Accent: {accentColor}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box className="color-preview">
                            <Box
                              className="color-circle"
                              style={{ backgroundColor: buttonColor }}
                            />
                            <Typography variant="subtitle2">
                              Button: {buttonColor}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box className="color-preview">
                            <Box
                              className="color-circle"
                              style={{ backgroundColor: hoverColor }}
                            />
                            <Typography variant="subtitle2">
                              Hover: {hoverColor}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box className="color-preview">
                            <Box
                              className="color-circle"
                              style={{ backgroundColor: baseColor }}
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
              <Box className="embed-parent-container">
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
                            <span className="code-attribute">frameborder</span>=
                            <span className="code-value">"0"</span>
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
                              "{EMBED_BASE_URL}/autoheight.js"
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
            className="customSnackbar"
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              className="customAlert "
              onClose={handleSnackbarClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Embed code copied to clipboard!
            </Alert>
          </Snackbar>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
export default Codegenerator;
