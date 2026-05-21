import { ButtonGroup, Typography, Button, Box, ListItemText, List, Paper } from '@mui/material';
import useStore from '../../Lib/hooks/useStore';
import { observer } from 'mobx-react-lite';

const Counter = observer(function Counter() {
  const { counterStore } = useStore();

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <Box sx={{ width: '60%' }}>
        <Typography variant="h4" gutterBottom>
          Count: {counterStore.title}
        </Typography>
        <Typography variant="h6">The count is:{counterStore.count}</Typography>

        <ButtonGroup sx={{ mt: 3, gap: 2 }}>
          <Button
            onClick={() => counterStore.increment()}
            variant="contained"
            sx={{ color: 'success' }}
          >
            Increment
          </Button>
          <Button
            onClick={() => counterStore.decrement()}
            variant="contained"
            sx={{ color: 'error' }}
          >
            Decrement
          </Button>
          <Button
            variant="contained"
            onClick={() => counterStore.increment(5)}
            sx={{ color: 'info' }}
          >
            Increment By 5
          </Button>
        </ButtonGroup>
      </Box>
      <Paper sx={{ width: '40%', p: 4 }}>
        <Typography variant="h6">Event Count:({counterStore.EventCount})</Typography>
        <List>
          {counterStore.event.map((event, index) => (
            <ListItemText key={index}>{event}</ListItemText>
          ))}
        </List>
      </Paper>
    </Box>
  );
});
export default Counter;
