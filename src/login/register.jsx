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
  Link
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import HomeIcon from "@mui/icons-material/Home";
import PhoneIcon from "@mui/icons-material/Phone";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import WcIcon from "@mui/icons-material/Wc";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets";

const Register = () => {
  const [gender, setGender] = useState('');
  const navigate = useNavigate();

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      flexDirection: 'column',
      pt: 4, 
      pb: 4 
    }}>
      <Paper 
        elevation={3} 
        sx={{ 
          width: '100%', 
          maxWidth: 500, 
          p: 4, 
          borderRadius: 2,
          position: 'relative',
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        {/* Back arrow button */}
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
        
        <Typography variant="h4" gutterBottom sx={{ color: '#552619', mb: 3, textAlign: 'center' }}>
          ລົງທະບຽນ
        </Typography>
        
        <TextField 
          label="ຊື່" 
          variant="outlined" 
          fullWidth 
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
            onChange={handleGenderChange}
            startAdornment={
              <InputAdornment position="start">
                <WcIcon />
              </InputAdornment>
            }
          >
            <MenuItem value="male">ຊາຍ</MenuItem>
            <MenuItem value="female">ຍິງ</MenuItem>
            <MenuItem value="other">ອື່ນໆ</MenuItem>
          </Select>
        </FormControl>
        
        <TextField 
          label="ທີ່ຢູ່" 
          variant="outlined" 
          fullWidth 
          multiline
          rows={2}
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
          sx={{ mb: 2 }}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
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
          sx={{ mb: 3 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
          }}
        />
        
        <Button 
          variant="contained" 
          fullWidth 
          sx={{ 
            bgcolor: "#ff9800", 
            color: "#fff", 
            borderRadius: 2,
            py: 1.5,
            '&:hover': {
              bgcolor: "#f57c00"
            }
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