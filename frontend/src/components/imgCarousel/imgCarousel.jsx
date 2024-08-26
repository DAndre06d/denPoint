import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import { getCarouselImages } from '../../utils/getCarouselImg.js';
import { Box } from '@chakra-ui/react';

const ImgCarousel = () => {
    const images = getCarouselImages();
    return (
        <Box width={"90%"} display={"flex"} justifyContent={"center"} alignItems={"center"} pl={30}>
            <Carousel    showThumbs={false} 
            infiniteLoop 
            swipeable 
            useKeyboardArrows >
                {images.map((src, index) => (
                <div key={index}>
                    <img src={src} alt={`Slide ${index + 1}`} style={{height: "250px", width: "300px"}}  />
                </div>
                ))}
            </Carousel>
      </Box>
    );
  };
  
  export default ImgCarousel;