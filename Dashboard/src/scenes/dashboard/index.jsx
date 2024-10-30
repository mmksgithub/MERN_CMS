import React, { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import logo from "../../../src/assets/images/vasudev-logo-keb.png";
import { tokens } from "../../theme";
import { Box, Typography, useTheme } from "@mui/material";
import config from "../../../env";


const Dashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  axios.defaults.withCredentials = true;

  useEffect(() => {
    // Check if the user is authorized to access the dashboard
    axios.get(`${config.PROJECT_URL}/api/users/verify`)
      .then(res => {
        if (!res.data.status) {
          // If not authenticated, redirect to /login
          navigate('/login');
        }
      })
      .catch(() => {
        // In case of error (e.g. no token), also redirect to /login
        navigate('/login');
      });
  }, []);

  return (
    <>
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      sx={{
        padding: { xs: "20px", md: "40px" }, // Responsive padding
        
      }}
    >
      {/* Logo */}
      <img
        style={{
          maxWidth: "90%",  // Responsive width
          height: "auto",   // Maintain aspect ratio
          borderRadius: "5px",
          marginTop: "0px",
          backgroundColor: colors.primary[995], // Optional background color for better visibility

        }}      
        src={logo}
        alt="Logo"
      />

      {/* Heading */}
    
    </Box>

 
      <Typography
      variant="h1" // Use MUI Typography for responsiveness
      sx={{
        fontSize: { xs: "30px", md: "50px" }, // Responsive font size
        textAlign: "center",
        marginTop: "-10px", // Separate margin for heading
        marginBottom: { xs: "10px", md: "30px" }, // Responsive margin bottom
        color: colors.gray[100], // Text color (can adjust based on theme)
            fontFamily: "Figtree",

      }}
    >
      Welcome to Administrator dashboard!
    </Typography>

    </>
  );
};

export default Dashboard;
