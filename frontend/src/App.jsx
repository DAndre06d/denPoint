import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./utils/ProtectedRoutes.jsx";
import AuthLayout from "./layouts/AuthLayout.jsx";
import SignIn from "./pages/Auth/SignIn.jsx";
import SignUp from "./pages/Auth/SignUp.jsx";
import UserDashboard from "./pages/UsherDashboard/UserDashboard.jsx";
import HomePage from "./pages/Homepage.jsx";
import BookingPage from "./pages/Booking/Booking.jsx";
import Page404 from "./pages/Page404.jsx";
import About from "./pages/About/About.jsx";
import Services from "./pages/Services/Services.jsx";

function App() {
  return (
    <ChakraProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth Routes */}
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="login" element={<SignIn />} />
            <Route path="register" element={<SignUp />} />
          </Route>

          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="*" element={<Page404 />} />

          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <UserDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/book" 
            element={
              <ProtectedRoute>
                <BookingPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;