import { Box, Button, Text, Select, Input, Spinner, useToast } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import DatePickerComponent from '../DatePickerComponent';
import { SERVICES } from '../../utils/constants';
import TimePickerComponent from '../TimePickerConponent';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { formatDateForDB } from '../../utils/textUtils';

const BookingForm = ({ mode, initialDate, initialService, initialDoctor, initialTime, initialConcern,appointId, toggleModal }) => {
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
        console.log(selectedTime, selectedDoctor, selectedService, concern, selectedTime)
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
        <Box display={"flex"} flexDirection={"column"} justifyContent={"center"} alignItems={"center"} fontFamily={"Poppins"}>
            <Box>
                <Box>
                    <Text as={"b"} mb={5}>Select A Date:</Text>
                    <DatePickerComponent onChange={handleDateChange} value={selectedDate} />
                </Box>
                <Box mt={10}>
                    <Text as={"b"} mb={5}>Type of service:</Text>
                    <Select placeholder={"Select Service"} mt={2} value={selectedService} onChange={handleServiceChange}>
                        {SERVICES.map((service) => (
                            <option key={service.name} value={service.value}>{service.name}</option>
                        ))}
                    </Select>
                </Box>
            </Box>
            <Box>
                <Box mt={5}>
                    <Text as={"b"} mb={5}>Select a Doctor</Text>
                    {isLoading ? <Box><Spinner /> </Box> : <Select placeholder={"Select Doctor"} mt={2} value={selectedDoctor} onChange={handleDoctorChange} isDisabled={!selectedService || isLoading}>
                        {docotorList.map((doctor) => (
                            <option key={doctor.id} value={doctor.id}>{doctor.full_name}</option>
                        ))}
                    </Select>}
                </Box>
                <Box mt={5}>
                    <Text as={"b"} mb={5}>Select a Time Slot:</Text>
                    {!selectedDoctor || !selectedService ? <Text> Please select a doctor first.</Text> :<TimePickerComponent onChange={handleTimeChange} value={selectedTime} denId={selectedDoctor} selectedDate={selectedDate} />}
                </Box>
                <Box mt={5}>
                    <Text as={"b"} mb={5}>Concern:</Text>
                    <Input value={concern} onChange={handleConcernChange} />
                </Box>
                <Box display={"flex"} justifyContent={"flex-end"} width={"100%"} my={5}>
                    <Button onClick={handleSubmit} colorScheme="blue" isDisabled={isLoading}>{isLoading ? <Spinner /> : "Submit"}</Button>
                </Box>  
            </Box>

                
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
};

export default BookingForm;