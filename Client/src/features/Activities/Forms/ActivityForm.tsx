import { Paper, Typography, Box, Button } from '@mui/material';
import { useActivities } from '../../../Lib/hooks/useActivities';
import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import { act, useEffect } from 'react';
import { activitySchema, type ActivitySchema } from '../../../Lib/schemas/activitySchema';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '../../../App/shared/components/TextInput';
import SelectInput from '../../../App/shared/components/SelectInput';
import { categoryOptions } from './CategoryOptions';
import DateTimeInput from '../../../App/shared/components/DateTimeInput';
import LocationInput from '../../../App/shared/components/LocationInput';
export default function ActivityForm() {
  const { control, reset, handleSubmit } = useForm<ActivitySchema>({
    mode: 'onTouched',
    resolver: zodResolver(activitySchema),
  });
  const navigate = useNavigate();
  const { id } = useParams();
  const { updateActivity, createActivity, activity, isLoadingActivity } = useActivities(id);
  useEffect(() => {
    if (activity) {
      reset({
        ...activity,
        location: {
          city: activity.city,
          venue: activity.venue,
          latitude: activity.latitude,
          longitude: activity.longitude,
        },
      });
    }
  }, [activity, reset]);

  const onSubmit = async (data: ActivitySchema) => {
    const { location, ...rest } = data;
    const flattenedData = {
      ...rest,
      ...location,
    };
    try {
      if (activity) {
        await updateActivity.mutateAsync(
          { ...activity, ...flattenedData },
          {
            onSuccess: () => {
              navigate(`/activities/${activity.id}`);
            },
          }
        );
      } else {
        await createActivity.mutateAsync(flattenedData, {
          onSuccess: (id) => {
            navigate(`/activities/${id}`);
          },
        });
      }
    } catch (error) {
      console.error('Error submitting activity:', error);
    }
  };
  if (isLoadingActivity) {
    return <Typography>Loading Activity...</Typography>;
  }
  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        {activity ? 'Edit Activity' : 'Create Activity'}
      </Typography>
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextInput label="Title" control={control} name="title" />

        <TextInput control={control} label="Description" name="description" multiline rows={3} />
        <Box sx={{ display: 'flex', gap: 3 }}>
          <SelectInput control={control} label="Category" name="category" items={categoryOptions} />
          <DateTimeInput control={control} label="Date" name="date" />
        </Box>
        <LocationInput control={control} label="Enter the location" name="location" />
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
            mt: 3,
          }}
        >
          <Button color="inherit">Cancel</Button>

          <Button
            disabled={updateActivity.isPending || createActivity.isPending}
            type="submit"
            variant="contained"
            color="success"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
