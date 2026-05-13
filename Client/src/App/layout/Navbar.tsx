import { Box, AppBar, Toolbar, Typography, Container, MenuItem, MenuList } from '@mui/material';
import { Group } from '@mui/icons-material';
import { NavLink } from 'react-router';
import MenuItemLink from '../shared/components/MenuItemLink';

export default function Navbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{ backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 79%)' }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <MenuList sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <MenuItem component={NavLink} to="/" sx={{ color: 'white' }}>
                <Group fontSize="large" />
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  ReActivities
                </Typography>
              </MenuItem>
            </MenuList>

            <MenuList sx={{ display: 'flex', gap: 2 }}>
              <MenuItemLink to="/activities">Activities</MenuItemLink>
              <MenuItemLink to="/createActivity">Create Activity</MenuItemLink>
            </MenuList>
            <MenuList sx={{ display: 'flex', gap: 2 }}>
              <MenuItem>user menu</MenuItem>
            </MenuList>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
