import { Paper, Typography, Box, TextField, Button } from '@mui/material';
import { Activity, type FormEvent } from 'react';

type Props = {
  activity?: Activity;
  closeForm: () => void;
  submitForm: (activity: Activity) => void;
};
export default function ActivityForm({ activity, closeForm, submitForm }: Props) {
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });
    if (activity) {
      data.id = activity.id;
    }
    submitForm(data as unknown as Activity);
  };

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Create Activity
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
          defaultValue={activity?.date}
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

          <Button type="submit" variant="contained" color="success">
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
