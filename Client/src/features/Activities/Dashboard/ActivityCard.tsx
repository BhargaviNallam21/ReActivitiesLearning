import { AccessTime, Place } from '@mui/icons-material';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Typography,
} from '@mui/material';

import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { formatDate } from '../../../Lib/util/util';
type Props = {
  activity: Activity;
};

export default function ActivityCard({ activity }: Props) {
  const isHost = false;
  const isGoing = false;
  const label = isHost ? 'You are Hosting' : 'you are going';
  const isCancelled = false;
  const color = isHost ? 'secondary' : isGoing ? 'warning' : 'default';

  return (
    <Card elevation={3} sx={{ borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 3 }}>
        <CardHeader
          avatar={<Avatar sx={{ height: 80, width: 80 }} />}
          title={activity.title}
          slotProps={{
            title: {
              fontSize: 20,
              fontWeight: 'bold',
            },
          }}
          subheader={
            <>
              hosted by {''} <Link to={`/profiles/bob}`}>Bob</Link>
            </>
          }
        />
        <Box sx={{ display: 'flex', flexDirection: 'column', mr: 3, gap: 3 }}>
          {(isHost || isGoing) && <Chip label={label} color={color} sx={{ borderRadius: 2 }} />}
          {isCancelled && <Chip label="Cancelled" color="error" sx={{ borderRadius: 2 }} />}
        </Box>
      </Box>
      <Divider sx={{ mb: 2 }} />
      <CardContent sx={{ p: 0 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', px: 2, mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 0 }}>
            <AccessTime sx={{ mr: 2 }} />
            <Typography variant="body2" color="textSecondary" sx={{ whiteSpace: 'nowrap' }}>
              {formatDate(activity.date)}
            </Typography>
          </Box>

          <Place sx={{ mr: 3, ml: 3 }} />
          <Typography variant="body2" color="textSecondary">
            {activity.venue}
          </Typography>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <Box sx={{ display: 'flex', gap: 2, backgroundColor: 'grey.200', py: 3, pl: 2 }}>
          Attendees will go here
        </Box>
      </CardContent>
      <CardContent sx={{ pb: 2 }}>
        <Typography variant="body2">{activity.description}</Typography>
        <Button
          component={Link}
          to={`/activities/${activity.id}`}
          size="medium"
          variant="contained"
          sx={{ display: 'flex', justifySelf: 'self-end', borderRadius: 3 }}
        >
          View
        </Button>
      </CardContent>
    </Card>
  );
}
