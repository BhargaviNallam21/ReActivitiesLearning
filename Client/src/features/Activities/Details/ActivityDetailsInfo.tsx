import { CalendarToday, Info, Place } from '@mui/icons-material';
import { Box, Button, Divider, Grid, Paper, Typography } from '@mui/material';
import { formatDate } from '../../../Lib/util/util';
import type { Activity } from '../../../Lib/types';
import { useState } from 'react';
import MapComponent from '../../../App/shared/MapComponent';
type props = { activity: Activity };
export default function ActivityDetailsInfo({ activity }: props) {
  const [mapOpen, setMapOpen] = useState(false);
  return (
    <Paper sx={{ mb: 2 }}>
      <Grid container sx={{ alignItems: 'center', pl: 2, py: 1 }}>
        <Grid size={1}>
          <Info color="info" fontSize="large" />
        </Grid>
        <Grid size={11}>
          <Typography>{activity.description}</Typography>
        </Grid>
      </Grid>
      <Divider />
      <Grid container sx={{ alignItems: 'center', pl: 2, py: 1 }}>
        <Grid size={1}>
          <CalendarToday color="info" fontSize="large" />
        </Grid>
        <Grid size={11}>
          <Typography>{formatDate(activity.date)} </Typography>
        </Grid>
      </Grid>
      <Divider />

      <Grid container sx={{ alignItems: 'center', pl: 2, py: 1 }}>
        <Grid size={1}>
          <Place color="info" fontSize="large" />
        </Grid>
        <Grid
          size={11}
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 2,
            pr: 2,
            minWidth: 0,
          }}
        >
          <Typography
            sx={{
              flex: 1,
              whiteSpace: 'normal',
              wordBreak: 'break-word',
            }}
          >
            {activity.venue}, {activity.city}
          </Typography>
          <Button variant="outlined" color="primary" onClick={() => setMapOpen(!mapOpen)}>
            {mapOpen ? 'Hide Map' : 'Show Map'}
          </Button>
        </Grid>
      </Grid>
      {mapOpen && (
        <Box sx={{ height: 400, zIndex: 1000, display: 'block', width: '100%' }}>
          <MapComponent position={[activity.latitude, activity.longitude]} venue={activity.venue} />
        </Box>
      )}
    </Paper>
  );
}
