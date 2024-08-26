import { Box, Button, Spinner } from '@chakra-ui/react';
import InputField from '../Forms/InputField.jsx';
import useInput from '../../hooks/useInput.js';
import PropTypes from 'prop-types';

const SignUpForm = ({ onSubmit, isLoading }) => {
  const {
    value: firstName,
    inputChangeHandler: firstNameChangeHandler,
    blurHandler: firstNameBlurHandler,
    hasError: firstNameHasError,
    isValueValid: isFirstNameValid,
  } = useInput((value) => value.trim().length > 0);

  const {
    value: lastName,
    inputChangeHandler: lastNameChangeHandler,
    blurHandler: lastNameBlurHandler,
    hasError: lastNameHasError,
    isValueValid: isLastNameValid,
  } = useInput((value) => value.trim().length > 0);
  const {
    value: email,
    inputChangeHandler: emailChangeHandler,
    blurHandler: emailBlurHandler,
    hasError: emailHasError,
    isValueValid: isEmailValid,
  } = useInput((value) => /\S+@\S+\.\S+/.test(value.trim())); // Basic email validation

  const {
    value: password,
    inputChangeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
    hasError: passwordHasError,
    isValueValid: isPasswordValid,
  } = useInput((value) => value.trim().length > 0);

  const {
    value: phoneNumber,
    inputChangeHandler: phoneNumberChangeHandler,
    blurHandler: phoneNumberBlurHandler,
    hasError: phoneNumberHasError,
    isValueValid: isPhoneNumberValid,
  } = useInput((value) => value.trim().length > 0);

  const isFormValid = 
    isFirstNameValid &&
    isLastNameValid &&
    isEmailValid &&
    isPasswordValid &&
    isPhoneNumberValid;

  return (
    <Box maxW="md" mx="auto">
      <InputField
        label="First Name:"
        type="text"
        value={firstName}
        onChange={firstNameChangeHandler}
        onBlur={firstNameBlurHandler}
        hasError={firstNameHasError}
      />
      <Box mt={4}>
        <InputField
          label="Last Name:"
          type="text"
          value={lastName}
          onChange={lastNameChangeHandler}
          onBlur={lastNameBlurHandler}
          hasError={lastNameHasError}
        />
      </Box>
      <Box mt={4}>
        <InputField
          label="Phone Number:"
          type="text"
          value={phoneNumber}
          onChange={phoneNumberChangeHandler}
          onBlur={phoneNumberBlurHandler}
          hasError={phoneNumberHasError}
        />
      </Box>
      <Box mt={4}>
        <InputField
          label="Email:"
          type="email"
          value={email}
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          hasError={emailHasError}
        />
      </Box>
      <Box mt={4}>
        <InputField
          label="Password:"
          type="password"
          value={password}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          hasError={passwordHasError}
        />
      </Box>

      <Box mt={6} display="flex" justifyContent="flex-end">
        <Button
          colorScheme="blue"
          width="100%"
          borderRadius="20px"
          isDisabled={!isFormValid || isLoading}
          onClick={() => onSubmit({ firstName, lastName, email, password, phoneNumber })}
        >
          {isLoading ?<Spinner /> :"Sign Up"}
        </Button>
      </Box>
    </Box>
  );
};

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default SignUpForm;
