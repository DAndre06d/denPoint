import { useState, useEffect, useCallback } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/footer/Footer.jsx"
import CardComponent from "../../components/CardComponent.jsx";
import Pagination from "../../components/Pagination.jsx"; // Import the Pagination component
import { Box, Text, Grid, useToast, Link, SimpleGrid, Stat, StatLabel, StatNumber, StatHelpText, Button } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { titleCase } from "../../utils/textUtils.js";
import axios from "axios";
import { SERVICES } from "../../utils/constants.js";

const serviceMap = SERVICES.reduce((acc, service) => {
  acc[service.value] = service.name;
  return acc;
}, {});

const UserDashboard = () => {
  const { userId, name, role } = useSelector((state) => state.auth);
  const [pageData, setPageData] = useState({
    page: 1,
    pageSize: 10,
  });
  const [appointments, setAppointments] = useState({
    data: [],
    totalCount: 0,
  });
  const toast = useToast();

  const fetchAppointments = useCallback(async () => {
    if (!userId) return;

    try {
      const resAppData = await axios.get(
        `${import.meta.env.VITE_API_URL}/book/getAppointments?userId=${userId}&page=${pageData.page}&limit=${pageData.pageSize}`,
        { withCredentials: true }
      );
      const transformedData = resAppData.data.data.map((appointment) => ({
        ...appointment,
        typeOfService: serviceMap[appointment.typeOfService] || 'Unknown Service',
      }));
      setAppointments({ data: transformedData, totalCount: resAppData.data.total });
    } catch (e) {
      const errorMessage = e.response?.data?.message || e.message;
      toast({
        title: "Error",
        description: errorMessage,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  }, [pageData.page, pageData.pageSize, toast, userId]);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  const handlePageChange = useCallback((newPage) => {
    setPageData((prev) => ({
      ...prev,
      page: newPage,
    }));
  }, []);

  const handlePageSizeChange = useCallback((newSize) => {
    setPageData((prev) => ({
      ...prev,
      pageSize: newSize,
      page: 1, // Reset to first page on page size change
    }));
  }, []);

  const upcomingCount = appointments.data.filter((appointment) => appointment.status === "scheduled").length;

  return (
    <Box fontFamily={"Poppins"} bg="linear-gradient(180deg, #f8fbff 0%, #ffffff 32%)">
      <Navbar />
      <Box px={{ base: 4, md: 6, lg: 8 }} py={{ base: 6, md: 10 }}>
        <Box maxW="1180px" mx="auto">
          <Box
            bg="linear-gradient(135deg, #0a4979 0%, #1b78b5 100%)"
            borderRadius={{ base: "28px", md: "36px" }}
            px={{ base: 6, md: 10 }}
            py={{ base: 7, md: 10 }}
            color="white"
            boxShadow="0 28px 70px rgba(10, 73, 121, 0.22)"
          >
            <Text fontSize={{ base: "sm", md: "md" }} fontWeight="700" letterSpacing="0.12em" textTransform="uppercase" color="whiteAlpha.800">
              User Dashboard
            </Text>
            <Text mt={3} fontSize={{ base: "3xl", md: "5xl" }} fontWeight="800" lineHeight="1.04">
              Welcome back, {titleCase(name)}!
            </Text>
            <Text mt={3} fontSize={{ base: "lg", md: "xl" }} color="whiteAlpha.850">
              Manage your appointments, keep track of your schedule, and make updates whenever you need.
            </Text>

            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4} mt={8}>
              <Stat bg="whiteAlpha.130" borderRadius="22px" px={5} py={5}>
                <StatLabel color="whiteAlpha.800">Role</StatLabel>
                <StatNumber fontSize={{ base: "2xl", md: "3xl" }}>{titleCase(role)}</StatNumber>
                <StatHelpText color="whiteAlpha.800" mb={0}>Current account type</StatHelpText>
              </Stat>
              <Stat bg="whiteAlpha.130" borderRadius="22px" px={5} py={5}>
                <StatLabel color="whiteAlpha.800">Appointments</StatLabel>
                <StatNumber fontSize={{ base: "2xl", md: "3xl" }}>{appointments.totalCount}</StatNumber>
                <StatHelpText color="whiteAlpha.800" mb={0}>Total records loaded</StatHelpText>
              </Stat>
              <Stat bg="whiteAlpha.130" borderRadius="22px" px={5} py={5}>
                <StatLabel color="whiteAlpha.800">Upcoming</StatLabel>
                <StatNumber fontSize={{ base: "2xl", md: "3xl" }}>{upcomingCount}</StatNumber>
                <StatHelpText color="whiteAlpha.800" mb={0}>Scheduled appointments</StatHelpText>
              </Stat>
            </SimpleGrid>
          </Box>

          <Box
            mt={{ base: 8, md: 10 }}
            bg="white"
            borderRadius={{ base: "28px", md: "32px" }}
            px={{ base: 5, md: 8 }}
            py={{ base: 6, md: 8 }}
            boxShadow="0 20px 50px rgba(15, 23, 42, 0.06)"
          >
            <Box
              display="flex"
              flexDirection={{ base: "column", md: "row" }}
              justifyContent="space-between"
              alignItems={{ base: "flex-start", md: "center" }}
              gap={4}
            >
              <Box>
                <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="800" color="gray.800">
                  Your Appointments
                </Text>
                <Text mt={2} color="gray.600" maxW="620px">
                  Review your scheduled visits, update details when needed, or cancel appointments directly from this dashboard.
                </Text>
              </Box>
              <Button as={RouterLink} to="/book" colorScheme="blue" borderRadius="16px" px={6}>
                Book New Appointment
              </Button>
            </Box>

            <Box mt={8}>
              {appointments.data.length > 0 ? (
                <>
                  <Grid
                    templateColumns={{
                      base: '1fr',
                      md: 'repeat(2, 1fr)',
                      xl: 'repeat(3, 1fr)',
                    }}
                    gap={{ base: 4, md: 6 }}
                  >
                    {appointments.data.map((appointment, index) => (
                      <CardComponent
                        key={index}
                        appointment={appointment}
                        trigger={fetchAppointments}
                      />
                    ))}
                  </Grid>
                  <Pagination
                    totalItems={appointments.totalCount}
                    itemsPerPageOptions={[5, 10, 15, 20]}
                    onPageChange={handlePageChange}
                    onPageSizeChange={handlePageSizeChange}
                  />
                </>
              ) : (
                <Box
                  borderRadius="24px"
                  borderWidth="1px"
                  borderStyle="dashed"
                  borderColor="blue.100"
                  bg="#f8fbff"
                  px={{ base: 5, md: 8 }}
                  py={{ base: 8, md: 12 }}
                  textAlign="center"
                >
                  <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="800" color="gray.800">
                    No Appointments Yet
                  </Text>
                  <Text mt={3} color="gray.600" maxW="520px" mx="auto">
                    When you book your first appointment, it will show up here with quick actions for updating or canceling.
                  </Text>
                  <Text mt={5} fontWeight="700" fontSize={{ base: "lg", md: "xl" }}>
                    <Link
                      as={RouterLink}
                      to="/book"
                      color="blue.500"
                      textDecoration="underline"
                      _hover={{ color: "blue.700" }}
                    >
                      Book now
                    </Link>
                  </Text>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default UserDashboard;
