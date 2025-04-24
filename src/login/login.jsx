import React from "react";
import { Box, TextField, Button, Typography } from "@mui/material";

const Login = () => {
  return (
    <Box sx={{ width: 300, margin: "auto", paddingTop: 4 }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <TextField label="Username" variant="outlined" fullWidth sx={{ mb: 2 }} />
      <TextField label="Password" type="password" variant="outlined" fullWidth sx={{ mb: 2 }} />
      <Button variant="contained" color="primary" fullWidth>
        Login
      </Button>
    </Box>
  );
};

export default Login;
