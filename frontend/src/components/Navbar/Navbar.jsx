import { Box, Button, Text, VStack, useMediaQuery } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CenteredLinks from "./CenteredLinks";
import Drawer from "./Drawer";
import Logo from "../Logo";
import MenuAvatar from "./menuAvatar/MenuAvatar";

const Navbar = () => {
  const [isLargerThanMD] = useMediaQuery("(min-width: 48em)");
  const { isAuthenticated } = useSelector((state) => state.auth);
  const size = isLargerThanMD
    ? { width: "68px", height: "68px" }
    : { width: "44px", height: "44px" };

  return (
    <Box
      width="100%"
      position="sticky"
      top="0"
      zIndex="sticky"
      bg="rgba(255, 255, 255, 0.98)"
      borderBottom="1px solid"
      borderColor="blackAlpha.100"
    >
      <Box
        maxW="1240px"
        mx="auto"
        px={{ base: 4, md: 6, lg: 8 }}
        py={{ base: 3, md: 4 }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={{ base: 4, md: 6 }}
      >
        <Link to="/">
          <Box display="flex" alignItems="center" gap={{ base: 3, md: 4 }} flexShrink={0}>
            <Logo size={size} />
            {isLargerThanMD && (
              <VStack align="start" spacing={0}>
                <Text
                  fontFamily="Poppins"
                  fontWeight="800"
                  fontSize="lg"
                  lineHeight="1"
                  letterSpacing="0.08em"
                  color="gray.800"
                >
                  DEN.POINT
                </Text>
                <Text
                  fontFamily="Poppins"
                  fontSize="xs"
                  textTransform="uppercase"
                  letterSpacing="0.18em"
                  color="gray.500"
                >
                  Dental Care
                </Text>
              </VStack>
            )}
          </Box>
        </Link>

        {isLargerThanMD && (
          <Box flex="1" display="flex" justifyContent="center" minW={0}>
            <CenteredLinks />
          </Box>
        )}

        {isLargerThanMD && !isAuthenticated && (
          <Box display="flex" alignItems="center" flexShrink={0}>
            <Link to="/book">
              <Button
                colorScheme="blue"
                borderRadius="999px"
                px={6}
                height="46px"
                boxShadow="0 10px 24px rgba(49, 130, 206, 0.22)"
              >
                Book Appointment
              </Button>
            </Link>
          </Box>
        )}

        {isLargerThanMD && isAuthenticated && (
          <Box display="flex" alignItems="center" flexShrink={0}>
            <MenuAvatar />
          </Box>
        )}

        {!isLargerThanMD && (
          <Box display="flex" alignItems="center" flexShrink={0}>
            <Drawer />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Navbar;
