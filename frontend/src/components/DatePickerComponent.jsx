import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import { Box, Input, InputGroup, InputRightElement } from '@chakra-ui/react';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const DateInput = forwardRef(({ value, onClick }, ref) => (
  <InputGroup size="lg" width="100%">
    <Input
      ref={ref}
      onClick={onClick}
      value={value || ''}
      readOnly
      cursor="pointer"
      bg="white"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="16px"
      height="64px"
      fontSize={{ base: "lg", md: "xl" }}
      fontWeight="medium"
      px={5}
      _hover={{ borderColor: "blue.300" }}
      _focusVisible={{
        borderColor: "blue.400",
        boxShadow: "0 0 0 1px #4299E1",
      }}
    />
    <InputRightElement width="56px" height="64px" pointerEvents="none">
      <Box as="img" src="/images/calendar.svg" alt="Calendar Icon" width="24px" height="24px" />
    </InputRightElement>
  </InputGroup>
));

DateInput.displayName = "DateInput";

const DatePickerComponent = ({ value, onChange }) => {
  return (
    <Box mt={3} width="100%">
      <DatePicker
        minDate={new Date()}
        selected={value}
        onChange={onChange}
        dateFormat="M/d/yyyy"
        popperPlacement="bottom-start"
        customInput={<DateInput />}
      />
    </Box>
  );
};

DatePickerComponent.propTypes = {
  value: PropTypes.instanceOf(Date),
  onChange: PropTypes.func.isRequired, 
};

export default DatePickerComponent;
