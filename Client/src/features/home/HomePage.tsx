import { Group } from '@mui/icons-material';
import { Box, Button, Paper, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
export default function HomePage() {
  return (
    <Paper
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        aligncontent: 'center',
        flexDirection: 'column',
        gap: 6,
        backgroundColor: 'primary.main',
        color: 'white',
        backgroundImage: 'linear-gradient(135deg, #182a73 0%, #218aae 69%, #20a7ac 79%)',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignContent: 'center',
          alignItems: 'center',
          gap: 3,
          color: 'white',
        }}
      >
        <Group sx={{ height: 110, width: 110 }} />
        <Typography variant="h2" sx={{ fontWeight: 'bold' }}>
          Reactivities
        </Typography>
      </Box>
      <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        Welcome to Reactivities, the social app for React developers.
      </Typography>
      <Button
        sx={{
          height: '80',
          borderRadius: 4,
          fontSize: '1.5rem',
          color: 'white',
          backgroundColor: 'secondary.main',
          '&:hover': { backgroundColor: 'secondary.dark' },
        }}
        component={Link}
        to="/activities"
      >
        Take me to the activities!
      </Button>
    </Paper>
  );
}
