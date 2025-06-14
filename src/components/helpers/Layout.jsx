import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
// import Footer from './Footer';
import { Box, Toolbar } from '@mui/material';

const Layout = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        width: '100%',
        maxWidth: '100vw',
        bgcolor: 'background.default',
        overflowX: 'hidden',
      }}
    >
      <Navbar />
      <Toolbar />
      <Box
        component="section"
        sx={{
          width: '100%',
          flexGrow: 1,
          boxSizing: 'border-box',
        }}
      >
        <Outlet />
      </Box>
      {/* <Footer /> */}
    </Box>
  );
};

export default Layout;