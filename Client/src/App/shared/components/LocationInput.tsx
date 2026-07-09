import { Box, debounce, List, ListItemButton, TextField, Typography } from '@mui/material';
import { type FieldValues, useController, type UseControllerProps } from 'react-hook-form';
import type { LocationIQSuggestion } from '../../../Lib/types';
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';

type Props<T extends FieldValues> = {
  label: string;
} & UseControllerProps<T>;

export default function LocationInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController<T>({ ...props });
  const [suggestions, setSuggestions] = useState<LocationIQSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [inputValue, setInputValue] = useState(field.value || '');

  useEffect(() => {
    if (field.value && typeof field.value === 'object') {
      setInputValue(field.value.venue || '');
    } else {
      setInputValue(field.value || '');
    }
  }, [field.value]);

  const handleSelect = (location: LocationIQSuggestion) => {
    const city = location.address?.city || location.address?.town || location.address?.village;
    const venue = location.display_name;
    const latitude = parseFloat(location.lat);
    const longitude = parseFloat(location.lon);
    const selectedLocation = {
      city,
      venue,
      latitude,
      longitude,
    };
    setInputValue(venue);
    field.onChange(selectedLocation);

    setSuggestions([]);
  };

  const locationUrl =
    'https://us1.locationiq.com/v1/autocomplete?key=pk.605350c6516e1811eb8d4e85ebea0ef7&limit=5&dedupe=1&';
  const fetchSuggestions = useMemo(
    () =>
      debounce(async (query: string) => {
        if (!query! || query.length < 3) {
          setSuggestions([]);
          return;
        }
        try {
          const response = await axios.get<LocationIQSuggestion[]>(
            `${locationUrl}q=${encodeURIComponent(query)}`
          );
          setSuggestions(response.data);
        } catch (error) {
          console.error('Error fetching location suggestions:', error);
        } finally {
          setLoading(false);
        }
      }, 500),
    [locationUrl]
  );
  const handleChange = async (value: string) => {
    field.onChange(value);
    setLoading(true);
    await fetchSuggestions(value);
  };

  return (
    <Box>
      <TextField
        {...props}
        value={inputValue}
        onChange={(e) => handleChange(e.target.value)}
        fullWidth
        variant="outlined"
        error={!!fieldState.error}
        helperText={fieldState.error?.message}
      />
      {loading && <Typography>Loading...</Typography>}
      {suggestions.length > 0 && (
        <List sx={{ border: 1 }}>
          {suggestions.map((suggestion) => (
            <ListItemButton
              divider
              key={suggestion.place_id}
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion.display_name}
            </ListItemButton>
          ))}
        </List>
      )}
    </Box>
  );
}
