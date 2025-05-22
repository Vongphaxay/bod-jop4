import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Typography,
  Stack,
  Menu,
  MenuItem,
  Grow
} from "@mui/material";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import PetsIcon from "@mui/icons-material/Pets";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ClinicInfo from "./pages/clinicinfo";
import Service from "./pages/service";
import Footer from "./pages/footer";
import Cages from "./pages/Cages";
import Login from "./login/login";
import Register from "./login/register";
import ReservationList from "./pages/Reservationlist";
import Contactpage from "./pages/contract";
import Cookies from 'js-cookie';

const Layout = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const location = useLocation();
  const name = Cookies.get("name");
  const cus_id = Cookies.get("cus_id");
  const accessToken = Cookies.get("accessToken");


  // Check if current page is login or register
  const isAuthPage = location.pathname === "/login" || location.pathname === "/register";

  const handleClick = (event) => {
    const name = Cookies.get("name");
    console.log(name);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: "#E8DCC5", 
          color: "#000", 
          boxShadow: 2,
          zIndex: (theme) => theme.zIndex.drawer + 1 
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              color: "#552619",
              fontWeight: 600,
              cursor: "pointer"
            }}
            onClick={() => navigate("/")}
          >
            <PetsIcon fontSize="large" sx={{ color: "#552619" }} />
            DR. P VETERINARY
          </Typography>

          {/* Only show menu if not on login/register pages */}
          {!isAuthPage && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button color="inherit" onClick={() => navigate("/")}>ໜ້າຫຼັກ</Button>

              <Button
                color="inherit"
                onClick={handleClick}
                endIcon={
                  <ArrowDropDownIcon
                    sx={{
                      transition: "transform 0.3s ease",
                      transform: open ? "rotate(180deg)" : "rotate(0deg)"
                    }}
                  />
                }
              >
                ບໍລິການ
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                TransitionComponent={Grow}
                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                transformOrigin={{ vertical: "top", horizontal: "left" }}
              >
                <MenuItem onClick={() => {
                  handleClose();
                  navigate("/Cages");
                }}>ຝາກສັດລ້ຽງ</MenuItem>
                <MenuItem onClick={() => {
                  handleClose();
                  navigate("/Cages");
                }}>ອາບນ້ຳສັດລ້ຽງ</MenuItem>
                <MenuItem onClick={() => {
                  handleClose();
                  navigate("/Cages");
                }}>ຕັດຂົນສັດລ້ຽງ</MenuItem>
                <MenuItem onClick={() => {
                  handleClose();
                  navigate("/Cages");
                }}>ປິ່ນປົວສັດລ້ຽງ</MenuItem>
              </Menu>

              <Button color="inherit" onClick={() => navigate("/reservationlist")}>ລາຍການຈອງ</Button>
              <Button color="inherit" onClick={() => navigate("/contact")}>ຕິດຕໍ່ສອບຖາມ</Button>
            </Box>
          )}

          {/* Only show login/register buttons if not on login/register pages */}
          {!isAuthPage && (
          <Stack direction="row" spacing={2} alignItems="center">
            {name && accessToken ? (
              // ✅ เมื่อผู้ใช้ล็อกอินแล้ว
              <>
                <Typography variant="body1" sx={{ fontWeight: "bold", color: "#004ba0" }}>
                  {name}
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    Cookies.remove("name");
                    Cookies.remove("cus_id");
                    Cookies.remove("accessToken");
                    navigate("/login");
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              // ❌ ยังไม่ล็อกอิน
              <>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#004ba0", color: "#fff", borderRadius: 2 }}
                  onClick={() => navigate("/login")}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  sx={{ bgcolor: "#ff9800", color: "#fff", borderRadius: 2 }}
                  onClick={() => navigate("/register")}
                >
                  Register
                </Button>
              </>
            )}
          </Stack>
        )}
        </Toolbar>
      </AppBar>
      {/* Add a placeholder toolbar to prevent content from hiding under AppBar */}
      <Toolbar />
    </>
  );
};

const HomePage = () => (
  <>
    <Box
      sx={{
        position: "relative",
        backgroundColor: "#fef9f5",
        minHeight: "50vh",
        backgroundImage:
          "url(https://s3-alpha-sig.figma.com/img/f3ca/8dc4/278987acf5759f2baa576bf781135e14?Expires=1743984000&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=omSpZhnR-j5ZOMHIuPn3OcYRwCDJcK7raeto0KnTUw~6z9pNUdeOTwccgryE~QPf8Vo1Qx1HOIYVnWw0w2SGYvFvaCRlhRf7AB0JXnN~k1NOIgLIk~sZt8xxW2uU1gmAU5KXbXsdE3Q6y-HRmQoGW~Qw6HP1Hkg0XPS0QEEMZha6JtHcWrx~Qajq2lS807KxZ-y~myXXzs6FrSfJjZQrN3hzRii-tjkaB5s6Ff8Nmka3WXRgyeOdxZsX084omrnpp9mqd6puFIzqN2oPl9cnXO9N7hm3R0aTc3BsnjgdeyVGHy7Vc8qcFe46~wjWwqHZOUrC9vEZi4V~vCEzAwy9sg__)",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "flex-start",
        textAlign: "left",
        color: "white",
        p: 6
      }}
    >
      <Typography variant="h4" sx={{ fontWeight: "bold", mb: 2 }}>
        ບໍລິການຮັບຝາກລ້ຽງ ໝາ ແລະ ແມວ 🐾
      </Typography>
      <Typography variant="h6" sx={{ maxWidth: 550 }}>
        ດູແລສັດລ້ຽງຢ່າງດີ ອາລົມຄືຢູ່ບ້ານ ໝັ້ນໃຈໄດ້ເລີຍວ່າ
        ສັດລ້ຽງຂອງທ່ານຈະປອດໄພ ຫຼື ບໍ່ເກີດອຸບັດຕິເຫົາຢ່າງແນ່ນອນ
        ພ້ອມຍິນດີໃຫ້ຄຳປຶກສາດູແລທັງກ່ອນ ແລະ ຫຼັງໃຊ້ບໍລິການ
      </Typography>
    </Box>
    <Box sx={{ p: 2 }}>
      <ClinicInfo />
    </Box>
    <Box sx={{ p: 2 }}>
      <Service />
    </Box>
    <Box sx={{ p: 2 }}>
      <Footer />
    </Box>
  </>
);

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Cages" element={<Cages />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reservationlist" element={<ReservationList />} />
        <Route path="/contact" element={<Contactpage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;