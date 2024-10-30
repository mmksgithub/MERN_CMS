import React, { useState } from "react";
import Axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Box, Button, TextField, IconButton, InputAdornment, useTheme } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material"; // Icons for eye toggle
import { tokens } from "./theme";  // Import tokens for theme-based styling
import logo from "./assets/images/vasudev-logo-rb.png";
import config from "../env";


const Login = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // State to manage password visibility
  const navigate = useNavigate();

  Axios.defaults.withCredentials = true;  // Ensure cookies are sent with requests

  // Toggle password visibility
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`${config.PROJECT_URL}/api/users/login`, {
      username,
      password,
    })
      .then((response) => {
        if (response.data.status) {
          toast.success("Login successful!",  {
            position: "top-center",
            autoClose: 2000,
            style: { backgroundColor: '#000000', color: 'white' }, // Custom style for the error toast
          });
          // Redirect after successful login
          setTimeout(() => {
            navigate("/dashboard");
          }, 1000);
        } else {
          toast.error("Invalid username or password.", { autoClose: 2000 });
        }
      })
      .catch((err) => {
        toast.error("Invalid username or password. Please try again.", { autoClose: 2000 });
      });
  };

  return (
    <Box sx={{ width: '100%', height: '100vh', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <ToastContainer position="top-center" />
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        alignItems="center"
        gap="20px"
        sx={{
          backgroundColor: "#E9FFFD",
          padding: "40px",
          borderRadius: "8px",
          maxWidth: "600px", // Ensure it stays within the page
          width: '100%', 
                    margin: "auto",

          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          marginTop: "0", // Removed extra margin
          position: "relative",
         
        }}
      >
        {/* Positioning the Back To Website link */}
        <Link
          to="http://localhost:5173"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            color: colors.primary[200],
            textDecoration: "none",
            fontSize: "14px",
            fontFamily:"Figtree", 
          }}
        >
          Back To Website
        </Link>

        {/* Logo */}
        <img
          style={{
            width: "100%", // Set to 100% to make it responsive
            maxWidth: "500px", // Maintain max width so it doesn't overflow
            height: "130px",
            borderRadius: "5px",
          }}
          src={logo}
          alt="Logo"
        />

        {/* Login Title */}
        <h2 style={{ color: colors.gray[100], fontSize: "30px", margin: 0,fontFamily:"Figtree",  }}>Admin Login</h2>

        {/* Username Field */}
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true,
            style: { color: colors.gray[100], fontSize: "18px",fontFamily:"Figtree",  },
          }}
          sx={{
            "& .MuiInputBase-input": {
              color: colors.gray[100],
              fontSize: "17px",fontFamily:"Figtree", 
            },
            "& .MuiOutlinedInput-root fieldset": {
              borderColor: colors.primary[200],
              fontSize: "17px",
              fontFamily:"Figtree", 
            },
          }}
        />

        {/* Password Field with Toggle Visibility */}
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"} // Toggle between "text" and "password" types
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="dense"
          InputLabelProps={{
            shrink: true,
            style: { color: colors.gray[100], fontSize: "18px",fontFamily:"Figtree",  },
          }}
          sx={{
            "& .MuiInputBase-input": {
              color: colors.gray[100],
              fontSize: "17px",
              fontFamily:"Figtree", 
              
            },
            "& .MuiOutlinedInput-root fieldset": {
              borderColor: colors.primary[200],
              fontSize: "17px",
              fontFamily:"Figtree", 
            },
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  edge="end"
                  sx={{ color: colors.gray[100], }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* Login Button */}
        <Button
          type="submit"
          variant="contained"
          sx={{
            width: "100%",
            marginTop: "20px",
            backgroundColor: "#009999",
            padding: "15px",
            fontSize: "18px",
            fontFamily:"Figtree", 
            "&:hover": {
              backgroundColor: "#006666",
              color: "whitesmoke",
            },
          }}
        >
          Login
        </Button>

        {/* Forgot Password & Sign Up Links */}
        <Link to="/forgotPassword" style={{ color: colors.gray[100], marginTop: "10px",fontFamily:"Figtree",  }}>
          Forgot Password?
        </Link>
        <p style={{ color: colors.gray[100], marginTop: "10px",fontFamily:"Figtree",  }}>
          Don't Have Account?{" "}
          <Link to="/signup" style={{ color: colors.primary[200],fontFamily:"Figtree",  }}>
            Sign Up
          </Link>
        </p>
      </Box>
    </Box>
  );
};

export default Login;
