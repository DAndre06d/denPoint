import PropTypes from 'prop-types';
import { Image, Box, Text } from '@chakra-ui/react';

const ImagesWTitle = ({ title, src, size,color }) => {
  const { width , height  } = size || {};
  return (
    <Box 
      width="full"
      maxWidth={width}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
    >

      <Image
        src={src}
        alt={title}
        objectFit="cover"
        width={width}
        height={height}
        fallbackSrc="https://via.placeholder.com/400x300?text=Image+Not+Found"
      />
      <Box p={4} textAlign="center">
        <Text fontSize="lg" fontWeight="bold" color={color}>
          {title}
        </Text>
      </Box>
    </Box>
  );
};

ImagesWTitle.propTypes = {
  title: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired,
  size: PropTypes.shape({
    width: PropTypes.string,
    height: PropTypes.string,
  }),
};

export default ImagesWTitle;