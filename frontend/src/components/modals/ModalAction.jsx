import { useState } from 'react';
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
    useToast,
    Box,
    Text
} from '@chakra-ui/react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import BookingForm from '../BookingForms/BookingForm.jsx';
import { formatDate } from '../../utils/textUtils.js';

const ModalAction = ({ modalState, appointment, mode }) => {
    const toast = useToast();
    const { userId,} = useSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const handleCancelAppointment = async () => {
      setLoading(true);
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/book/deleteAppointment`,{
              userId: userId,
              appointId: appointment.id
            },{withCredentials: true})
            console.log(response.data)
            toast({
                title: "Success",
                position: "top-right",
                description: response.data.message,
                status: "success",
                duration: 5000,
                isClosable: true
            });

        } catch (e) {
            toast({
              title: "Error",
              description: e.response?.data?.message || "An error occurred",
              status: "error",
              duration: 5000,
              isClosable: true
            });
        }finally{
          modalState.toggle()
          setLoading(false);
        }
    };

    return (
        <Modal isOpen={modalState.isOpen} onClose={modalState.toggle}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>{mode === 'update' ? 'Update Appointment' : 'Cancel Appointment'}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    {mode === 'update' ? (
                        <BookingForm
                            mode={mode}
                            initialDate={new Date(appointment.appointment_date)}
                            initialService={appointment.typeOfService}
                            initialTime={appointment.time}
                            initialConcern={appointment.concern}
                            appointId={appointment.id}
                            toggleModal={modalState.toggle}
                        />
                    ): <Box>
                      <Text as={"b"}>Are you sure you want to cancel this?</Text>
                      <Text mt={2}>Date: {formatDate(appointment.appointment_date)}</Text>
                      <Text  mt={2}>Type of Service: {appointment.typeOfService}</Text>
                      <Text  mt={2}>Time: {appointment.time}</Text>
                      <Text  mt={2}>Concern: {appointment.concern}</Text>

                    </Box>}
                </ModalBody>
                {mode ==="cancel" && <ModalFooter>
                    <Button variant='ghost'  mr={3} onClick={modalState.toggle}>
                        Close
                    </Button>
                    <Button colorScheme='red'  onClick={handleCancelAppointment} isDisabled={loading}> 
                        {mode === 'update' ? 'Update' : 'Confirm'}
                    </Button>
                </ModalFooter>}
            </ModalContent>
        </Modal>
    );
};

ModalAction.propTypes = {
    modalState: PropTypes.shape({
        isOpen: PropTypes.bool.isRequired,
        toggle: PropTypes.func.isRequired
    }).isRequired,
    appointment: PropTypes.shape({
        id: PropTypes.number.isRequired,
        user_id: PropTypes.number.isRequired,
        dentist_id: PropTypes.number.isRequired,
        appointment_date: PropTypes.string.isRequired,
        status: PropTypes.string.isRequired,
        concern: PropTypes.string.isRequired,
        time: PropTypes.string.isRequired,
        typeOfService: PropTypes.string.isRequired,
        dentist_name: PropTypes.string.isRequired,
        created_at: PropTypes.string.isRequired,
        updated_at: PropTypes.string.isRequired
    }),
    mode: PropTypes.string.isRequired
};

export default ModalAction;