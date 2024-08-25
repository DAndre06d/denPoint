import { Box, Text,Button } from "@chakra-ui/react";

const Hero = () => {
  return (
    <Box
      height="70vh"
      backgroundImage="/images/dentalOffice.jpg"  // Replace with your image URL
      backgroundSize="cover"
      backgroundPosition="center"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
      textAlign="center"
      padding="4"
    >
      <Box
      width={"50%"}
      >
        <Text fontSize={{base:"lg",lg:"3xl"}} fontWeight="bold" fontFamily="Poppins">
          The Center for Implant & General Dentistry is dedicated to offering patients the latest advancements in dental treatments.
        </Text>
        <Button colorScheme="blue" mt={10}>Book Now</Button>
      </Box>
    </Box>
  );
};

export default Hero;    