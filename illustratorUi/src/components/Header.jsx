import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import illustrataLogo from '../../public/Link.svg'; // Ensure you have a logo image in the specified path
import { useNavigate } from "react-router-dom";

const Header = () => {
    const navigate = useNavigate();

    return (
        <AppBar
            position="absolute"   
            elevation={1}
            sx={{
                background: "white",
                color: "#0d1b3d",
                borderRadius: "20px",
                // boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                px: 4,
                py: 1,
                mt: 2,
                top: 25,
                left: 0,
                right: 0,
                margin: "0 auto",
                maxWidth: "1160px",

            }}
        >
            <Toolbar sx={{ justifyContent: "space-between" }}>
                {/* Left Logo */}

                <Box
                    component="img"
                    src={illustrataLogo}
                    alt="Illustrata Logo"
                    sx={{ height: 30 }}
                />

                {/* Right Side - Button */}
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: "#1976d2",
                        borderRadius: "10px",
                        px: 3,
                        fontWeight: "bold",
                        textTransform: "none",
                        "&:hover": {
                            backgroundColor: "#115293",
                        },

                    }}
                    onClick={() => {
                        localStorage.clear();
                        navigate("/login")
                    }}

                >
                    Log Out
                </Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
