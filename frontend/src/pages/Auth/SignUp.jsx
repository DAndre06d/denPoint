import { Box, Text, useToast, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import Logo from "../../components/Logo";
import SignUpForm from "../../components/Forms/SignUpForm";
import { useState } from "react";
import axios from "axios"

const SignUp = () => {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState();

  const handleSubmit = async (firstName, lastName, userName, email, password, phoneNumber) => {
    try{
      setIsLoading(true)
      const resRegister = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`,{
        email,
        password,
        fName: firstName,
        lName: lastName,
        phoneNumber,
      })
      toast({
        title: "Success",
        position: "top-right",
        description: resRegister.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      })
    }catch(e){
      toast({
        title: "Error",
        description: e.response.data.message || "Error registering user.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Box
        textAlign="center"
        maxWidth="md"
        marginY="auto"
      >
      <Box mb={10}>
        <Logo size={{ width: 150, height: 150 }} />
      </Box>
        <Text fontSize="3xl" as="b">Sign Up</Text>
        <Text mt={2} mb={6}>Register to Den.Point to Schedule an appointment now!</Text>
        <SignUpForm onSubmit={handleSubmit} isLoading={isLoading} />
        <Box>
          <Text mt={5}>
            Already have an account?
            <Link
              as={RouterLink}
              to={"/auth/login"}
              color={"blue.500"}
              _hover={{ color: "blue.700", textDecoration: "underline" }}
            >
              {" "} Sign in here.
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUp;