import { Grid, Box, Text } from '@chakra-ui/react';
import generalDentistryImg from '../../assets/images/Icons/General+Dentistry.png';
import Perio from '../../assets/images/Icons/Periodontics.png';
import OralSurgery from "../../assets/images/Icons/Oral+Surgery+and+Implant+Dentistry.png";
import ArtBoard from "../../assets/images/Icons/Artboard-3.png";
import Prosthodontics from "../../assets/images/Icons/Prosthodontics.png";

const ServicesImages = () => {
    return (
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)', xl: 'repeat(3, 1fr)' }}
        gap={{ base: 5, md: 6 }}
        mt={{ base: 10, md: 14 }}
      >
        {[
          {
            title: "General Dentistry",
            src: generalDentistryImg,
            text: "Foundational care focused on prevention, routine evaluation, and maintaining lasting oral health.",
          },
          {
            title: "Periodontics",
            src: Perio,
            text: "Targeted gum care that supports healthier tissue, stronger oral foundations, and improved long-term outcomes.",
          },
          {
            title: "Oral Surgery and Implant Dentistry",
            src: OralSurgery,
            text: "Advanced treatment planning for surgical needs and implant-focused solutions with function and aesthetics in mind.",
          },
          {
            title: "Orthodontics and Clear Aligners",
            src: ArtBoard,
            text: "Alignment-focused care that helps refine bite, spacing, and smile harmony with modern treatment options.",
          },
          {
            title: "Prosthodontics",
            src: Prosthodontics,
            text: "Restorative dentistry designed to rebuild comfort, appearance, and confidence through precise replacement work.",
          }
        ].map((item, index) => (
          <Box
            key={index}
            bg="white"
            borderRadius="28px"
            px={{ base: 6, md: 7 }}
            py={{ base: 7, md: 8 }}
            borderWidth="1px"
            borderColor="blue.50"
            boxShadow="0 16px 38px rgba(15, 23, 42, 0.06)"
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="flex-start"
              justifyContent="space-between"
              minH="100%"
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
                <Box
                  as="img"
                  src={item.src}
                  alt={item.title}
                  width="58px"
                  height="58px"
                  objectFit="contain"
                />
              </Box>
              <Text mt={6} fontFamily="Poppins" fontSize={{ base: "xl", md: "2xl" }} fontWeight="700" color="gray.800">
                {item.title}
              </Text>
              <Text mt={3} color="gray.600" lineHeight="1.8">
                {item.text}
              </Text>
            </Box>
          </Box>
        ))}
      </Grid>
    );
};

export default ServicesImages;
