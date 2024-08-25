import { Box, Button, Text, Spinner } from '@chakra-ui/react';
import InputField from '../forms/InputField.jsx';
import useInput from '../../hooks/useInput.js';
import PropTypes from 'prop-types';

const SignInForm = ({ onSubmit, isLoading }) => {
  const {
    value: userName,
    inputChangeHandler: userNameChangeHandler,
    blurHandler: userNameBlurHandler,
    hasError: userNameHasError,
    isValueValid: isUserNameValid,
  } = useInput((value) => value.trim().length > 0);

  const {
    value: password,
    inputChangeHandler: passwordChangeHandler,
    blurHandler: passwordBlurHandler,
    hasError: passwordHasError,
    isValueValid: isPasswordValid,
  } = useInput((value) => value.trim().length > 0);

  const isFormValid = isUserNameValid && isPasswordValid;

  return (
    <Box p={4} maxW="md" mx="auto">
      <InputField
        label="Email:"
        type="text"
        value={userName}
        onChange={userNameChangeHandler}
        onBlur={userNameBlurHandler}
        hasError={userNameHasError}
      />
      <Box mt={4}> {/* Add spacing between InputFields */}
        <InputField
          label="Password:"
          type="password"
          value={password}
          onChange={passwordChangeHandler}
          onBlur={passwordBlurHandler}
          hasError={passwordHasError}
        />
      </Box>
      <Box mt={5} display="flex" justifyContent="flex-end">
        <Text textDecoration="underline">Forgot password?</Text>
      </Box>
      <Box mt={10} display="flex" justifyContent="flex-end">
        <Button
          colorScheme="blue"
          width="100%"
          borderRadius="20px"
          isDisabled={!isFormValid || isLoading}
          onClick={() => onSubmit(userName, password)}
        >
          {isLoading ? <Spinner /> : "Log in"}
        </Button>
      </Box>
    </Box>
  );
};

SignInForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default SignInForm;