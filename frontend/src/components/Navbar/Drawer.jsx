import { IconButton, Drawer as ChakraDrawer, DrawerOverlay, DrawerContent, DrawerHeader, DrawerBody, useDisclosure, Box } from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Links from './Links.jsx';
import { useSelector } from 'react-redux';

const Drawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const placement = 'right';
  const { isAuthenticated} = useSelector((state) => state.auth);
  return (
    <>
      <IconButton
        icon={<HamburgerIcon />}
        aria-label="Open Drawer"
        onClick={onOpen}
        
      />
      <ChakraDrawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth="1px" display="flex" justifyContent="space-between" alignItems="center">
            <span>Menu</span>
            <IconButton
              icon={<CloseIcon />}
              aria-label="Close Drawer"
              onClick={onClose}
              variant="ghost"
              size={"sm"}
            />
          </DrawerHeader>
          <DrawerBody>
            <Box my={4}>
                <Links title='About' url='/about' />
            </Box>
            <Box my={4}>
                <Links title='Services' url='/services' />
            </Box>
            {!isAuthenticated ? <Box my={4}>
                <Links title='Login' url='/auth/login' />
            </Box> : <Box my={4}>
              <Links title='User DashBoard' url='/dashboard' />
            </Box>}
            <Box my={4}>
                <Links title='Book Appoinment' url='/book' />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </ChakraDrawer>
    </>
  );
};

export default Drawer;