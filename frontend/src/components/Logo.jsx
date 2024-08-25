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
      />
      </Link>
    </Box>
  );
};

Logo.propTypes = {
  size: PropTypes.shape({
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }).isRequired,
};

export default Logo;