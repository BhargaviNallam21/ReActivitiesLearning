import { Button, Card, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import { Link, useNavigate, useParams } from 'react-router';
import { useActivities } from '../../../Lib/hooks/useActivities';

export default function ActivityDetail() {
  {
    const navigate = useNavigate();
    const { id } = useParams();
    const { activity, isLoadingActivity } = useActivities(id);

    if (isLoadingActivity) return <Typography>Loading...</Typography>;
    if (!activity) return <Typography>Activity not found</Typography>;

    return (
      <Card sx={{ borderRadius: 3 }}>
        <CardMedia component="img" src={`/images/categoryImages/${activity.category}.jpg`} />
        <CardContent>
          <Typography variant="h5">{activity.title}</Typography>
          <Typography variant="subtitle1" fontWeight="light">
            {activity.date}
          </Typography>
          <Typography variant="body1">{activity.description}</Typography>
        </CardContent>
        <CardActions>
          <Button component={Link} to={`/manage/${activity.id}`} size="small">
            Edit
          </Button>
          <Button onClick={() => navigate('/activities')} size="small" color="error">
            Cancel
          </Button>
        </CardActions>
      </Card>
    );
  }
}
