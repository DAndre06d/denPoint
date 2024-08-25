import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/Footer";
import { Box, useMediaQuery } from "@chakra-ui/react";
import Logo from "../../components/Logo";
import Description from "./Description";

const About = () => {
  const [isSmallerThanMd] = useMediaQuery("(max-width: 48em)");

  const logoSize = isSmallerThanMd ? { width: 150, height: 150 } : { width: 250, height: 250 };
  const flexDirection = isSmallerThanMd ? "column" : "row";

  return (
    <Box minHeight="100vh" display="flex" flexDirection="column">
      <Navbar />
      <Box
        backgroundColor={"#0a4979"}
        flex="1"
        width={"100%"}
        display={"flex"}
        flexDirection={flexDirection}
        justifyContent={"center"}
        alignItems={"center"}
        p={{base: 10, lg: 40}} 
      >
        <Box
          border={"2px"}
          borderColor={"blue.500"}
          width={`${logoSize.width + 4}px`} 
          height={`${logoSize.height + 4}px`}
          display="flex"
          justifyContent="center"
          alignItems="center"
          mb={isSmallerThanMd ? 8 : 0} 
        >
          <Logo size={logoSize} />
        </Box>
        <Description />
      </Box>
      <Footer />
    </Box>
  );
};

export default About;