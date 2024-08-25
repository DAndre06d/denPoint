import { Box, Text } from '@chakra-ui/react';
import ImagesWTitle from '../ImagesWTitle';
import generalDentistryImg from '../../assets/images/Icons/General+Dentistry.png';
import Perio from '../../assets/images/Icons/Periodontics.png';
import OralSurgery from "../../assets/images/Icons/Oral+Surgery+and+Implant+Dentistry.png";
import ArtBoard from "../../assets/images/Icons/Artboard-3.png";
import Prosthodontics from "../../assets/images/Icons/Prosthodontics.png";

const Services = () => {
  return (
    <Box
      mt={10}
      display="flex"
      flexDirection="column"
      alignItems="center"
      p={{ base: 4, md: 8 }} // Responsive padding
    >
      <Text as="b" fontSize={{ base: "3xl", md: "5xl" }} fontFamily="Poppins" color="blue.500" textAlign="center">
        Our Services
      </Text>
        <Box
          height="auto"
          display="flex"
          flexDirection={{ base: "column", md: "row" }} // Column on small screens, row on medium and larger
          justifyContent="space-between"
          flexWrap="wrap" // Wrap items if needed
          p={{ base: 4, md: 20 }} // Responsive padding
        >
          <ImagesWTitle title="General Dentistry" src={generalDentistryImg} size={{ width: '200px', maxWidth: '200px', height: '200px' }} color={"black"} />
          <ImagesWTitle title="Periodontics" src={Perio} size={{ width: '200px', maxWidth: '200px', height: '200px' }} />
          <ImagesWTitle title="Oral Surgery and Implant Dentistry" src={OralSurgery} size={{ width: '200px', maxWidth: '200px', height: '200px' }} color={"black"}/>
          <ImagesWTitle title="Orthodontics and Clear Aligners" src={ArtBoard} size={{ width: '200px', maxWidth: '200px', height: '200px' }} color={"black"}/>
          <ImagesWTitle title="Prosthodontics" src={Prosthodontics} size={{ width: '200px', maxWidth: '200px', height: '200px' }} color={"black"} />
        </Box>
    </Box>
  );
};

export default Services;