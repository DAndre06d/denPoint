import { Box, Button, Text, Select, Input, Spinner, useToast, VStack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import DatePickerComponent from '../DatePickerComponent.jsx';
import { SERVICES } from '../../utils/constants.js';
import TimePickerComponent from '../TimePickerConponent.jsx';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { formatDateForDB } from '../../utils/textUtils.js';

const BookingForm = ({ mode, initialDate, initialService, initialDoctor, initialTime, initialConcern,appointId, toggleModal, onSuccess }) => {
    const { userId, } = useSelector((state) => state.auth);
    const [selectedDate, setSelectedDate] = useState(initialDate || new Date());
    const [selectedService, setSelectedService] = useState(initialService || '');
    const [selectedDoctor, setSelectedDoctor] = useState(initialDoctor || '');
    const [selectedTime, setSelectedTime] = useState(initialTime || '');
    const [concern, setConcern] = useState(initialConcern || '');
    const [docotorList, setDoctorList] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()

    useEffect(() => {
        setSelectedDate(initialDate ? initialDate : new Date());
        setSelectedService(initialService);
        setSelectedDoctor(initialDoctor);
        setSelectedTime(initialTime);
        setConcern(initialConcern);
    }, [initialDate, initialService, initialDoctor, initialTime, initialConcern]);
    useEffect(()=>{
        if(selectedService){
            setIsLoading(true)
            const fetchData=async()=>{
                try{
                    const res = await axios.get(`${import.meta.env.VITE_API_URL}/dentist/getDentists?specialty=${selectedService}`,{withCredentials: true})
                    setDoctorList(res.data)
                    setIsLoading(false)
                }catch(e){
                    setIsLoading(false)
                    return toast({
                        title: "Error",
                        description: e.response.data.message,
                        status: "error",
                        duration: 5000,
                        isClosable: true,
                    })
                }
                
            }
            fetchData()
        }
    },[selectedService, toast])
    const handleDateChange = (date) => {
        setSelectedDate(date);
        setSelectedDoctor('');
        setSelectedService("")
        setSelectedTime("")
    };

    const handleServiceChange = (e) => {
        setSelectedService(e.target.value);
        setSelectedDoctor('');
    };

    const handleDoctorChange = (e) => {
        setSelectedDoctor(e.target.value);
    };

    const handleTimeChange = (time) => {
        setSelectedTime(time);
    };

    const handleConcernChange = (e) => {
        setConcern(e.target.value);
    };
    const handleSubmit = async () => {
        if (!selectedDate || !selectedDoctor || !selectedService || !concern || !selectedTime) {
            return toast({
                title: "Error",
                position: "top-right",
                description: "Please enter all required fields",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        }
        
        setIsLoading(true)
        
        // Define endpoint mapping
        const endpointMap = {
            create: `${import.meta.env.VITE_API_URL}/book/createAppointment`,
            update: `${import.meta.env.VITE_API_URL}/book/updateAppointment`
        };
        
        // Determine the API endpoint based on the mode
        const apiEndpoint = endpointMap[mode];
    
        // Construct the request body based on the mode
        const requestBody = {
            userId: userId,
            denID: selectedDoctor,
            date: formatDateForDB(selectedDate),
            time: `${selectedTime.start}-${selectedTime.end}`,
            concern: concern,
            typeOfService: selectedService,
            ...(mode === 'update' && { appointId: appointId }) // Add appointId if mode is update
        };
    
        // Remove status field if mode is update
        if (mode === 'update') {
            delete requestBody.status;
        } else {
            requestBody.status = "scheduled";
        }
    
        try {
            const resSubmit = await axios.post(apiEndpoint, requestBody, { withCredentials: true })
            if (onSuccess) {
                await onSuccess();
            }
            
            toast({
                title: "Success",
                position: "top-right",
                description: resSubmit.data.message,
                status: "success",
                duration: 5000,
                isClosable: true,
            })
        } catch (e) {
            toast({
                title: "Error",
                position: "top-right",
                description: e.response.data.message || "An unknown error occurred",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
        } finally {
            setConcern("")
            setDoctorList([])
            setSelectedDate("")
            setSelectedTime("")
            setSelectedDoctor("")
            setIsLoading(false);
            if(mode === "update"){
                toggleModal()
            }
        }
    };;
    return (
        <Box
            width="100%"
            maxW="720px"
            bg="white"
            borderWidth="1px"
            borderColor="gray.100"
            borderRadius="28px"
            boxShadow="0 24px 60px rgba(15, 23, 42, 0.08)"
            fontFamily={"Poppins"}
            px={{ base: 5, md: 10 }}
            py={{ base: 6, md: 10 }}
            mb={10}
        >
            <VStack spacing={{ base: 6, md: 8 }} align="stretch">
                <Box>
                    <Text as={"b"} fontSize={{ base: "lg", md: "xl" }}>Select A Date</Text>
                    <DatePickerComponent onChange={handleDateChange} value={selectedDate} />
                </Box>
                <Box>
                    <Text as={"b"} fontSize={{ base: "lg", md: "xl" }}>Type of service</Text>
                    <Select
                        placeholder={"Select Service"}
                        mt={3}
                        size="lg"
                        height="64px"
                        borderRadius="16px"
                        borderColor="gray.200"
                        value={selectedService}
                        onChange={handleServiceChange}
                    >
                        {SERVICES.map((service) => (
                            <option key={service.name} value={service.value}>{service.name}</option>
                        ))}
                    </Select>
                </Box>
                <Box>
                    <Text as={"b"} fontSize={{ base: "lg", md: "xl" }}>Select a Doctor</Text>
                    {isLoading ? <Box mt={3}><Spinner /> </Box> : <Select
                        placeholder={"Select Doctor"}
                        mt={3}
                        size="lg"
                        height="64px"
                        borderRadius="16px"
                        borderColor="gray.200"
                        value={selectedDoctor}
                        onChange={handleDoctorChange}
                        isDisabled={!selectedService || isLoading}
                    >
                        {docotorList.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>{doctor.full_name}</option>
                        ))}
                    </Select>}
                </Box>
                <Box>
                    <Text as={"b"} fontSize={{ base: "lg", md: "xl" }}>Select a Time Slot</Text>
                    {!selectedDoctor || !selectedService ? (
                        <Text mt={3} color="gray.600">Please select a doctor first.</Text>
                    ) : (
                        <TimePickerComponent onChange={handleTimeChange} value={selectedTime} denId={selectedDoctor} selectedDate={selectedDate} />
                    )}
                </Box>
                <Box>
                    <Text as={"b"} fontSize={{ base: "lg", md: "xl" }}>Concern</Text>
                    <Input
                        mt={3}
                        height="64px"
                        borderRadius="16px"
                        borderColor="gray.200"
                        value={concern}
                        onChange={handleConcernChange}
                    />
                </Box>
                <Box display={"flex"} justifyContent={{ base: "stretch", md: "flex-end" }} width={"100%"} pt={2}>
                    <Button
                        width={{ base: "100%", md: "220px" }}
                        height="60px"
                        borderRadius="18px"
                        onClick={handleSubmit}
                        colorScheme="blue"
                        isDisabled={isLoading}
                    >
                        {isLoading ? <Spinner /> : "Submit"}
                    </Button>
                </Box>  
            </VStack>
        </Box>
    );
};

BookingForm.propTypes = {
    mode: PropTypes.string.isRequired,
    initialDate: PropTypes.instanceOf(Date),
    initialService: PropTypes.string,
    initialDoctor: PropTypes.string,
    initialTime: PropTypes.string,
    initialConcern: PropTypes.string,
    toggleModal: PropTypes.func,
    onSuccess: PropTypes.func,
};

export default BookingForm;
