import React from "react";
import logoFooter from "../assets/LogoFooter.svg";
import { Box, Container, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        background: "linear-gradient(90deg, #1a3c6c 0%, #3a6db3 100%)",
        height:"130px",
        textAlign: "center",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        borderTop: "1.5px solid #e3eafc",
        boxShadow: "0 -2px 12px 0 rgba(31, 38, 135, 0.07)",
        mt: "auto", 
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
            sx={{
              width: { xs: 110, sm: 150, md: 170 },
              height: "auto",
              maxWidth: "80vw",
            }}
            alt="Footer Logo"
          />
        </Typography>
        <Typography
          sx={{
            color: "#D5E5FC",
            mb: 0.5,
            fontSize: { xs: "11px", sm: "14px" },
            fontWeight: 400,
            wordBreak: "break-word",
          }}
        >
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
  );
}

export default Footer;
