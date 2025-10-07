import React, { useEffect, useState } from "react";
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
  CircularProgress,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Dialog,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ContentCopy } from "@mui/icons-material";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { EMBED_BASE_URL } from "../constants/constants";
import { useDispatch, useSelector } from "react-redux";
import { fetchColorThemes, createColorTheme, clearMessages } from "../redux/reducer/colorThemeSlice";

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
  const [newAccentColor, setNewAccentColor] = useState("#131e27");
  const [newButtonColor, setNewButtonColor] = useState("#ffc000");
  const [newHoverColor, setNewHoverColor] = useState("#f8f9fa");
  const [newBaseColor, setNewBaseColor] = useState("#ebf3f9");

  const [iframeUrl, setIframeUrl] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [showEmbedCode, setShowEmbedCode] = useState(false);
  const [activeTab, setActiveTab] = useState("code");
  const [isOpen, setIsOpen] = useState(false);
  const [themeName, setThemeName] = useState("Life Innovator");
  const dispatch = useDispatch();
  const { themes, loading, error, successMessage } = useSelector((state) => state.colorThemes);
  const [loadingg, setLoadingg] = useState(loading);
const [previousThemeName, setPreviousThemeName] = useState(themeName);

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
  const handleOpenDialog = () => {
     setPreviousThemeName(themeName);
    setIsOpen(true);
    setThemeName("");
  };
