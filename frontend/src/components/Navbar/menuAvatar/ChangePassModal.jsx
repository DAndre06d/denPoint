import React, {useState} from 'react';
import PropTypes from 'prop-types';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Box,
  Text,
  Input,
  useToast,
  Spinner
} from '@chakra-ui/react';
import useInput from '../../../hooks/useInput'; 
import axios from 'axios';

// Reusable PasswordField Component
const PasswordField = ({ name, label, value, onChange, onBlur, hasError }) => (
  <Box mb={4}>
    <Text mb={1}>{label}</Text>
    <Input
      name={name}
      type="password"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      isInvalid={hasError}
    />
    {hasError && <Text color="red.500">This field is required.</Text>}
  </Box>
);

PasswordField.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  hasError: PropTypes.bool.isRequired,
};

const ChangePassModal = ({ modalState }) => {
  const validateNotEmpty = (value) => value.trim() !== '';
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false)

  const {
    value: oldPassword,
    inputChangeHandler: handleOldPasswordChange,
    blurHandler: handleOldPasswordBlur,
    hasError: oldPasswordHasError
  } = useInput(validateNotEmpty);

  const {
    value: newPassword,
    inputChangeHandler: handleNewPasswordChange,
    blurHandler: handleNewPasswordBlur,
    hasError: newPasswordHasError
  } = useInput(validateNotEmpty);

  const {
    value: confirmPassword,
    inputChangeHandler: handleConfirmPasswordChange,
    blurHandler: handleConfirmPasswordBlur,
    hasError: confirmPasswordHasError
  } = useInput(validateNotEmpty);

  const handleSubmit = async () => {
    if (confirmPassword !== newPassword) {
      toast({
        title: 'Passwords do not match',
        description: 'Please confirm your new password correctly.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    setIsLoading(true)
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/maintenance/changePassword`, {
        oldPassword: oldPassword,
        newPassword: newPassword
      }, { withCredentials: true });
      toast({
        title: 'Password Changed',
        description: 'Your password has been successfully changed.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (e) {
      toast({
        title: 'Error',
        description: e.response?.data?.message || 'An unexpected error occurred.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      modalState.toggle();
      setIsLoading(false)
    }
  };

  return (
    <Modal isOpen={modalState.isOpen} onClose={modalState.toggle}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Change Password</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <PasswordField
            name="oldPassword"
            label="Old Password:"
            value={oldPassword}
            onChange={handleOldPasswordChange}
            onBlur={handleOldPasswordBlur}
            hasError={oldPasswordHasError}
          />
          <PasswordField
            name="newPassword"
            label="New Password:"
            value={newPassword}
            onChange={handleNewPasswordChange}
            onBlur={handleNewPasswordBlur}
            hasError={newPasswordHasError}
          />
          <PasswordField
            name="confirmPassword"
            label="Confirm Password:"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            onBlur={handleConfirmPasswordBlur}
            hasError={confirmPasswordHasError}
          />
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" mr={3} onClick={modalState.toggle}>
            Close
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleSubmit}
            isDisabled={oldPasswordHasError || newPasswordHasError || confirmPasswordHasError || isLoading}
          >
            {isLoading ? <Spinner /> : "Submit"}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

ChangePassModal.propTypes = {
  modalState: PropTypes.shape({
    isOpen: PropTypes.bool.isRequired,
    toggle: PropTypes.func.isRequired
  }).isRequired
};

export default ChangePassModal;