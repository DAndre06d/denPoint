import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles
import { getCarouselImages } from '../../utils/getCarouselImg.js';
import { Box } from '@chakra-ui/react';

const ImgCarousel = () => {
    const images = getCarouselImages();
    return (
        <Box width="100%" display="flex" justifyContent="center" alignItems="center">
            <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            swipeable
            emulateTouch
            useKeyboardArrows
            autoPlay
            interval={5000}
            stopOnHover
            dynamicHeight={false}
            >
                {images.map((src, index) => (
                <div key={index}>
                    <img
                      src={src}
                      alt={`Slide ${index + 1}`}
                      style={{
                        height: "460px",
                        width: "100%",
                        objectFit: "cover",
                        borderRadius: "24px",
                      }}
                    />
                </div>
                ))}
            </Carousel>
      </Box>
    );
  };
  
  export default ImgCarousel;
