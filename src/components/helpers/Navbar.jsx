import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useLogout from '../../hooks/useLogout';
import { BACKEND_URL } from '../../api/axios';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Box,
  Divider,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import Loader from '../messages/Loader';

const Navbar = () => {
  const { isAuthed, username } = useAuth();
  const logout = useLogout();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const guestLinks = [
    { to: '/login', label: 'Zaloguj', icon: <LoginIcon /> },
    { to: '/register', label: 'Zarejestruj', icon: <PersonAddIcon /> }
  ];

  const handleLogout = async () => {
    setAnchorEl(null);
    setDrawerOpen(false);
    await logout();
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuClose = () => setAnchorEl(null);

  const handleDrawerToggle = () => setDrawerOpen((prev) => !prev);

  const handleProfileClick = () => {
    if (username) {
      navigate(`/users/${username}`);
      setDrawerOpen(false);
      setAnchorEl(null);
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        color="primary"
        elevation={2}
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 1, sm: 2 } }}>
          {/* LOGO */}
          <Box
            component={Link}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              flexGrow: { xs: 1, md: 0 }
            }}
          >
            <img
              src="/gunshop-logo.png"
              alt="Logo"
              style={{ width: 48, height: 48, marginRight: 12 }}
            />
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {!isMobile && (
              !isAuthed() ? (
                guestLinks.map((link) => (
                  <Button
                    key={link.to}
                    component={Link}
                    to={link.to}
                    color="secondary"
                    variant="contained"
                    size="small"
                    startIcon={link.icon}
                    sx={{ borderRadius: 2, fontWeight: 600 }}
                  >
                    {link.label}
                  </Button>
                ))
              ) : (
                <>
                  <Box
                    onClick={handleProfileClick}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      cursor: 'pointer',
                      px: 1,
                      py: 0.5,
                      borderRadius: 2,
                      transition: 'background 0.15s',
                      '&:hover': {
                        background: 'rgba(255,255,255,0.12)'
                      }
                    }}
                  >
                    <Avatar
                      src={null}
                      alt={username}
                      sx={{
                        width: 36,
                        height: 36,
                        bgcolor: theme.palette.secondary.main,
                        color: '#fff'
                      }}
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        color: '#fff',
                        fontWeight: 600,
                        ml: 0,
                        userSelect: 'none'
                      }}
                    >
                      {username}
                    </Typography>
                  </Box>
                  <IconButton
                    color="inherit"
                    onClick={handleMenuOpen}
                    aria-label="Ustawienia"
                    size="large"
                    sx={{ p: 1, ml: 1 }}
                  >
                    <SettingsIcon fontSize="large" />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    disableScrollLock
                  >
                    <MenuItem onClick={() => { navigate('/change-password'); handleMenuClose(); }}>
                      Zmień hasło
                    </MenuItem>
                    <MenuItem 
                      onClick={handleLogout}
                      sx={{
                        color: theme.palette.error.main,
                        '&:hover': { bgcolor: theme.palette.error.main, color: '#fff' },
                      }}
                    >
                      Wyloguj
                    </MenuItem>
                  </Menu>
                </>
              )
            )}

            {isMobile && (
              <IconButton
                color="inherit"
                edge="end"
                onClick={handleDrawerToggle}
                aria-label="menu"
                size="large"
              >
                <MenuIcon />
              </IconButton>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={handleDrawerToggle}
        disableScrollLock
        PaperProps={{
          sx: { width: 200, bgcolor: theme.palette.primary.main, color: '#fff' }
        }}
      >
        <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', my: 1 }} />
        <List>
          {!isAuthed() ? (
            guestLinks.map((link) => (
              <ListItem
                key={link.to}
                component={Link}
                to={link.to}
                onClick={handleDrawerToggle}
                sx={{
                  color: '#fff',
                  borderRadius: 1,
                  mb: 1,
                  '&:hover': { bgcolor: theme.palette.secondary.main, color: '#fff' }
                }}
                button={true}
              >
                <ListItemIcon sx={{ color: '#fff', minWidth: 36 }}>
                  {link.icon}
                </ListItemIcon>
                <ListItemText primary={link.label} />
              </ListItem>
            ))
          ) : (
            <>
              <ListItem
                sx={{
                  py: 1,
                  cursor: 'pointer',
                  borderRadius: 2,
                  transition: 'background 0.15s',
                  '&:hover': {
                    background: 'rgba(255,255,255,0.12)'
                  }
                }}
                onClick={handleProfileClick}
              >
                <Avatar
                  src={null}
                  alt={username}
                  sx={{
                    width: 36,
                    height: 36,
                    bgcolor: theme.palette.secondary.main,
                    color: '#fff',
                    mr: 1
                  }}
                />
                <ListItemText
                  primary={username}
                  primaryTypographyProps={{ color: '#fff', fontWeight: 600 }}
                />
              </ListItem>
              <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', my: 1 }} />
              <ListItem
                component={Link}
                to="/"
                onClick={handleDrawerToggle}
                sx={{ color: '#fff', borderRadius: 1, mb: 1 }}
                button
              >
                <ListItemText primary="Strona główna" button/>
              </ListItem>
              <Divider sx={{ bgcolor: 'rgba(255,255,255,0.2)', my: 1 }} />
                <ListItem
                  button
                  sx={{
                    cursor: 'pointer',
                  }}
                  onClick={() => {
                    navigate('/change-password');
                    handleDrawerToggle();
                  }}
                >
                  <ListItemText primary="Zmień hasło" />
                </ListItem>
              <ListItem
                onClick={handleLogout}
                sx={{
                  color: theme.palette.error.main,
                  cursor: 'pointer',
                  borderRadius: 1,
                  mt: 1,
                  '&:hover': { bgcolor: theme.palette.error.main, color: '#fff' }
                }}
                button
              >
                <ListItemText primary="Wyloguj" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
    </>
  );
};

export default Navbar;