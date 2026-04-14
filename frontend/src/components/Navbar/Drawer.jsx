import {
  IconButton,
  Drawer as ChakraDrawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  useDisclosure,
  Box,
  Text,
  VStack,
  Button,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AvatarWithName from '../AvatarwithName.jsx';

const Drawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isAuthenticated, name } = useSelector((state) => state.auth);

  return (
    <>
      <IconButton
        icon={<HamburgerIcon />}
        aria-label="Open Drawer"
        onClick={onOpen}
        variant="ghost"
        borderRadius="16px"
        size="md"
      />
      <ChakraDrawer placement="right" onClose={onClose} isOpen={isOpen} size="full">
        <DrawerOverlay />
        <DrawerContent maxW="100vw" bg="linear-gradient(180deg, #f8fbff 0%, #ffffff 100%)">
          <DrawerHeader borderBottomWidth="1px" display="flex" justifyContent="space-between" alignItems="center" py={5}>
            <Text fontFamily="Poppins" fontWeight="800" fontSize="xl">Menu</Text>
            <IconButton
              icon={<CloseIcon />}
              aria-label="Close Drawer"
              onClick={onClose}
              variant="ghost"
              size="sm"
            />
          </DrawerHeader>
          <DrawerBody px={6} py={8}>
            <VStack align="stretch" spacing={5}>
              {isAuthenticated && (
                <Box
                  bg="white"
                  borderRadius="24px"
                  px={5}
                  py={5}
                  borderWidth="1px"
                  borderColor="blackAlpha.100"
                  boxShadow="0 14px 36px rgba(15, 23, 42, 0.05)"
                >
                  <AvatarWithName name={name} />
                </Box>
              )}

              {[
                { title: 'About', url: '/about' },
                { title: 'Services', url: '/services' },
                { title: isAuthenticated ? 'Dashboard' : 'Login', url: isAuthenticated ? '/dashboard' : '/auth/login' },
                { title: 'Book Appointment', url: '/book' },
              ].map((item) => (
                <Button
                  key={item.url}
                  as={RouterLink}
                  to={item.url}
                  onClick={onClose}
                  justifyContent="flex-start"
                  variant="ghost"
                  borderRadius="18px"
                  height="56px"
                  fontFamily="Poppins"
                  fontSize="lg"
                  fontWeight="600"
                  color="gray.800"
                  _hover={{ bg: "blue.50", color: "blue.600" }}
                >
                  {item.title}
                </Button>
              ))}
            </VStack>
          </DrawerBody>
        </DrawerContent>
      </ChakraDrawer>
    </>
  );
};

export default Drawer;
