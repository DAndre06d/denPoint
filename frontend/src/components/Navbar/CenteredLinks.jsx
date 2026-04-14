import { Box } from '@chakra-ui/react';
import { useSelector } from 'react-redux';
import Links from './Links.jsx';

function CenteredLinks() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={{ md: 2, lg: 3 }}
      bg="white"
      borderWidth="1px"
      borderColor="blackAlpha.100"
      borderRadius="999px"
      px={{ md: 3, lg: 4 }}
      py={2}
      boxShadow="0 12px 28px rgba(15, 23, 42, 0.05)"
      flexWrap="nowrap"
    >
      <Links url='/about' title='About' />
      <Links url='/services' title='Services' />
      {!isAuthenticated ? (
        <Links url='/auth/login' title='Login' />
      ) : (
        <>
          <Links url='/book' title='Book' />
          <Links url='/dashboard' title='Dashboard' />
        </>
      )}
    </Box>
  );
}

export default CenteredLinks;
