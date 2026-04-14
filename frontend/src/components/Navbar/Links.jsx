import { Box, Link } from '@chakra-ui/react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

const Links = ({ url, title }) => {
  const location = useLocation();
  const isActive = location.pathname === url;

  return (
    <Box>
      <Link
        as={RouterLink}
        to={url}
        display="inline-flex"
        alignItems="center"
        justifyContent="center"
        px={{ md: 4, lg: 5 }}
        py={2}
        borderRadius="999px"
        fontFamily="Poppins"
        fontSize={{ md: "md", lg: "lg" }}
        fontWeight={isActive ? "700" : "600"}
        color={isActive ? "blue.600" : "gray.700"}
        bg={isActive ? "blue.50" : "transparent"}
        whiteSpace="nowrap"
        _hover={{
          textDecoration: 'none',
          color: 'blue.600',
          bg: isActive ? "blue.50" : "blackAlpha.50",
        }}
        transition="all 0.2s ease"
      >
        {title}
      </Link>
    </Box>
  );
};

Links.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Links;
