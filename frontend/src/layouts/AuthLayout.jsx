import { Outlet } from "react-router-dom";
import { Box,Image } from "@chakra-ui/react";

const AuthLayout = () => {
  return (
    <Box display="flex" width="100vw" height="100vh">
      <Box flex="1">
        <Outlet />
      </Box>
      <Box flex="1" position="relative" display={{base:"none", lg:"flex"}}>
        <Image
          src="/images/dentistAuthVector.png"
          alt="Example" 
          width="100%" 
          height="100vh" 
          objectFit="cover"
          position="absolute"
          top="0"
          left="0"

        />
      </Box>
    </Box>
  );
};

export default AuthLayout;