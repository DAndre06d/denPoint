import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, VStack, Spinner, Text } from '@chakra-ui/react';
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
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/dentist/getDentistAvailableTime?denId=${denId}&date=${formattedDate}`,{withCredentials:true});
        const data = response.data;
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
    <Box px={{ base: 0, md: 4 }} py={4} width="100%">
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
          <Box mt={4} width="100%" textAlign="left">
            <Text fontWeight="bold">Selected Slot:</Text>
            <Text>{selectedSlot.start} - {selectedSlot.end}</Text>
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
