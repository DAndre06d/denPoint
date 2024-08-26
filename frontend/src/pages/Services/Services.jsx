import Navbar from "../../components/Navbar/Navbar.jsx"
import Footer from "../../components/footer/Footer.jsx"
import { Box, Text } from "@chakra-ui/react"
import ServicesImages from "./servicesImages.jsx"

const Services = () => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
        <Navbar />
        <Box backgroundColor={"#0a4979"}
        flex="1"
        width={"100%"}
        justifyContent={"center"}
        alignItems={"center"}
        p={{base: 10, lg: 20}} >
            <Box fontFamily={"Poppins"}>
                <Text color={"white"} fontSize={"5xl"} textAlign={"center"} > What We Offer</Text>
                <Text color={"white"} textAlign={"center"}> Here at Den.Point we offer the best procedures and individualized treatment plans for you.</Text>
            </Box>
              <ServicesImages />

        </Box>
        <Footer />
    </Box>
  )
}

export default Services