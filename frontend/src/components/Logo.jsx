import PropTypes from 'prop-types';
import { Box, Image } from "@chakra-ui/react";
import { Link } from 'react-router-dom';

const Logo = ({ size }) => {
  return (
    <Box display="flex" justifyContent="center">
    <Link to={"/"}>
      <Image
        src="/images/DenPoint.png"
        width={size.width}
        height={size.height}
        objectFit="contain"
        display="block"
      />
      </Link>
    </Box>
  );
};

Logo.propTypes = {
  size: PropTypes.shape({
    width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  }).isRequired,
};

export default Logo;
