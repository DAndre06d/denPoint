import { Box,Text } from "@chakra-ui/react"
import Navbar from "../components/Navbar/Navbar"
import Hero from "../components/Hero/Hero"
import ImgCarousel from "../components/imgCarousel/imgCarousel"
import ImagesWTitle from "../components/ImagesWTitle"
import Footer from "../components/footer/Footer"


import Services from "../components/Services/Services"
const Homepage = () => {
  return (
    <>
      <Box width={"100vw"}>
        <Navbar />
      </Box>
      <Box>
        <Hero />
        <Box mt={10} display={"flex"} justifyContent={"center"} alignItems={"center"} flexDirection={"column"}>
            <Text as="b" fontSize="5xl" fontFamily="Poppins" color="blue.500" textAlign={"center"}>Welcome to Den.Point</Text>
            <Text mt={5} width={"60%"} textAlign={"center"}>Den.Point: Your Destination for Implant and General Dentistry delivers exceptional dental care tailored to each individual's needs. From dental implants and veneers to clear aligners, in-office teeth whitening, and porcelain crowns, we ensure a personalized treatment
            plan that suits you perfectly. Utilizing cutting-edge technology, Den.Point aims for optimal results that enhance both function and aesthetics for every patient.</Text>
        </Box>
        <Box mt={20} width={"100%"}>
          <ImgCarousel />
        </Box>
        <Services />
        <Footer />
      </Box>
    </>  
  )
}

export default Homepage