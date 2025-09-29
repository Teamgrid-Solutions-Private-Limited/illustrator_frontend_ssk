import React from "react";
import logoFooter from "../assets/LogoFooter.svg";
import { Box, Container, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      className="custom-footer"
    >
      <Container maxWidth="md" className="footer-container">
        <Typography className="footer-logo-text">
          <Box
            component="img"
            src={logoFooter}
            className="footer-logo"
            alt="Footer Logo"
          />
        </Typography>
        <Typography className="footer-copyright">
          Copyright © 2025 Illustrata. All Rights Reserved.{" "}
          <Box
            component="span"
            className="footer-link"
          >
            Statement of Independence
          </Box>
        </Typography>
      </Container>
    </Box>
  );
}

export default Footer;