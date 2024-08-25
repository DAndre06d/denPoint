import { Box, Link } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const Links = ({ url, title }) => {
  const location = useLocation();
  const isActive = location.pathname === url;

  return (
    <Box position="relative" _hover={{ '& .underline': { width: '100%' } }}>
      <Link
        href="#"
        _hover={{ textDecoration: 'none', color: 'blue.500' }}
        display="inline-block"
        as={RouterLink}
        to={url}
        fontSize={"2xl"}
        color={isActive ? "blue.500" : "inherit"}
      >
        {title}
      </Link>
      <Box
        className="underline"
        position="absolute"
        bottom="-10px"
        left="0"
        width={isActive ? "100%" : "0"}
        height="2px"
        backgroundColor="blue.500"
        transition="width 0.3s ease"
      />
    </Box>
  );
};

Links.propTypes = {
  url: PropTypes.string.isRequired, // URL must be a string and is required
  title: PropTypes.string.isRequired // Title must be a string and is required
};

export default Links;