import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
  MenuItem,
  MenuList,
  LinearProgress,
} from '@mui/material';
import { Group } from '@mui/icons-material';
import { NavLink } from 'react-router';
import MenuItemLink from '../shared/components/MenuItemLink';
import useStore from '../../Lib/hooks/useStore';
import { Observer } from 'mobx-react-lite';

export default function Navbar() {
  const { uiStore } = useStore();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        position="static"
        sx={{
          backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 79%)',
          position: 'relative',
        }}
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
              <MenuItemLink to="/counter">Counter</MenuItemLink>
              <MenuItemLink to="/test-errors">Errors</MenuItemLink>
            </MenuList>
            <MenuList sx={{ display: 'flex', gap: 2 }}>
              <MenuItem>user menu</MenuItem>
            </MenuList>
          </Toolbar>
        </Container>
        <Observer>
          {() =>
            uiStore.isLoading ? (
              <LinearProgress
                color="secondary"
                sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 5 }}
              />
            ) : null
          }
        </Observer>
      </AppBar>
    </Box>
  );
}
