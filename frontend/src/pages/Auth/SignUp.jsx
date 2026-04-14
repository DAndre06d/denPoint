import { Box, Text, useToast, Link } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Logo from "../../components/Logo.jsx";
import SignUpForm from "../../components/Forms/SignUpForm.jsx";
import { useState } from "react";
import axios from "axios";
import { loginUser } from "../../utils/authUtils.js";

const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async ({ firstName, lastName, email, password, phoneNumber }) => {
    if (!email?.trim() || !password?.trim()) {
      toast({
        title: "Error",
        description: "Please enter both email and password.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    try{
      setIsLoading(true)
      const normalizedEmail = email.trim();
      const normalizedPassword = password.trim();

      const resRegister = await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`,{
        email: normalizedEmail,
        password: normalizedPassword,
        fName: firstName?.trim(),
        lName: lastName?.trim(),
        phoneNumber: phoneNumber?.trim(),
      });

      const loginResult = await dispatch(
        loginUser({ email: normalizedEmail, password: normalizedPassword })
      );

      if (!loginUser.fulfilled.match(loginResult)) {
        toast({
          title: "Success",
          position: "top-right",
          description: `${resRegister.data.message} Please log in to continue.`,
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/auth/login");
        return;
      }

      toast({
        title: "Success",
        position: "top-right",
        description: resRegister.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate("/dashboard");
    }catch(e){
      toast({
        title: "Error",
        description: e.response?.data?.message || "Error registering user.",
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
