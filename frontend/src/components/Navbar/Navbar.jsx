import { Box, Button, useMediaQuery } from "@chakra-ui/react";
import CenteredLinks from "./CenteredLinks";
import Drawer from "./Drawer";
import Logo from "../Logo";
import { Link, useLocation } from "react-router-dom";
import AvatarWithName from "../AvatarwithName";
import MenuAvatar from "./menuAvatar/menuAvatar";

const Navbar = () => {
  // Define a media query for large screens (lg and above)
  const [isLargerThanMD] = useMediaQuery("(min-width: 48em)");
  const size = isLargerThanMD ? {width: 100, height: 100} :{width: 40, height: 40}

  // Get the current location
  const location = useLocation();
  const isBookPage = location.pathname === "/book";
  const isDashboardPage = location.pathname === "/dashboard";

  return (
    <Box width={"100vw"} display={"flex"} justifyContent={"space-between"} p={10} borderBottom={"1px"}>
      <Box display={"flex"}>
        <Logo size={size} />
      </Box>
      {/* Conditionally render CenteredLinks and Box based on screen size */}
      {isLargerThanMD && <CenteredLinks />}
      {isLargerThanMD && !isBookPage && !isDashboardPage && (
        <Box display={"flex"} alignItems={"center"}>
          <Link to={"/book"}>
            <Button colorScheme="blue">Book Appointment</Button>
          </Link>
        </Box>
      )}
      {isDashboardPage && <Box display={"flex"} alignItems={"center"}> <MenuAvatar /> </Box>}
      {!isLargerThanMD && (
        <Box display={"flex"} alignItems={"center"}>
          <Drawer />
        </Box>
      )}
      
    </Box>
  );
};

export default Navbar;