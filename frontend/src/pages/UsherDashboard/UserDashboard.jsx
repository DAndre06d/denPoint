import { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar.jsx";
import Footer from "../../components/footer/Footer.jsxr"
import CardComponent from "../../components/CardComponent.jsx";
import Pagination from "../../components/Pagination.jsx"; // Import the Pagination component
import { Box, Text, Grid, useToast } from "@chakra-ui/react";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resAppData = await axios.get(
          `${import.meta.env.VITE_API_URL}/book/getAppointments?userId=${userId}&page=${pageData.page}&limit=${pageData.pageSize}`,
          { withCredentials: true }
        );
        const transformedData = resAppData.data.data.map((appointment) => ({
          ...appointment,
          typeOfService: serviceMap[appointment.typeOfService] || 'Unknown Service',
        }));
        setAppointments({ data: resAppData.data.data, totalCount: resAppData.data.total });
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
    };
    fetchData();
  }, [pageData.page, pageData.pageSize, userId, toast]);

  const handlePageChange = (newPage) => {
    setPageData((prev) => ({
      ...prev,
      page: newPage,
    }));
  };

  const handlePageSizeChange = (newSize) => {
    setPageData((prev) => ({
      ...prev,
      pageSize: newSize,
      page: 1, // Reset to first page on page size change
    }));
  };

  return (
    <Box fontFamily={"Poppins"}>
      <Navbar />
      <Box>
        <Box width={"100%"} height={"15vh"} bg={"#0a4979"}>
          <Box p={50}>
            <Text color={"white"} fontSize={"xl"}>
              Welcome Back, {titleCase(name)}!
            </Text>
            <Text color={"wheat"}>{titleCase(role)}</Text>
          </Box>
        </Box>
      </Box>
      <Box m={10}>
        <Text as={"b"}>Appointments:</Text>
      </Box>
      <Box m={10} overflowX="auto" px={{ base: 2, md: 0 }}>
        {appointments.data.length > 0 ? (
          <>
            <Grid
              templateColumns={{
                base: '1fr',
                sm: 'repeat(2, 1fr)',
                md: 'repeat(3, 1fr)',
                lg: 'repeat(5, 1fr)',
              }}
              gap={6}
              autoFlow="row"
            >
              {appointments.data.map((appointment, index) => (
                <CardComponent
                  key={index}
                  appointment={appointment}
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
          <Text as="b">No Appointments. Book now?</Text>
        )}
      </Box>
      <Footer />
    </Box>
  );
};

export default UserDashboard;