import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  Badge,
  Button,
  Menu,
  MenuItem,
  Avatar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const { user, logout, isAuthenticated } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    navigate('/');
  };

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Shop", path: "/shop" },
    { label: "Contact Us", path: "/contact" },
    { label: "Cart", path: "/cart" },
  ];

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        backgroundColor: "#fff",
      }}
    >
      <div className="container">
        <div className="navbar__1">
          <div>
            <img
              src="https://tunatheme.com/tf/html/vicodin-preview/vicodin/img/logo.png"
              alt="logo"
              style={{ height: "40px", marginRight: "10px" }}
            />
          </div>
          <div className="search-box">
            <input type="text" placeholder="Search here..." />
            <SearchOutlinedIcon />
          </div>
          <div className="navbar__1_cart">
            <IconButton
              color="inherit"
              onClick={() => navigate("/cart")}
              sx={{ position: "relative", padding: "10px" }}
            >
              <Badge
                badgeContent={cart.length}
                color="secondary"
                sx={{
                  "& .MuiBadge-badge": {
                    fontSize: "0.75rem",
                    minWidth: "18px",
                    height: "18px",
                  },
                }}
              >
                <ShoppingCartOutlinedIcon fontSize="medium" />
              </Badge>
            </IconButton>
            <div>
              <span>YOUR CART</span>
              <span>Ksh 488</span>
            </div>
            {isAuthenticated ? (
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                <Typography variant="body1" sx={{ mr: 2 }}>
                  {user?.name}
                </Typography>
                <IconButton onClick={handleMenuOpen}>
                  <Avatar sx={{ bgcolor: '#0A9A73' }}>
                    {user?.name?.charAt(0)}
                  </Avatar>
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', gap: 2, ml: 2 }}>
                <Button
                  variant="outlined"
                  color="primary"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => navigate('/register')}
                >
                  Register
                </Button>
              </Box>
            )}
          </div>
        </div>
      </div>
      <div>
        <AppBar position="static" sx={{ backgroundColor: "#0A9A73" }}>
          <Toolbar sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 3 }}>
              {navItems.map(({ label, path }) => (
                <Link
                  key={label}
                  to={path}
                  style={{
                    color: "#fff",
                    textDecoration: "none",
                  }}
                >
                  {label}
                </Link>
              ))}
            </Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="temporary"
          anchor="right"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <List sx={{ width: 250 }}>
            {navItems.map(({ label, path }) => (
              <ListItem
                key={label}
                button
                component={Link}
                to={path}
                onClick={handleDrawerToggle}
              >
                <ListItemText primary={label} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </div>
    </div>
  );
};

export default Navbar;
