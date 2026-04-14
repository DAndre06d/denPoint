import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Box, Grid, Text, VStack } from "@chakra-ui/react";

const About = () => {
  return (
    <Box minHeight="100vh" display="flex" flexDirection="column" bg="#f8fbff">
      <Navbar />
      <Box
        flex="1"
        width="100%"
        bg="linear-gradient(180deg, #f8fbff 0%, #eef6ff 100%)"
        px={{ base: 5, md: 8, lg: 12 }}
        py={{ base: 8, md: 12, lg: 16 }}
      >
        <Box maxW="1180px" mx="auto">
          <Grid
            templateColumns={{ base: "1fr", lg: "1.05fr 0.95fr" }}
            gap={{ base: 8, lg: 12 }}
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
                About Den.Point
              </Text>
              <Text
                mt={4}
                fontFamily="Poppins"
                fontSize={{ base: "3xl", md: "5xl" }}
                fontWeight="800"
                lineHeight="1.05"
                color="gray.800"
              >
                Modern dental care built around clarity, comfort, and confident smiles.
              </Text>
              <Text
                mt={5}
                maxW="640px"
                fontSize={{ base: "lg", md: "xl" }}
                lineHeight="1.8"
                color="gray.600"
              >
                Den.Point is focused on patient-centered dentistry that pairs advanced treatment planning
                with a warmer, more personal experience. From preventive care to restorative and aesthetic
                procedures, every visit is designed to feel thoughtful, precise, and easy to understand.
              </Text>
            </Box>

            <Box
              bg="#0a4979"
              color="white"
              borderRadius="32px"
              px={{ base: 6, md: 8 }}
              py={{ base: 7, md: 9 }}
              boxShadow="0 30px 70px rgba(10, 73, 121, 0.18)"
            >
              <Text fontFamily="Poppins" fontSize="sm" textTransform="uppercase" letterSpacing="0.12em" opacity={0.75}>
                Why Patients Choose Den.Point
              </Text>
              <VStack mt={5} spacing={5} align="stretch">
                <Box>
                  <Text fontSize="xl" fontWeight="700">Personalized treatment plans</Text>
                  <Text mt={1} color="whiteAlpha.800">
                    Recommendations are tailored to function, aesthetics, and long-term oral health.
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="xl" fontWeight="700">Contemporary clinical approach</Text>
                  <Text mt={1} color="whiteAlpha.800">
                    The clinic emphasizes modern implant and general dentistry techniques with a strong focus on quality care.
                  </Text>
                </Box>
                <Box>
                  <Text fontSize="xl" fontWeight="700">Clear communication</Text>
                  <Text mt={1} color="whiteAlpha.800">
                    Patients get guidance that is practical, transparent, and easier to act on with confidence.
                  </Text>
                </Box>
              </VStack>
            </Box>
          </Grid>

          <Grid
            mt={{ base: 10, md: 14 }}
            templateColumns={{ base: "1fr", md: "repeat(3, 1fr)" }}
            gap={5}
          >
            {[
              {
                title: "Patient-first planning",
                text: "Each treatment path is shaped around individual needs instead of one-size-fits-all recommendations.",
              },
              {
                title: "Functional and aesthetic care",
                text: "Den.Point aims to improve comfort, oral health, and smile confidence together.",
              },
              {
                title: "Growth through learning",
                text: "Continuous learning and evolving techniques support a more up-to-date patient experience.",
              },
            ].map((item) => (
              <Box
                key={item.title}
                bg="white"
                borderRadius="24px"
                px={6}
                py={7}
                borderWidth="1px"
                borderColor="blue.50"
                boxShadow="0 12px 30px rgba(15, 23, 42, 0.06)"
              >
                <Text fontFamily="Poppins" fontSize="xl" fontWeight="700" color="gray.800">
                  {item.title}
                </Text>
                <Text mt={3} color="gray.600" lineHeight="1.8">
                  {item.text}
                </Text>
              </Box>
            ))}
          </Grid>

          <Grid
            mt={{ base: 10, md: 14 }}
            templateColumns={{ base: "1fr", lg: "0.9fr 1.1fr" }}
            gap={{ base: 6, lg: 10 }}
          >
            <Box
              bg="white"
              borderRadius="28px"
              px={{ base: 6, md: 8 }}
              py={{ base: 7, md: 8 }}
              boxShadow="0 18px 40px rgba(15, 23, 42, 0.06)"
            >
              <Text fontFamily="Poppins" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="800" color="gray.800">
                Our Perspective
              </Text>
              <Text mt={4} color="gray.600" lineHeight="1.9">
                Den.Point represents a newer, more patient-aware direction in dentistry. The goal is not just
                to treat a concern, but to create an experience where patients feel informed, supported, and
                cared for from consultation to follow-up.
              </Text>
              <Text mt={4} color="gray.600" lineHeight="1.9">
                By combining general dentistry foundations with an emphasis on implant and advanced restorative
                care, the clinic is positioned to support both everyday dental needs and more involved smile rehabilitation work.
              </Text>
            </Box>

            <Box
              bg="linear-gradient(135deg, #0a4979 0%, #14639f 100%)"
              borderRadius="28px"
              px={{ base: 6, md: 8 }}
              py={{ base: 7, md: 8 }}
              color="white"
            >
              <Text fontFamily="Poppins" fontSize={{ base: "2xl", md: "3xl" }} fontWeight="800">
                What We Want Patients To Feel
              </Text>
              <VStack mt={6} spacing={4} align="stretch">
                <Box bg="whiteAlpha.140" borderRadius="18px" px={5} py={4}>
                  <Text fontWeight="700">Comforted</Text>
                  <Text mt={1} color="whiteAlpha.850">A calm environment matters just as much as clinical quality.</Text>
                </Box>
                <Box bg="whiteAlpha.140" borderRadius="18px" px={5} py={4}>
                  <Text fontWeight="700">Informed</Text>
                  <Text mt={1} color="whiteAlpha.850">Patients should understand their options without feeling overwhelmed.</Text>
                </Box>
                <Box bg="whiteAlpha.140" borderRadius="18px" px={5} py={4}>
                  <Text fontWeight="700">Confident</Text>
                  <Text mt={1} color="whiteAlpha.850">The best dental care should improve both oral health and peace of mind.</Text>
                </Box>
              </VStack>
            </Box>
          </Grid>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default About;
