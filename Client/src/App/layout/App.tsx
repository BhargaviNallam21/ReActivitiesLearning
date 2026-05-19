import { Box, Container, CssBaseline } from '@mui/material';
import Navbar from './Navbar';
import { useLocation } from 'react-router-dom';

import { Outlet } from 'react-router';
import { use } from 'react';
import HomePage from '../../features/home/HomePage';

function App() {
  const location = useLocation();
  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <CssBaseline />
      {location.pathname === '/' ? (
        <HomePage />
      ) : (
        <>
          <Navbar />{' '}
          <Container maxWidth="xl" sx={{ marginTop: 3 }}>
            <Outlet />
          </Container>
        </>
      )}
    </Box>
  );
}
export default App;
