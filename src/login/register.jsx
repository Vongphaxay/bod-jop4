import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Paper,
  InputAdornment,
  Link,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import WcIcon from "@mui/icons-material/Wc";
import PetsIcon from "@mui/icons-material/Pets";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { registerCustomer } from "../services/customer.service";
import Alert from "@mui/material/Alert";

const Register = () => {
  const navigate = useNavigate();

  // State สำหรับแต่ละฟิลด์
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const APIREGISTER = async () => {
    try {
      const response = await registerCustomer(
        name,
        gender,
        address,
        phone,
        username,
        password
      );
      console.log(response);
      navigate("/login");
    } catch (error) {
      console.error(error);
      const message = error?.response?.data?.error;
      if (message === "Username already exists.") {
        setError("ຊື່ຜູ້ໃຊ້ມີແລ້ວ");
      } else if (message === "Phone number already exists.") {
        setError("ເບີໂທມີແລ້ວ");
      } else {
        setError("ເກີດຂໍ້ຜິດພາດ");
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        pt: 4,
        pb: 4,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 500,
          p: 4,
          borderRadius: 2,
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate("/")}
          sx={{
            alignSelf: "flex-start",
            mb: 2,
            color: "#552619",
          }}
        >
          ກັບຄືນ
        </Button>

        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <PetsIcon fontSize="large" sx={{ color: "#552619", mr: 1 }} />
          <Typography variant="h5" sx={{ color: "#552619", fontWeight: 600 }}>
            DR. P VETERINARY
          </Typography>
        </Box>

        <Typography
          variant="h4"
          gutterBottom
          sx={{ color: "#552619", mb: 3, textAlign: "center" }}
        >
          ລົງທະບຽນ
        </Typography>

        <TextField
          label="ຊື່"
          variant="outlined"
          fullWidth
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            console.log("Name:", e.target.value);
          }}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PersonIcon />
              </InputAdornment>
            ),
          }}
        />

        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="gender-select-label">ເພດ</InputLabel>
          <Select
            labelId="gender-select-label"
            id="gender-select"
            value={gender}
            label="ເພດ"
            onChange={(e) => {
              setGender(e.target.value);
              console.log("Gender:", e.target.value);
            }}
            startAdornment={
              <InputAdornment position="start">
                <WcIcon />
              </InputAdornment>
            }
          >
            <MenuItem value="male">ຊາຍ</MenuItem>
            <MenuItem value="female">ຍິງ</MenuItem>
          </Select>
        </FormControl>

        <TextField
          label="ທີ່ຢູ່"
          variant="outlined"
          fullWidth
          multiline
          rows={2}
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
            console.log("Address:", e.target.value);
          }}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <HomeIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="ເບີໂທ"
          variant="outlined"
          fullWidth
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          value={phone}
          onChange={(e) => {
            setPhone(e.target.value);
            console.log("Phone:", e.target.value);
          }}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <PhoneIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="ຊື່ຜູ້ໃຊ້"
          variant="outlined"
          fullWidth
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            console.log("Username:", e.target.value);
          }}
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <AccountCircleIcon />
              </InputAdornment>
            ),
          }}
        />

        <TextField
          label="ລະຫັດຜ່ານ"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            console.log("Password:", e.target.value);
          }}
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
        {error && (
          <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
            {error}
          </Alert>
        )}
        <Button
          variant="contained"
          fullWidth
          sx={{
            bgcolor: "#ff9800",
            color: "#fff",
            borderRadius: 2,
            py: 1.5,
            "&:hover": {
              bgcolor: "#f57c00",
            },
          }}
          onClick={() => {
            if (
              !name ||
              !gender ||
              !address ||
              !phone ||
              !username ||
              !password
            ) {
              setError("ກະລຸນາປ້ອນຂໍ້ມູນໃຫ້ຄົບ");
              return;
            }
            setError("");
            console.log("Register Data:", {
              name,
              gender,
              address,
              phone,
              username,
              password,
            });
            APIREGISTER();
          }}
        >
          ລົງທະບຽນ
        </Button>

        <Box sx={{ textAlign: "center", mt: 2 }}>
          <Typography variant="body2" sx={{ color: "#555" }}>
            ມີບັນຊີແລ້ວບໍ?{" "}
            <Link
              component={RouterLink}
              to="/login"
              sx={{ color: "#004ba0", fontWeight: "bold" }}
            >
              ເຂົ້າສູ່ລະບົບ
            </Link>
          </Typography>
        </Box>
      </Paper>

      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Typography variant="body2" sx={{ color: "#777" }}>
          © 2025 DR. P VETERINARY. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Register;
