import React from 'react';
import PropTypes from 'prop-types';
import { Box, Text } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const DatePickerComponent = ({ value, onChange }) => {
  return (

      <Box 
        border="2px" 
        borderColor="black" 
        borderRadius="2px" 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        mb={{ base: 5, lg: 0 }}
        mt={3}
        width={"250px"}
      >
        <DatePicker 
          minDate={new Date()} 
          selected={value} 
          onChange={onChange} 
          className='custom-date-picker' 
          customInput={
            <div style={{ position: 'relative' }}>
              <input
                className="custom-date-picker-input"
                value={value ? value.toLocaleDateString() : ''}
                readOnly
              />
              <img
                src="images/calendar.svg"
                className="calendar-icon"
                alt="Calendar Icon"
                style={{
                  position: 'absolute',
                  right: '20px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '20px',
                  height: 'auto'
                }}
              />
            </div>
          } 
        />
      </Box>
  );
};

DatePickerComponent.propTypes = {
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired, 
};

export default DatePickerComponent;