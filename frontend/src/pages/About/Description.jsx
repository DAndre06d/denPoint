import { Box, Text, useMediaQuery } from "@chakra-ui/react"

const Description = () => {
    const [isSmallerThanMd] = useMediaQuery("(max-width: 48em)");
  return (
    <Box 
        ml={isSmallerThanMd ? 0 : 20} 
        mt={isSmallerThanMd ? 10 : 0} 
        width={isSmallerThanMd ? "90%" : "50%"} 
        fontFamily="Poppins" 
        textAlign="center"
        color="white"
        p={5} 
        bg="rgba(0, 0, 0, 0.6)" 
        borderRadius="md"
        boxShadow="lg"
        >
        <Text fontSize="xl" fontWeight="bold" mb={4}>
            Den.Point: A New Era in Dental Care
        </Text>
        
        <Text mb={4}>
            Den.point is an innovative startup in dental implant and general dentistry. With expertise gained from advanced education in implant dentistry, Den.point is dedicated to offering cutting-edge, patient-centered treatment plans.
        </Text>
        
        <Text mb={4}>
            The startup’s involvement in various professional dental organizations and its commitment to continuous learning and innovation position it at the forefront of the dental industry.
        </Text>
        
        <Text>
            Den.point focuses on delivering top-notch care that enhances both function and aesthetics. By providing personalized treatment plans tailored to individual needs, Den.point is committed to setting new standards in dentistry, ensuring that every patient receives the highest quality care for their best possible smile.
        </Text>
    </Box>
  )
}

export default Description