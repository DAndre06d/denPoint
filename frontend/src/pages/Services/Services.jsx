import Navbar from "../../components/Navbar/Navbar.jsx"
import Footer from "../../components/footer/Footer.jsx"
import { Box, Text } from "@chakra-ui/react"
import ServicesImages from "./servicesImages.jsx"

const Services = () => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" bg="#f8fbff">
        <Navbar />
        <Box
          flex="1"
          width={"100%"}
          bg="linear-gradient(180deg, #f8fbff 0%, #eef6ff 100%)"
          px={{ base: 5, md: 8, lg: 12 }}
          py={{ base: 8, md: 12, lg: 16 }}
        >
            <Box maxW="1180px" mx="auto" fontFamily={"Poppins"}>
                <Text
                  color={"#0a4979"}
                  fontSize={{ base: "sm", md: "md" }}
                  fontWeight="700"
                  letterSpacing="0.12em"
                  textTransform="uppercase"
                  textAlign={"center"}
                >
                  Services
                </Text>
                <Text
                  mt={4}
                  color={"gray.800"}
                  fontSize={{ base: "3xl", md: "5xl" }}
                  fontWeight="800"
                  textAlign={"center"}
                  lineHeight="1.05"
                >
                  Complete dental care with thoughtful, modern treatment options.
                </Text>
                <Text
                  mt={5}
                  color={"gray.600"}
                  textAlign={"center"}
                  maxW="760px"
                  mx="auto"
                  fontSize={{ base: "lg", md: "xl" }}
                  lineHeight="1.8"
                >
                  Den.Point offers preventive, restorative, surgical, and aesthetic services designed
                  around individualized treatment planning and a smoother patient experience.
                </Text>
                <ServicesImages />
            </Box>
        </Box>
        <Footer />
    </Box>
  )
}

export default Services
