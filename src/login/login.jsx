import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  InputAdornment,
  IconButton,
  Link
} from "@mui/material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = (event) => event.preventDefault();

  return (
    <Container maxWidth="sm" sx={{ mt: 8, mb: 8 }}>
      <Paper
        elevation={6}
        sx={{
          p: 5,
          borderRadius: 4,
          backgroundColor: "#fff",
          boxShadow: "0 8px 32px rgba(0,0,0,0.1)"
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mb: 3
          }}
        >
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate("/")}
            sx={{
              alignSelf: "flex-start",
              mb: 2,
              color: "#552619"
            }}
          >
            ກັບຄືນ
          </Button>

          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <PetsIcon fontSize="large" sx={{ color: "#552619", mr: 1 }} />
            <Typography
              variant="h5"
              sx={{
                color: "#552619",
                fontWeight: 600
              }}
            >
              DR. P VETERINARY
            </Typography>
          </Box>

          <Typography variant="h4" sx={{ mb: 3, fontWeight: "bold", color: "#2C3E50" }}>
            ເຂົ້າສູ່ລະບົບ
          </Typography>
        </Box>

        <TextField
          label="ຊື່ຜູ້ໃຊ້"
          variant="outlined"
          fullWidth
          sx={{ mb: 3 }}
          InputProps={{
            sx: { borderRadius: 2 }
          }}
        />

        <TextField
          label="ລະຫັດຜ່ານ"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          fullWidth
          sx={{ mb: 4 }}
          InputProps={{
            sx: { borderRadius: 2 },
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />

        <Button
          variant="contained"
          fullWidth
          sx={{
            py: 1.5,
            borderRadius: 2,
            bgcolor: "#004ba0",
            color: "#fff",
            fontSize: "1rem",
            mb: 2,
            "&:hover": {
              bgcolor: "#003b80"
            }
          }}
        >
          ເຂົ້າສູ່ລະບົບ
        </Button>

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="body2" sx={{ color: "#555" }}>
            ຍັງບໍ່ມີບັນຊີບໍ?{" "}
            <Link
              component={RouterLink}
              to="/register"
              sx={{ color: "#ff9800", fontWeight: "bold" }}
            >
              ລົງທະບຽນ
            </Link>
          </Typography>
        </Box>
      </Paper>

      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Typography variant="body2" sx={{ color: "#777" }}>
          © 2025 DR. P VETERINARY. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default Login;