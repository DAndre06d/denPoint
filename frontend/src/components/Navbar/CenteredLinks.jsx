import { Box, Link } from '@chakra-ui/react';
import Links from './Links.jsx';
import { useSelector } from 'react-redux';

function CenteredLinks() {
    const { isAuthenticated} = useSelector((state) => state.auth);
    return (
        <Box
            textAlign="center"
            width={{ base: "60%", lg: "50%" }}
            display="flex"
            justifyContent="space-evenly"
            alignItems="center"
        >
            <Links url='/about' title='About' />
            <Links url='/services' title='Services' />
            {!isAuthenticated ? <Links url='/auth/login' title='Login' />
           : <>
           <Links url='/book' title='Book' />
           <Links url='/dashboard' title='User Dashboard' />
           </>}
        </Box>
    );
}

export default CenteredLinks;