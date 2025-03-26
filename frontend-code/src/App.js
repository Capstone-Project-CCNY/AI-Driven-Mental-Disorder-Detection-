import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Container,
} from "@mui/material";
import { Home, Info, Login } from "@mui/icons-material";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      {/* Material UI Navigation Bar */}
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "white", boxShadow: "none" }}
      >
        <Container maxWidth="lg">
          <Toolbar sx={{ justifyContent: "flex-end" }}>
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button
                color="inherit"
                startIcon={<Home />}
                sx={{ color: "#537955", "&:hover": { color: "#e95d4d" } }}
              >
                Home
              </Button>
              <Button
                color="inherit"
                startIcon={<Login />}
                sx={{ color: "#537955", "&:hover": { color: "#e95d4d" } }}
              >
                Sign In
              </Button>
              <Button
                color="inherit"
                startIcon={<Info />}
                sx={{ color: "#537955", "&:hover": { color: "#e95d4d" } }}
              >
                About Us
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#e95d4d",
                  color: "white",
                  "&:hover": { backgroundColor: "#d04a3a" },
                }}
              >
                Contact Us
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ mt: 12, textAlign: "center" }}>
        <div className="content-container">
          <Typography
            variant="h2"
            component="h1"
            sx={{
              color: "#e95d4d",
              fontWeight: "bold",
              mt: 4,
            }}
          >
            Bloom Well
          </Typography>
          <Typography
            variant="h5"
            component="p"
            sx={{
              color: "#537955",
              fontStyle: "italic",
              mt: 2,
            }}
          >
            "When things change inside you, things change around you"
          </Typography>
        </div>
      </Container>
    </div>
  );
}

export default App;
