import { Divider, Paper, Typography } from '@mui/material';
import { useLocation } from 'react-router';

export default function ServerError() {
  const { state } = useLocation();
  return (
    <Paper>
      {state.error ? (
        <>
          <Typography variant="h3" color="error" gutterBottom sx={{ px: 4, pt: 2 }}>
            {state.error.message || 'there has been an Error'}
          </Typography>
          <Divider />
          <Typography variant="body1" sx={{ px: 4, pt: 2 }}>
            {state.error?.details || 'Internal Server Error'}
          </Typography>
        </>
      ) : (
        <Typography variant="h5">Server Error</Typography>
      )}
    </Paper>
  );
}
