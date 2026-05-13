import { Grid as Grid2 } from '@mui/material';
import ActivityList from './ActivityList';

export default function AppDashboard() {
  return (
    <Grid2 container spacing={3}>
      <Grid2 size={7}>
        <ActivityList />
      </Grid2>
      <Grid2 size={3}>Activity filters go here</Grid2>
    </Grid2>
  );
}
