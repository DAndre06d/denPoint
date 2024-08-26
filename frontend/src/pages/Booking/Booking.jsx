import Navbar from "../../components/Navbar/Navbar.jsx"
import Footer from "../../components/footer/Footer.jsx"
import BookingForm from "../../components/BookingForms/BookingForm.jsx"
import { Box, Text } from "@chakra-ui/react"
import Logo from "../../components/Logo.jsx"

const Booking = () => {
  return (
    <Box>
      <Navbar />
      <Box display={"flex"} justifyContent={"center"}  my={10} fontFamily={"Poppins"}>
            <Box display={"flex"}>
                <Logo size={{width:100, height:100}} />
                <Box display={"flex"}alignItems={"center"} ml={10}>
                    <Text as={"b"}>Book Your Dental Appointment!</Text>
                </Box>
            </Box>
        </Box>
      <BookingForm mode={"create"}/>
      <Footer />
    </Box>
  )
}

export default Booking