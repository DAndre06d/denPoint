import { Box, Button, Grid, HStack, Text, VStack } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar.jsx";
import ImgCarousel from "../components/imgCarousel/imgCarousel.jsx";
import Footer from "../components/footer/Footer.jsx";
import generalDentistryImg from "../assets/images/Icons/General+Dentistry.png";
import perioImg from "../assets/images/Icons/Periodontics.png";
import surgeryImg from "../assets/images/Icons/Oral+Surgery+and+Implant+Dentistry.png";
import orthoImg from "../assets/images/Icons/Artboard-3.png";

const featuredServices = [
  {
    title: "General Dentistry",
    description: "Preventive and everyday dental care built around long-term oral health.",
    icon: generalDentistryImg,
  },
  {
    title: "Periodontics",
    description: "Focused gum care that supports healthier foundations for your smile.",
    icon: perioImg,
  },
  {
    title: "Implant and Surgical Care",
    description: "Advanced treatment planning for restoration, comfort, and confidence.",
    icon: surgeryImg,
  },
  {
    title: "Clear Aligners",
    description: "Modern alignment solutions designed for a more balanced, confident smile.",
    icon: orthoImg,
  },
];

const Homepage = () => {
  return (
    <Box bg="#f8fbff">
      <Navbar />

      <Box bg="linear-gradient(180deg, #f8fbff 0%, #eef6ff 100%)">
        <Box
          maxW="1240px"
          mx="auto"
          px={{ base: 4, md: 6, lg: 8 }}
          pt={{ base: 8, md: 12 }}
          pb={{ base: 10, md: 16 }}
        >
          <Grid
            templateColumns={{ base: "1fr", lg: "1.05fr 0.95fr" }}
            gap={{ base: 10, lg: 14 }}
            alignItems="center"
          >
            <Box>
              <Text
                fontFamily="Poppins"
                fontSize={{ base: "sm", md: "md" }}
                fontWeight="700"
                letterSpacing="0.12em"
                textTransform="uppercase"
                color="#0a4979"
              >
                Implant and General Dentistry
              </Text>
              <Text
                mt={4}
                fontFamily="Poppins"
                fontSize={{ base: "4xl", md: "6xl" }}
                fontWeight="800"
                lineHeight="0.98"
                color="gray.800"
                maxW="740px"
              >
                Dental care that feels modern, personal, and easy to trust.
              </Text>
              <Text
                mt={5}
                maxW="640px"
                color="gray.600"
                fontSize={{ base: "lg", md: "xl" }}
                lineHeight="1.8"
              >
                Den.Point combines advanced treatment planning with a patient-first experience,
                helping you move from consultation to confident care with clarity and comfort.
              </Text>

              <HStack mt={8} spacing={4} flexWrap="wrap">
                <Button
                  as={RouterLink}
                  to="/book"
                  colorScheme="blue"
                  size="lg"
                  borderRadius="999px"
                  px={8}
                  boxShadow="0 14px 30px rgba(49, 130, 206, 0.25)"
                >
                  Book Appointment
                </Button>
                <Button
                  as={RouterLink}
                  to="/services"
                  variant="outline"
                  size="lg"
                  borderRadius="999px"
                  px={8}
                >
                  Explore Services
                </Button>
              </HStack>

              <Grid
                mt={10}
                templateColumns={{ base: "1fr", sm: "repeat(3, 1fr)" }}
                gap={4}
                maxW="760px"
              >
                {[
                  { label: "Patient-first care", value: "Modern" },
                  { label: "Treatment planning", value: "Personalized" },
                  { label: "Smile goals", value: "Functional + Aesthetic" },
                ].map((item) => (
                  <Box
                    key={item.label}
                    bg="white"
                    borderRadius="22px"
                    px={5}
                    py={5}
                    borderWidth="1px"
                    borderColor="blue.50"
                    boxShadow="0 14px 32px rgba(15, 23, 42, 0.05)"
                  >
                    <Text fontSize="2xl" fontWeight="800" color="gray.800">
                      {item.value}
                    </Text>
                    <Text mt={1} color="gray.500" fontSize="sm">
                      {item.label}
                    </Text>
                  </Box>
                ))}
              </Grid>
            </Box>

            <Box
              minH={{ base: "360px", md: "520px" }}
              borderRadius={{ base: "30px", md: "40px" }}
              overflow="hidden"
              position="relative"
              bgImage="linear-gradient(rgba(7, 26, 46, 0.28), rgba(7, 26, 46, 0.12)), url('/images/dentalOffice.jpg')"
              bgSize="cover"
              bgPosition="center"
              boxShadow="0 30px 70px rgba(10, 73, 121, 0.18)"
            >
              <Box
                position="absolute"
                inset="auto 0 0 0"
                p={{ base: 5, md: 7 }}
                color="white"
                bg="linear-gradient(180deg, rgba(10,73,121,0) 0%, rgba(10,73,121,0.72) 100%)"
              >
                <Text fontFamily="Poppins" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="800">
                  Precision, comfort, and care in every visit.
                </Text>
                <Text mt={2} maxW="520px" color="whiteAlpha.900">
                  From routine treatments to advanced restorative work, Den.Point is built to support healthier smiles with confidence.
                </Text>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Box>

      <Box px={{ base: 4, md: 6, lg: 8 }} py={{ base: 10, md: 14 }}>
        <Box maxW="1240px" mx="auto">
          <Box textAlign="center">
            <Text
              fontFamily="Poppins"
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="700"
              letterSpacing="0.12em"
              textTransform="uppercase"
              color="#0a4979"
            >
              Featured Services
            </Text>
            <Text
              mt={4}
              fontFamily="Poppins"
              fontSize={{ base: "3xl", md: "5xl" }}
              fontWeight="800"
              color="gray.800"
              lineHeight="1.05"
            >
              Care built around what your smile needs most.
            </Text>
          </Box>

          <Grid
            mt={{ base: 8, md: 10 }}
            templateColumns={{ base: "1fr", md: "repeat(2, 1fr)", xl: "repeat(4, 1fr)" }}
            gap={{ base: 5, md: 6 }}
          >
            {featuredServices.map((service) => (
              <Box
                key={service.title}
                bg="white"
                borderRadius="28px"
                px={6}
                py={7}
                borderWidth="1px"
                borderColor="blue.50"
                boxShadow="0 16px 38px rgba(15, 23, 42, 0.06)"
              >
                <Box
                  width="84px"
                  height="84px"
                  borderRadius="22px"
                  bg="linear-gradient(180deg, #eef6ff 0%, #f8fbff 100%)"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Box as="img" src={service.icon} alt={service.title} width="56px" height="56px" objectFit="contain" />
                </Box>
                <Text mt={6} fontFamily="Poppins" fontSize="2xl" fontWeight="700" color="gray.800">
                  {service.title}
                </Text>
                <Text mt={3} color="gray.600" lineHeight="1.8">
                  {service.description}
                </Text>
              </Box>
            ))}
          </Grid>
        </Box>
      </Box>

      <Box px={{ base: 4, md: 6, lg: 8 }} pb={{ base: 10, md: 14 }}>
        <Box
          maxW="1240px"
          mx="auto"
          bg="white"
          borderRadius={{ base: "28px", md: "36px" }}
          px={{ base: 5, md: 8 }}
          py={{ base: 7, md: 9 }}
          boxShadow="0 20px 50px rgba(15, 23, 42, 0.06)"
        >
          <VStack spacing={3} textAlign="center">
            <Text
              fontFamily="Poppins"
              fontSize={{ base: "sm", md: "md" }}
              fontWeight="700"
              letterSpacing="0.12em"
              textTransform="uppercase"
              color="#0a4979"
            >
              Clinic Glimpse
            </Text>
            <Text fontFamily="Poppins" fontSize={{ base: "3xl", md: "5xl" }} fontWeight="800" color="gray.800">
              A closer look at Den.Point
            </Text>
            <Text color="gray.600" maxW="720px" fontSize={{ base: "md", md: "lg" }}>
              Explore a few snapshots that reflect the atmosphere, care, and clinical experience behind the practice.
            </Text>
          </VStack>

          <Box mt={{ base: 8, md: 10 }}>
            <ImgCarousel />
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default Homepage;
