import { useEffect, useState } from 'react';
import { Box, Container, CssBaseline } from '@mui/material';

import axios from 'axios';
import Navbar from './Navbar';
import AppDashboard from '../../features/Activities/Dashboard/AppDashboard';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    axios
      .get<Activity[]>('https://localhost:5001/api/activities')

      .then((response) => setActivities(response.data));
    return () => {};
  }, []);
  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find((x) => x.id === id));
  };
  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };

  const handleOpenForm = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  };
  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleSubmitForm = (activity: Activity) => {
    if (activity.id) {
      setActivities(activities.map((x) => (x.id === activity.id ? activity : x)));
      // setActivities([...activities.filter((x) => x.id !== activity.id), activity]);
      // setSelectedActivity(activity);
    } else {
      const newActivity = { ...activity, id: activities.length.toString() };
      setSelectedActivity(newActivity);
      setActivities([...activities, newActivity]);
    }
    setEditMode(false);
  };
  const handleDelete = (id: string) => {
    setActivities(activities.filter((x) => x.id !== id));
  };

  return (
    <Box sx={{ bgcolor: '#eeeeee' }}>
      <CssBaseline />
      <Navbar openForm={handleOpenForm} />
      <Container maxWidth="xl" sx={{ marginTop: 3 }}>
        <AppDashboard
          activities={activities}
          selectedActivity={selectedActivity}
          selectActivity={handleSelectActivity}
          cancelSelectActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleOpenForm}
          closeForm={handleFormClose}
          submitForm={handleSubmitForm}
          deleteActivity={handleDelete}
        />
      </Container>
    </Box>
  );
}
export default App;
