import { Grid, Box } from '@chakra-ui/react';
import ImagesWTitle from '../../components/ImagesWTitle.jsx';
import generalDentistryImg from '../../assets/images/Icons/General+Dentistry.png';
import Perio from '../../assets/images/Icons/Periodontics.png';
import OralSurgery from "../../assets/images/Icons/Oral+Surgery+and+Implant+Dentistry.png";
import ArtBoard from "../../assets/images/Icons/Artboard-3.png";
import Prosthodontics from "../../assets/images/Icons/Prosthodontics.png";

const ServicesImages = () => {
    return (
      <Grid
        templateColumns={{ base: '1fr', md: 'repeat(2, 1fr)' }} // 1 column on small screens, 2 columns on large screens
        gap={1} // Reduced space between grid items
        p={{ base: 1, md: 4 }} // Further reduced responsive padding
        maxWidth="1200px" // Set a maximum width for the grid container
        mx="auto" // Center the grid container
        mt={10}
      >
        {[
          { title: "General Dentistry", src: generalDentistryImg },
          { title: "Periodontics", src: Perio },
          { title: "Oral Surgery and Implant Dentistry", src: OralSurgery },
          { title: "Orthodontics and Clear Aligners", src: ArtBoard },
          { title: "Prosthodontics", src: Prosthodontics }
        ].map((item, index) => (
          <Box
            key={index}
            display="flex"
            justifyContent="center"
            alignItems="center"
            p={1} // Reduced padding around each grid item
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              width="80%" // Adjusted width of each grid item
            >
              <ImagesWTitle title={item.title} src={item.src} size={{ width: '120px', maxWidth: '120px', height: '120px' }} color={"white"} />
            </Box>
          </Box>
        ))}
      </Grid>
    );
};

export default ServicesImages;