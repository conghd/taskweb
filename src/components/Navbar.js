import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Avatar, Box } from "@mui/material";
import { getUser } from "../services/api";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const user = getUser();
  const [anchorEl, setAnchorEl] = useState(null);

  if (!user) return null; // Hide navbar if user is not logged in

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setAnchorEl(null);
    navigate("/login"); // Redirect to login page
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* App Name */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>

        {/* Profile Dropdown */}
        <Box>
          <IconButton onClick={handleMenuOpen} color="inherit">
            <Avatar>{user.name.charAt(0).toUpperCase()}</Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem disabled>{user.name}</MenuItem>
            <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
