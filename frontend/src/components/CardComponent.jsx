import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, CardFooter, Text, Button, VStack, HStack } from '@chakra-ui/react'; 
import { formatDate } from '../utils/textUtils.js';
import ModalAction from "./modals/ModalAction.jsx";

const CardComponent = ({ appointment,trigger }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: null,
  });
  console.log(appointment)
  // Handler to open the modal with the specified mode
  const openModal = (mode) => {
    setModalState({
      isOpen: true,
      mode: mode,
    });
  };

  // Handler to close the modal
  const closeModal = () => {
    trigger
    setModalState({
      isOpen: false,
      mode: null,
    });
    
  };

  return (
    <>
      <Card p={2} borderWidth={1} borderRadius="md" boxShadow="md" maxWidth="200px" minWidth="200px" m={2}>
        <CardHeader>
          <Text fontSize="xs" fontWeight="bold">Appointment Details</Text>
        </CardHeader>
        <CardBody>
          <VStack spacing={2} align="start">
            <Text fontSize="xs"><strong>Date and Time:</strong> {formatDate(appointment.appointment_date)}, {appointment.time}</Text>
            <Text fontSize="xs"><strong>Concern:</strong> {appointment.concern}</Text>
            <Text fontSize="xs"><strong>Service:</strong> {appointment.typeOfService}</Text>
            <Text fontSize="xs"><strong>Doctor:</strong> {appointment.dentist_name}</Text>
          </VStack>
        </CardBody>
        <CardFooter>
          <HStack spacing={2}>
            <Button colorScheme="blue" variant="solid" size="xs" onClick={() => openModal('update')}>Update</Button>
            <Button colorScheme="red" variant="outline" size="xs" onClick={() => openModal('cancel')}>Cancel</Button>
          </HStack>
        </CardFooter>
      </Card>

      <ModalAction 
        modalState={{isOpen: modalState.isOpen, toggle: closeModal}}
        mode={modalState.mode} 
        appointment={appointment} // Optional: pass additional props if needed
      />
    </>
  );
};

CardComponent.propTypes = {
  appointment: PropTypes.shape({
    appointment_date: PropTypes.string.isRequired,
    concern: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    dentist_id: PropTypes.number.isRequired,
    dentist_name: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    typeOfService: PropTypes.string.isRequired,
    updated_at: PropTypes.string.isRequired,
    user_id: PropTypes.number.isRequired,
  }).isRequired,
};

export default CardComponent;