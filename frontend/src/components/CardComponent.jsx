import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Card, CardHeader, CardBody, CardFooter, Text, Button, VStack, HStack, Badge, Box } from '@chakra-ui/react'; 
import { formatDate } from '../utils/textUtils.js';
import ModalAction from "./modals/ModalAction.jsx";

const CardComponent = ({ appointment,trigger }) => {
  const [modalState, setModalState] = useState({
    isOpen: false,
    mode: null,
  });
  // Handler to open the modal with the specified mode
  const openModal = (mode) => {
    setModalState({
      isOpen: true,
      mode: mode,
    });
  };

  // Handler to close the modal
  const closeModal = () => {
    setModalState({
      isOpen: false,
      mode: null,
    });
  };

  return (
    <>
      <Card
        p={0}
        borderWidth="1px"
        borderColor="blue.50"
        borderRadius="24px"
        boxShadow="0 18px 42px rgba(15, 23, 42, 0.06)"
        width="100%"
        maxWidth={{ base: "100%", md: "320px" }}
        minWidth={0}
        m={0}
        overflow="hidden"
        bg="white"
      >
        <CardHeader bg="linear-gradient(135deg, #0a4979 0%, #1a78b5 100%)" py={5} px={5}>
          <HStack justifyContent="space-between" alignItems="start">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="whiteAlpha.800" textTransform="uppercase" letterSpacing="0.08em">
                Appointment
              </Text>
              <Text mt={1} fontSize="lg" fontWeight="bold" color="white">
                {appointment.dentist_name}
              </Text>
            </Box>
            <Badge colorScheme={appointment.status === "scheduled" ? "green" : "gray"} borderRadius="full" px={3} py={1}>
              {appointment.status}
            </Badge>
          </HStack>
        </CardHeader>
        <CardBody px={5} py={5}>
          <VStack spacing={4} align="start">
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase" letterSpacing="0.08em">
                Date and Time
              </Text>
              <Text mt={1} fontSize="sm" color="gray.800">
                {formatDate(appointment.appointment_date)}, {appointment.time}
              </Text>
            </Box>
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase" letterSpacing="0.08em">
                Service
              </Text>
              <Text mt={1} fontSize="sm" color="gray.800">{appointment.typeOfService}</Text>
            </Box>
            <Box>
              <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase" letterSpacing="0.08em">
                Concern
              </Text>
              <Text mt={1} fontSize="sm" color="gray.700">{appointment.concern}</Text>
            </Box>
          </VStack>
        </CardBody>
        <CardFooter px={5} pb={5} pt={0}>
          <HStack spacing={3} width="100%">
            <Button colorScheme="blue" variant="solid" size="sm" flex="1" onClick={() => openModal('update')}>Update</Button>
            <Button colorScheme="red" variant="outline" size="sm" flex="1" onClick={() => openModal('cancel')}>Cancel</Button>
          </HStack>
        </CardFooter>
      </Card>

      <ModalAction 
        modalState={{isOpen: modalState.isOpen, toggle: closeModal}}
        mode={modalState.mode} 
        appointment={appointment} // Optional: pass additional props if needed
        onAppointmentChange={trigger}
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
  trigger: PropTypes.func.isRequired,
};

export default CardComponent;
