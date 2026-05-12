import { Paper, Typography, Box, TextField, Button } from '@mui/material';
import React from 'react';
import { useActivities } from '../../../Lib/hooks/useActivities';

type Props = {
  activity?: Activity;
  closeForm: () => void;
};
export default function ActivityForm({ activity, closeForm }: Props) {
  const { updateActivity, createActivity } = useActivities();
  const handleSubmit = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    if (activity) {
      data.id = activity.id;
      await updateActivity.mutateAsync(data as unknown as Activity);
    } else {
      await createActivity.mutateAsync(data as unknown as Activity);
    }
    closeForm();
  };

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
        onSubmit={handleSubmit}
      >
        <TextField name="title" label="Title" defaultValue={activity?.title} fullWidth />

        <TextField
          name="description"
          label="Description"
          multiline
          rows={3}
          defaultValue={activity?.description}
          fullWidth
        />

        <TextField name="category" label="Category" defaultValue={activity?.category} fullWidth />

        <TextField
          name="date"
          label="Date"
          type="date"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          defaultValue={
            activity?.date
              ? new Date(activity.date).toISOString().split('T')[0]
              : new Date().toISOString().split('T')[0]
          }
          fullWidth
        />

        <TextField name="city" label="City" defaultValue={activity?.city} fullWidth />

        <TextField name="venue" label="Venue" defaultValue={activity?.venue} fullWidth />

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
            mt: 3,
          }}
        >
          <Button color="inherit" onClick={closeForm}>
            Cancel
          </Button>

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
