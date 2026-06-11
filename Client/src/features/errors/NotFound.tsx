import { SearchOff } from '@mui/icons-material';
import { Link } from 'react-router';
import { Button, Paper, Typography } from '@mui/material';

export default function NotFound() {
  return (
    <Paper
      sx={{
        padding: 2,
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <SearchOff sx={{ fontSize: 'Medium' }} color="primary" />
      <Typography>we couldn't find what you were looking for</Typography>
      <Button component={Link} to="/activities" variant="contained">
        Return to Activities
      </Button>
    </Paper>
  );
}
