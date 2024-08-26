import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, VStack, Spinner } from '@chakra-ui/react';
import { TIMESLOTS } from '../utils/constants.js';
import axios from 'axios';
import { formatDateForDB } from '../utils/textUtils.js';

const TimeSlotSelector = ({ denId, selectedDate, onChange }) => {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [unavailableSlots, setUnavailableSlots] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch unavailable slots from API
  useEffect(() => {
    const fetchUnavailableSlots = async () => {
      setIsLoading(true);
      try {
        const formattedDate = formatDateForDB(selectedDate);
        const response = await axios.get(`http://localhost:3000/dentist/getDentistAvailableTime?denId=${denId}&date=${formattedDate}`,{withCredentials:true});
        const data = response.data;
        console.log(data)
        // Extract time slots from API response
        const slots = data.map(item => item.time);
        setUnavailableSlots(slots);
      } catch (error) {
        console.error('Error fetching unavailable slots:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUnavailableSlots();
  }, [denId, selectedDate]);

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    onChange(slot);
  };

  return (
    <Box p={4}>
      <VStack spacing={4}>
        {isLoading ? (
          <Spinner size="lg" />
        ) : (
          TIMESLOTS.map((slot, index) => (
            <Button
              key={index}
              onClick={() => handleSlotSelect(slot)}
              variant={selectedSlot === slot ? 'solid' : 'outline'}
              colorScheme="blue"
              width="100%"
              isDisabled={unavailableSlots.includes(slot.start + '-' + slot.end)} // Disable button if slot is unavailable
            >
              {slot.start} - {slot.end}
            </Button>
          ))
        )}
        {selectedSlot && (
          <Box mt={4}>
            <h2>Selected Slot:</h2>
            <p>{selectedSlot.start} - {selectedSlot.end}</p>
          </Box>
        )}
      </VStack>
    </Box>
  );
};

TimeSlotSelector.propTypes = {
  denId: PropTypes.string.isRequired,
  selectedDate: PropTypes.instanceOf(Date).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default TimeSlotSelector;