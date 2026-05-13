import { Box, Typography } from '@mui/material';
import ActivityCard from './ActivityCard';
import { useActivities } from '../../../Lib/hooks/useActivities';

export default function ActivityList() {
  const { activities, isPending } = useActivities();
  if (!activities || isPending) {
    return (
      <Typography variant="h5" align="center">
        Loading activities...
      </Typography>
    );
  } else if (!Array.isArray(activities)) {
    return (
      <Typography variant="h5" align="center">
        No activities found
      </Typography>
    );
  }
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </Box>
  );
}
