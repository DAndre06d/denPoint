import { Box, Text, useToast, Link } from "@chakra-ui/react";
import { Link as RouterLink, useNavigate,  } from "react-router-dom";
import { useDispatch} from "react-redux";
import SignInForm from "../../components/Forms/SigninForm.jsx";
import Logo from "../../components/Logo.jsx";
import { loginUser } from "../../utils/authUtils.js"; // Adjust the import path as needed
import { useState } from "react";
const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (email, password) => {
    if (!email.trim() || !password.trim()) {
      return toast({
        title: "Error",
        description: "Please enter both email and password",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }

    try {
      setIsLoading(true);
      const resultAction = await dispatch(loginUser({ email, password }));
      
      if (loginUser.fulfilled.match(resultAction)) {
        toast({
          title: "Success",
          position: "top-right",
          description: "Login successful!",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        navigate("/dashboard"); // Replace with your target route
      } else {
        toast({
          title: "Error",
          position: "top-right",
          description: resultAction.payload || "Login failed",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 429) {
        console.log(error.response)
        toast({
          title: "Error",
          position: "top-right",
          description: "Too many requests. Please try again later.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Error",
          position: "top-right",
          description: error.response?.data?.message || "An unknown error occurred",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    } finally {
      setIsLoading(false);
    }
};

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="90vh">
      <Box textAlign="center">
        <Box mb={10}>
          <Logo size={{ width: 150, height: 150 }} />
        </Box>
        <Text fontSize="3xl" as="b">Sign In</Text>
        <Text mt={2} mb={10}>Log in to schedule appointments or view available time.</Text>
        <SignInForm onSubmit={handleSubmit} isLoading={isLoading} />
        <Box>
          <Text mt={5}>
            Don't have an account?
            <Link as={RouterLink} to={"/auth/register"} color={"blue.500"} _hover={{ color: "blue.700", textDecoration: "underline" }}>
              Sign up here.
            </Link>
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;