const handleCancelDialog = () => {
  setIsOpen(false);
  setThemeName(previousThemeName); // restore previous theme
};
  const handleSaveTheme = async () => {
    try {
      if (!themeName.trim()) {
        setSnackbarMessage("Please enter theme name");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
        return;
      }

      dispatch(createColorTheme({
        themeName,
        accentColor: newAccentColor,
        buttonColor: newButtonColor,
        hoverColor: newHoverColor,
        baseColor: newBaseColor,
      }));
      setSnackbarMessage("Theme created successfully");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setIsOpen(false);
    } catch (error) {
      setSnackbarMessage("Something went wrong");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      console.error("Error saving theme:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchColorThemes());
  }, [dispatch]);

  const generateEmbedCode = () => {
    return `<iframe id="crossDomainIframe" src="${iframeUrl}" width="100%" height="600" frameborder="0"></iframe>
    <script src="https://demos.godigitalalchemy.com/illustrata/embed/autoheight.js"></script>`;
  };

  const copyToClipboard = () => {
    navigator.clipboard
      .writeText(generateEmbedCode())
      .then(() => {
        setSnackbarMessage("Embed code copied to clipboard!");
        setSnackbarSeverity("success");
        setSnackbarOpen(true);
      })
      .catch((err) => {
        setSnackbarMessage("Failed to copy embed code");
        setSnackbarSeverity("error");
        setSnackbarOpen(true);
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
      accentColor.replace("#", "")
    )}&buttonColor=${encodeURIComponent(
      buttonColor.replace("#", "")
    )}&hoverColor=${encodeURIComponent(
      hoverColor.replace("#", "")
    )}&baseColor=${encodeURIComponent(baseColor.replace("#", ""))}`;
    if (url !== iframeUrl) {
      setIframeUrl(url);
      setShowEmbedCode(true);
      setLoadingg(true);
    }
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
                    <Box className="color-customization-inputs" mt={1} mb={2}>
                      <FormControl>
                        <InputLabel
                          id="theme-select-label"
                          sx={{
                            top: "-4px",
                            "&.Mui-focused": { top: 0 },
                          }}
                        >
                          Select Color Theme
                        </InputLabel>
                        <Select
                          labelId="theme-select-label"
                          value={themeName}
                          label="Select Color Theme"
                          onChange={(e) => {
                            const selectedThemeName = e.target.value;
                            setThemeName(selectedThemeName);

                            if (selectedThemeName === "custom") {
                              setAccentColor("#131e27");
                              setButtonColor("#ffc000");
                              setHoverColor("#f8f9fa");
                              setBaseColor("#ebf3f9");
                            } else {
                              const selectedTheme = themes.find(
                                (theme) => theme.themeName === selectedThemeName
                              );
                              if (selectedTheme) {
                                setAccentColor(
                                  selectedTheme.accentColor || "#131e27"
                                );
                                setButtonColor(
                                  selectedTheme.buttonColor || "#ffc000"
                                );
                                setHoverColor(
                                  selectedTheme.hoverColor || "#f8f9fa"
                                );
                                setBaseColor(
                                  selectedTheme.baseColor || "#ebf3f9"
                                );
                              }
                            }
                          }}
                          sx={{
                            borderRadius: 1,
                            height: 45,
                          }}
                          MenuProps={{
                            disableScrollLock: true,
                          }}
                        >
                          {themes.map((theme) => (
                            <MenuItem key={theme._id} value={theme.themeName}>
                              {theme.themeName}
                            </MenuItem>
                          ))}
                          <MenuItem value="custom">Custom</MenuItem>
                        </Select>
                      </FormControl>
                      <Button
                        variant="outlined"
                        onClick={handleOpenDialog}
                        className="createThemeBtn"
                      >
                        <AddIcon sx={{ fontSize: "18px", mr: 0.5 }} /> Create
                        new color theme
                      </Button>
                    </Box>
                    <Dialog
                      open={isOpen}
                      onClose={() => setIsOpen(false)}
                      PaperProps={{
                        className: "dialogBox"
                      }}
                      disableScrollLock={true} 
                    >
                      <Typography
                        variant="h6"
                        className="dialog-title"
                      >
                        Create new color theme
                      </Typography>

                      <Box
                        display="flex"
                        flexDirection="column"
                        gap={2}
                        sx={{ mb: 2 }}
                      >
                        <TextField
                          fullWidth
                          label="Theme Name"
                          type="text"
                          value={themeName}
                          onChange={(e) => setThemeName(e.target.value)}
                        />
                        <Box className="color-customization-inputs">
                          <TextField
                            fullWidth
                            label="Accent Color"
                            type="color"
                            value={newAccentColor}
                            onChange={(e) => setNewAccentColor(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                          />
                          <TextField
                            fullWidth
                            label="Button Color"
                            type="color"
                            value={newButtonColor}
                            onChange={(e) => setNewButtonColor(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                          />
                          <TextField
                            fullWidth
                            label="Hover Color"
                            type="color"
                            value={newHoverColor}
                            onChange={(e) => setNewHoverColor(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                          />
                          <TextField
                            fullWidth
                            label="Base Color"
                            type="color"
                            value={newBaseColor}
                            onChange={(e) => setNewBaseColor(e.target.value)}
                            InputLabelProps={{ shrink: true }}
                          />
                        </Box>
                      </Box>

                      <Box
                        display="flex"
                        justifyContent="space-between"
                        gap={2}
                      >
                        <Button
                          variant="outlined"
                          color="error"
                          fullWidth
                          onClick={handleCancelDialog}
                        >
                          Cancel
                        </Button>
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={handleSaveTheme}
                          sx={{
                            backgroundColor: "#11233E",
                            "&:hover": { backgroundColor: "#0a1a2f" },
                          }}
                        >
                          Save
                        </Button>
                      </Box>
                    </Dialog>

                    {themeName === "custom" ? (
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
                    ) : (
                      <Paper
                        variant="outlined"
                        className="color-settings-panel"
                      >
                        <Box className="color-settings-header">
                          <Typography gutterBottom>
                            Selected color theme : {themes.find((t) => t.themeName === themeName)?.themeName || "No Theme Selected"}
                          </Typography>
                        </Box>

                        {(() => {
                          const selectedTheme = themes.find((t) => t.themeName === themeName);
                          if (!selectedTheme) return null;

                          return (
                            <Grid container spacing={2}>
                              <Grid item xs={6}>
                                <Box className="color-preview">
                                  <Box
                                    className="color-circle"
                                    style={{ backgroundColor: selectedTheme.accentColor }}
                                  />
                                  <Typography variant="subtitle2">
                                    Accent: {selectedTheme.accentColor}
                                  </Typography>
                                </Box>
                              </Grid>

                              <Grid item xs={6}>
                                <Box className="color-preview">
                                  <Box
                                    className="color-circle"
                                    style={{ backgroundColor: selectedTheme.buttonColor }}
                                  />
                                  <Typography variant="subtitle2">
                                    Button: {selectedTheme.buttonColor}
                                  </Typography>
                                </Box>
                              </Grid>

                              <Grid item xs={6}>
                                <Box className="color-preview">
                                  <Box
                                    className="color-circle"
                                    style={{ backgroundColor: selectedTheme.hoverColor }}
                                  />
                                  <Typography variant="subtitle2">
                                    Hover: {selectedTheme.hoverColor}
                                  </Typography>
                                </Box>
                              </Grid>

                              <Grid item xs={6}>
                                <Box className="color-preview">
                                  <Box
                                    className="color-circle"
                                    style={{ backgroundColor: selectedTheme.baseColor }}
                                  />
                                  <Typography variant="subtitle2">
                                    Base: {selectedTheme.baseColor}
                                  </Typography>
                                </Box>
                              </Grid>
                            </Grid>
                          );
                        })()}

                      </Paper>
                    )}
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
                            <Box
                              className="preview-iframe-wrapper"
                              sx={{ position: "relative" }}
                            >
                              {loadingg && (
                                <Box className="loader-wrapper">
                                  <CircularProgress sx={{ color: "#11233E" }} />
                                  <Typography
                                    sx={{ mt: 1, color: "text.secondary" }}
                                  >
                                    Loading preview...
                                  </Typography>
                                </Box>
                              )}
                              <iframe
                                id="crossDomainIframe"
                                src={iframeUrl}
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                title="Embed Preview"
                                className="preview-iframe"
                                onLoad={() => setLoadingg(false)}
                                style={{
                                  opacity: loadingg ? 0 : 1,
                                  transition: "opacity 0.3s ease",
                                }}
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
              className="customAlert"
              onClose={handleSnackbarClose}
              severity={snackbarSeverity}
              sx={{ width: "100%" }}
            >
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Container>
      </Box>
      <Footer />
    </>
  );
}
export default Codegenerator;
