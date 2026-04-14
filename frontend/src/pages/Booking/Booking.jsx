import Navbar from "../../components/Navbar/Navbar.jsx"
import Footer from "../../components/footer/Footer.jsx"
import BookingForm from "../../components/BookingForms/BookingForm.jsx"
import { Box, Text } from "@chakra-ui/react"

const Booking = () => {
  return (
    <Box bg="linear-gradient(180deg, #f8fbff 0%, #ffffff 35%)">
      <Navbar />
      <Box
        maxW="1200px"
        mx="auto"
        display={"grid"}
        gridTemplateColumns={{ base: "1fr", lg: "360px 1fr" }}
        gap={{ base: 8, lg: 14 }}
        alignItems="center"
        justifyContent="center"
        minH={{ base: "auto", lg: "calc(100vh - 180px)" }}
        my={{ base: 6, md: 10 }}
        px={{ base: 4, md: 6, lg: 8 }}
        fontFamily={"Poppins"}
      >
        <Box
          display="flex"
          flexDirection="column"
          alignItems={{ base: "center", lg: "flex-start" }}
          textAlign={{ base: "center", lg: "left" }}
          gap={5}
          justifyContent="center"
        >
          <Text as={"b"} fontSize={{ base: "2xl", md: "4xl" }} lineHeight="1.05">
            Book Your Dental Appointment!
          </Text>
          <Text color="gray.600" fontSize={{ base: "md", md: "lg" }} maxW="320px">
            Choose your preferred date, service, doctor, and time slot in one place.
          </Text>
          <Box
            width="100%"
            bg="#0a4979"
            color="white"
            borderRadius="24px"
            px={6}
            py={5}
          >
            <Text fontSize="sm" textTransform="uppercase" letterSpacing="0.08em" opacity={0.75}>
              Booking Flow
            </Text>
            <Text mt={2}>1. Pick a date</Text>
            <Text mt={1}>2. Choose a service and doctor</Text>
            <Text mt={1}>3. Select an available time</Text>
          </Box>
        </Box>
        <BookingForm mode={"create"}/>
      </Box>
      <Footer />
    </Box>
  )
}

export default Booking
