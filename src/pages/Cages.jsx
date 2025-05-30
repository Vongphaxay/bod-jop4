import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import EventIcon from "@mui/icons-material/Event";
import PaymentIcon from "@mui/icons-material/Payment";
import PetsIcon from "@mui/icons-material/Pets";
import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { bookingRoom, getcategory_service } from "../services/booking.service";
import { getRoomPet } from "../services/roompet.service";

const Cages = () => {
  const [cages, setCages] = useState([]);
  const [selectedCage, setSelectedCage] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", date: "", time: "" });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  const [petData, setPetData] = useState({
    petName: "",
    petAge: "",
    petGender: "",
    petColor: "",
    petType: "",
    petSize: 0,
  });

  const [bookingData, setBookingData] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    days: 1,
    // days: "2025-04-23",
    ownerID: 0,
    room_id: 0,
    cat_id: 0,
    price: "",
  });

  useEffect(() => {
    const cus_id = Number(Cookies.get("cus_id"));
    setBookingData((prev) => ({
      ...prev,
      ownerID: cus_id || 0,

    }));
  }, []);

  useEffect(() => {
    if (selectedCage) {
      const newPrice = calculateTotalPrice();
      setBookingData((prev) => ({ ...prev, price: newPrice.toString() }));
    }
  }, [selectedCage, bookingData.days]);

  const [categoryreport, setcategoryreport] = useState([]);

  useEffect(() => {
    const getcategory_serviceapi = async () => {
      const response = await getcategory_service();
      setcategoryreport(response.report); // Assuming `response.report` is the array
      console.log("categoryreport", response.report);
    };

    getcategory_serviceapi();
  }, []);


  const handleDetailsOpen = (cage) => {
    setSelectedCage(cage);
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
  };

  const handleBookingOpen = (cage) => {
    console.log("room_id:", cage.id);
    localStorage.setItem("room_id", cage.id);

    setBookingData(prev => ({
      ...prev,
      room_id: cage.id,
    }));

    setSelectedCage(cage);
    setBookingOpen(true);
    setFormErrors({}); // ลบ error เมื่อเปิดฟอร์ม
  };

  // ฟังก์ชันล้างข้อมูลทั้งหมด
  const resetBookingData = () => {
    setFormData({ name: "", date: "", time: "" });
    setPetData({
      petName: "",
      petAge: "",
      petGender: "",
      petColor: "",
      petType: "",
      petSize: "",
    });

    setBookingData({
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      days: 1,
      ownerID: Number(Cookies.get("cus_id")) || 0,
      price: 0,
    });

    setSelectedOptions([]);
    setFormErrors({});
  };

  // ฟังก์ชันปิด booking dialog และล้างข้อมูล
  const handleBookingClose = () => {
    resetBookingData(); // ล้างข้อมูลทั้งหมดก่อนปิด dialog
    setBookingOpen(false); // ปิด dialog
  };

  const calculateDays = (start, end) => {
    const difference = end.getTime() - start.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24));
  };

  const handleDateChange = (type, date) => {
    setBookingData((prev) => {
      const updated = { ...prev, [type]: date };
      updated.days = calculateDays(
        type === "startDate" ? date : prev.startDate,
        type === "endDate" ? date : prev.endDate
      );
      return updated;
    });
  };

  const handleBookingChange = (field, value) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handlePetChange = (field, value) => {
    setPetData((prev) => ({ ...prev, [field]: value }));

    if (formErrors[field]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const APIBOOKINGROOM = async () => {
    try {
      const Token = Cookies.get("accessToken");

      const dataOfPet = {
        pet_name: petData.petName,
        age: petData.petAge,
        gender: petData.petGender,
        color: petData.petColor,
        pet_type: petData.petType,
        size: petData.petSize,
      };

      const dataOfBooking = {
        book_date: bookingData.days,
        start_date: bookingData.startDate,
        stop_date: bookingData.endDate,
        cus_id: bookingData.ownerID,
        room_id: bookingData.room_id,
        total: bookingData.price,
        cat_id: petData.petSize // 👈 this now holds the selected cat_id
      };


      const response = await bookingRoom(dataOfPet, dataOfBooking, Token);
      console.log(response);
      if (response?.message === "Pet created successfully") {
        setSuccessDialogOpen(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const errors = {};

    // Required fields validation
    if (!petData.petName) errors.petName = "ກະລຸນາປ້ອນຊື່ສັດລ້ຽງ";
    if (!petData.petAge) errors.petAge = "ກະລຸນາປ້ອນອາຍຸສັດລ້ຽງ";
    if (!petData.petColor) errors.petColor = "ກະລຸນາປ້ອນສີສັດລ້ຽງ";
    if (!petData.petType) errors.petType = "ກະລຸນາເລືອກປະເພດສັດລ້ຽງ";
    if (!petData.petGender) errors.petGender = "ກະລຸນາເລືອກເພດສັດລ້ຽງ";
    if (!petData.petSize) errors.petSize = "ກະລຸນາເລືອກຂະໜາດສັດລ້ຽງ";
    if (!bookingData.ownerID) errors.ownerID = "ກະລຸນາປ້ອນລະຫັດຜູ້ຈອງ";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const handleSubmitBooking = () => {
    if (validateForm()) {
      console.log("Booking submitted:", bookingData);
      console.log("Pet data:", petData);
      APIBOOKINGROOM(); // เรียกใช้ API

    }
  };

  // เมื่อผู้ใช้กด OK ใน Dialog ค่อยปิดฟอร์มและรีเซตข้อมูล
  const handleSuccessOk = () => {
    localStorage.removeItem("room_id");
    window.location.reload(); // รีโหลดหน้าเว็บ
    setSuccessDialogOpen(false); // ปิด dialog
    // clear localStorage room_id
    handleBookingClose(); // ปิดฟอร์ม + รีเซตข้อมูล
  };

  // Handling dialog close
  const handleDialogClose = (event, reason) => {
    if (reason === "backdropClick" || reason === "escapeKeyDown") return;
    setSuccessDialogOpen(false); // Close the success dialog
  };

  const priceMap = {
    S: "50.000 ກີບ",
    M: "70.000 ກີບ",
    L: "100.000 ກີບ",
  };

  const priceValueMap = {
    S: 50000,
    M: 70000,
    L: 100000,
  };

  const BOOKING_FEE = 20000; // 20,000 kip booking fee per day

  const cageImages = {
    S: "https://happyhausthailand.com/wp-content/uploads/2022/04/happyhaus-sing-cat-cage2-rz.jpg",
    M: "https://happyhausthailand.com/wp-content/uploads/2021/06/dog-cage-M-grey-1.jpg",
    L: "https://happyhausthailand.com/wp-content/uploads/2021/06/dogcage-L-grey4.jpg",
  };

  const APIGETROOMPET = async () => {
    try {
      const response = await getRoomPet();
      setCages(response);
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    APIGETROOMPET();
  }, []);

  const room = cages.map((cage, i) => {
    let size = "UNKNOWN";

    switch (parseInt(cage.price)) {
      case 50000:
        size = "S";
        break;
      case 70000:
        size = "M";
        break;
      case 100000:
        size = "L";
        break;
      default:
        console.warn(`⚠️ Unknown price for room ${cage.room_name}: ${cage.price}`);
    }

    return {
      id: cage.room_id,
      name: cage.room_name || `ກົງທີ ${i + 1}`,
      size,
      status: cage.status || "ວ່າງ",
      price: cage.price,
    };
  });


  const groupedCages = {
    S: room.filter((c) => c.size === "S"),
    M: room.filter((c) => c.size === "M"),
    L: room.filter((c) => c.size === "L"),
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!selectedCage) return 0;
    const cagePrice = priceValueMap[selectedCage.size];
    return (cagePrice + BOOKING_FEE) * bookingData.days;
    // return (cagePrice + BOOKING_FEE) * 1;
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <Box sx={{ py: 6, backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          gutterBottom
          textAlign="center"
          fontWeight="bold"
          color="#2C3E50"
        >
          ລາຍການກົງສັດລ້ຽງ
        </Typography>

        {["S", "M", "L"].map((size) => (
          <Box key={size} sx={{ mb: 6 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ mb: 1, textAlign: "center", color: "#34495E" }}
            >
              ຂະໜາດ {size}
            </Typography>
            <Typography
              variant="subtitle1"
              textAlign="center"
              sx={{ color: "#7F8C8D", mb: 2 }}
            >
              💸 ລາຄາ {priceMap[size]} / ມື້ + ຄ່າຈອງ 20.000 ກີບ / ມື້
            </Typography>
            <Divider sx={{ mb: 3, borderColor: "#BDC3C7" }} />

            <Grid container spacing={4} justifyContent="center">
              {groupedCages[size].map((cage) => {
                const isAvailable = cage.status === "ວ່າງ";
                return (
                  <Grid item xs={12} sm={6} md={4} key={cage.id}>
                    <Paper
                      elevation={6}
                      sx={{
                        p: 3,
                        minHeight: 250,
                        borderRadius: 8,
                        textAlign: "center",
                        backgroundColor: "#ffffff",
                        boxShadow: "0 12px 36px rgba(0,0,0,0.1)",
                        transition: "transform 0.3s ease-in-out",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        fontSize="1.25rem"
                        color="#2C3E50"
                      >
                        {cage.name}
                      </Typography>

                      <Stack
                        direction="row"
                        spacing={1}
                        justifyContent="center"
                        alignItems="center"
                        sx={{ my: 2 }}
                      >
                        {isAvailable ? (
                          <>
                            <CheckCircleIcon color="success" fontSize="large" />
                            <Typography
                              color="green"
                              fontWeight="bold"
                              fontSize="1.1rem"
                            >
                              {cage.status}
                            </Typography>
                          </>
                        ) : (
                          <>
                            <CancelIcon color="error" fontSize="large" />
                            <Typography
                              color="red"
                              fontWeight="bold"
                              fontSize="1.1rem"
                            >
                              {cage.status}
                            </Typography>
                          </>
                        )}
                      </Stack>

                      <Box>
                        <Button
                          variant="contained"
                          color="primary"
                          sx={{
                            mb: 1,
                            py: 1.2,
                            fontSize: "1rem",
                            backgroundColor: "#3498DB",
                            "&:hover": {
                              backgroundColor: "#2980B9",
                            },
                          }}
                          fullWidth
                          disabled={!isAvailable}
                          onClick={() => handleBookingOpen(cage)}
                        >
                          ຈອງຄິວ
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          fullWidth
                          sx={{
                            py: 1.2,
                            fontSize: "1rem",
                            borderColor: "#95A5A6",
                            color: "#95A5A6",
                            "&:hover": {
                              borderColor: "#7F8C8D",
                              color: "#7F8C8D",
                            },
                          }}
                          onClick={() => handleDetailsOpen(cage)}
                          disabled={!isAvailable}
                        >
                          ລາຍລະອຽດ
                        </Button>
                      </Box>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        ))}

        {/* Details Dialog */}
        <Dialog
          open={detailsOpen}
          onClose={handleDetailsClose}
          PaperProps={{
            sx: {
              borderRadius: 4,
              boxShadow: "0 16px 48px rgba(0,0,0,0.2)",
              backgroundColor: "#FAFAFA",
              width: "500px",
              maxWidth: "100%",
            },
          }}
        >
          <DialogTitle
            sx={{
              backgroundColor: "#3498DB",
              color: "white",
              fontWeight: "bold",
              fontSize: "1.25rem",
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
            }}
          >
            📦 {selectedCage?.name} - ລາຍລະອຽດ
          </DialogTitle>
          <DialogContent dividers sx={{ px: 0, py: 0 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "flex-start",
                gap: 1,
                p: 2,
              }}
            >
              {/* ข้อมูลรายละเอียด */}
              <Box sx={{ flex: 1, maxWidth: "55%" }}>
                <Typography gutterBottom fontSize="1.1rem">
                  <strong>📀 ຂະໜາດ:</strong> {selectedCage?.size}
                </Typography>
                <Typography gutterBottom fontSize="1.1rem">
                  <strong>📊 ສະຖານະ:</strong>{" "}
                  <span
                    style={{
                      color: selectedCage?.status === "ວ່າງ" ? "green" : "red",
                    }}
                  >
                    {selectedCage?.status}
                  </span>
                </Typography>
                <Typography gutterBottom fontSize="1.1rem">
                  <strong>💸 ລາຄາກົງ:</strong>{" "}
                  {selectedCage ? priceMap[selectedCage.size] : ""} / ມື້
                </Typography>
                <Typography gutterBottom fontSize="1.1rem">
                  <strong>🏷️ ຄ່າຈອງ:</strong> 20.000 ກີບ / ມື້
                </Typography>

                <Box sx={{ mt: 2 }}>
                  <Typography fontSize="1rem" sx={{ mb: 0.5 }}>
                    ✅ ດູແລສັດລ້ຽງຢ່າງດີ
                  </Typography>
                  <Typography fontSize="1rem" sx={{ mb: 0.5 }}>
                    ✅ ຊຳລະເງິນທີ່ເຄົາເຕີ
                  </Typography>
                  <Typography fontSize="1rem">🗓 ຈອງເລີຍ!</Typography>
                </Box>
              </Box>

              {/* รูปภาพ */}
              <Box
                sx={{
                  width: "45%",
                  maxWidth: 300,
                  borderRadius: 2,
                  overflow: "hidden",
                }}
              >
                <img
                  src={selectedCage?.size ? cageImages[selectedCage.size] : ""}
                  alt="ລາຍລະອຽດກົງ"
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                    borderRadius: 8,
                  }}
                />
              </Box>
            </Box>
          </DialogContent>

          <DialogActions
            sx={{
              px: 3,
              pb: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button
              onClick={handleDetailsClose}
              variant="outlined"
              color="error"
              sx={{
                px: 4,
                py: 1,
                fontWeight: "bold",
                borderRadius: 3,
                fontSize: "1rem",
              }}
            >
              ປິດ
            </Button>
          </DialogActions>
        </Dialog>

        {/* Booking Dialog */}
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Dialog
            open={bookingOpen}
            onClose={handleBookingClose}
            maxWidth="md"
            PaperProps={{
              sx: {
                borderRadius: 4,
                boxShadow: "0 16px 48px rgba(0,0,0,0.2)",
                backgroundColor: "#FAFAFA",
                width: "100%",
                maxWidth: "1000px", // กำหนดความกว้างสูงสุดของ Dialog
                height: "90%",
              },
            }}
          >
            <DialogTitle
              sx={{
                backgroundColor: "#27AE60",
                color: "white",
                fontWeight: "bold",
                fontSize: "1.5rem",
                borderTopLeftRadius: 16,
                borderTopRightRadius: 16,
                py: 2,
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <PetsIcon fontSize="large" /> ຈອງຄິວ {selectedCage?.name}
            </DialogTitle>
            <DialogContent dividers sx={{ p: 4 }}>
              <Grid container spacing={-1}>
                {/* ฝั่งซ้าย: วันที่จอง + ข้อมูลสัตว์เลี้ยง */}
                <Grid item xs={12} md={6}>
                  <Container maxWidth="lg" sx={{ mt: 0 }}>
                    <Box
                      display="flex"
                      gap={1}
                      flexWrap="wrap"
                      justifyContent="space-between" // Ensures elements are spread out across the space
                      alignItems="flex-start"
                    >
                      {/* ຂໍ້ມູນວັນທີ່ຈອງ */}
                      <Box sx={{ flex: 1, minWidth: 350, maxWidth: 500 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            mb: 2.5,
                            color: "#2C3E50",
                            fontWeight: "bold",
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                            borderBottom: "2px solid #3498DB",
                            pb: 1,
                          }}
                        >
                          <EventIcon color="primary" /> ຂໍ້ມູນວັນທີ່ຈອງ
                        </Typography>

                        <Stack direction="row" spacing={2} flexWrap="wrap">
                          <Box>
                            <DatePicker
                              label="ວັນທີເລີ່ມຕົ້ນ"
                              value={bookingData.startDate}
                              onChange={(date) =>
                                handleDateChange("startDate", date)
                              }
                              slotProps={{
                                textField: {
                                  size: "small",
                                  sx: {
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: 2,
                                    },
                                    maxWidth: "150px",
                                  },
                                },
                                field: { shouldRespectLeadingZeros: true },
                              }}
                              minDate={new Date()}
                              format="dd/MM/yyyy"
                            />
                          </Box>

                          <Box>
                            <DatePicker
                              label="ວັນທີສິ້ນສຸດ"
                              value={bookingData.endDate}
                              onChange={(date) =>
                                handleDateChange("endDate", date)
                              }
                              slotProps={{
                                textField: {
                                  size: "small",
                                  sx: {
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: 2,
                                    },
                                    maxWidth: "150px",
                                  },
                                },
                                field: { shouldRespectLeadingZeros: true },
                              }}
                              minDate={bookingData.startDate}
                              format="dd/MM/yyyy"
                            />
                          </Box>

                          <Box>
                            <TextField
                              label="ຈຳນວນມື້"
                              value={bookingData.days}
                              size="small"
                              InputProps={{
                                readOnly: true,
                                sx: { borderRadius: 2 },
                              }}
                              helperText="ຄຳນວນອັດຕະໂນມັດ"
                              sx={{
                                "& .MuiOutlinedInput-root": { borderRadius: 2 },
                                "& .MuiFormHelperText-root": {
                                  marginLeft: 0,
                                  fontSize: "0.7rem",
                                },
                                maxWidth: "150px",
                              }}
                            />
                          </Box>
                        </Stack>
                        {/* ຂໍ້ມູນສັດລ້ຽງ */}
                        <Box
                          sx={{ flex: 1, minWidth: 350, maxWidth: 500, mt: 4 }}
                        >
                          <Typography
                            variant="h6"
                            sx={{
                              mb: 2.5,
                              color: "#2C3E50",
                              fontWeight: "bold",
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                              borderBottom: "2px solid #3498DB",
                              pb: 1,
                            }}
                          >
                            <PetsIcon color="primary" /> ຂໍ້ມູນສັດລ້ຽງ
                          </Typography>

                          <Grid container spacing={1}>
                            {[
                              {
                                label: "ຊື່ສັດລ້ຽງ",
                                key: "petName",
                                required: true,
                              },
                              { label: "ອາຍຸ", key: "petAge", required: true },
                              { label: "ສີ", key: "petColor", required: true },
                            ].map((field) => (
                              <Grid item xs={6} key={field.key}>
                                <TextField
                                  label={field.label}
                                  value={petData[field.key] || ""}
                                  onChange={(e) =>
                                    handlePetChange(field.key, e.target.value)
                                  }
                                  variant="outlined"
                                  size="small"
                                  error={!!formErrors[field.key]}
                                  helperText={formErrors[field.key]}
                                  sx={{
                                    maxWidth: "150px",
                                    "& .MuiOutlinedInput-root": {
                                      borderRadius: 2,
                                    },
                                  }}
                                  fullWidth
                                  required={field.required}
                                />
                              </Grid>
                            ))}

                            {/* Gender */}
                            <Grid item xs={6}>
                              <FormControl
                                fullWidth
                                required
                                error={!!formErrors.petGender}
                                size="small"
                                sx={{ maxWidth: "150px" }}
                              >
                                <InputLabel>ເພດສັດລ້ຽງ</InputLabel>
                                <Select
                                  value={petData.petGender || ""}
                                  onChange={(e) =>
                                    handlePetChange("petGender", e.target.value)
                                  }
                                  label="ເພດສັດລ້ຽງ"
                                  sx={{ width: "150px" }}
                                >
                                  <MenuItem value="ຜູ້">ຜູ້</MenuItem>
                                  <MenuItem value="ແມ່">ແມ່</MenuItem>
                                </Select>
                                {formErrors.petGender && (
                                  <FormHelperText>
                                    {formErrors.petGender}
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </Grid>

                            {/* Type */}
                            <Grid item xs={6}>
                              <FormControl
                                fullWidth
                                required
                                error={!!formErrors.petType}
                                size="small"
                                sx={{ maxWidth: "150px" }}
                              >
                                <InputLabel>ປະເພດສັດລ້ຽງ</InputLabel>
                                <Select
                                  value={petData.petType || ""}
                                  onChange={(e) =>
                                    handlePetChange("petType", e.target.value)
                                  }
                                  label="ປະເພດສັດລ້ຽງ"
                                  sx={{ width: "150px" }}
                                >
                                  <MenuItem value="ໝາ">ໝາ</MenuItem>
                                  <MenuItem value="ແມວ">ແມວ</MenuItem>
                                </Select>
                                {formErrors.petType && (
                                  <FormHelperText>
                                    {formErrors.petType}
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </Grid>

                            {/* Size */}
                            <Grid item xs={6}>
                              <FormControl
                                fullWidth
                                required
                                error={!!formErrors.petSize}
                                size="small"
                                sx={{ maxWidth: "150px" }}
                              >
                                <InputLabel>ຂະໜາດສັດລ້ຽງ</InputLabel>
                                <Select
                                  value={petData.petSize || ""}
                                  onChange={(e) =>
                                    handlePetChange("petSize", e.target.value)
                                  }
                                  label="ຂະໜາດສັດລ້ຽງ"
                                  sx={{ width: "150px" }}
                                >
                                  <MenuItem value="ນ້ອຍ">ນ້ອຍ</MenuItem>
                                  <MenuItem value="ກາງ">ກາງ</MenuItem>
                                  <MenuItem value="ໃຫຍ່">ໃຫຍ່</MenuItem>
                                </Select>
                                {formErrors.petSize && (
                                  <FormHelperText>
                                    {formErrors.petSize}
                                  </FormHelperText>
                                )}
                              </FormControl>
                            </Grid>
                            <Grid container spacing={2}>
                              {/* Type */}
                              <Grid item xs={6}>
                                <FormControl
                                  fullWidth
                                  required
                                  error={!!formErrors.petSize}
                                  size="small"
                                  sx={{ maxWidth: "150px" }}
                                >
                                  <InputLabel>ປະເພດບໍລິການ</InputLabel>
                                  <Select
                                    value={petData.petSize || ""}
                                    onChange={(e) => {
                                      const selectedCatId = e.target.value;
                                      console.log("Selected cat_id:", selectedCatId); // ✅ Will now show a number like 1, 2, etc.
                                      handlePetChange("petSize", selectedCatId);
                                    }}
                                    label="ປະເພດບໍລິການ"
                                    sx={{ width: "150px" }}
                                  >
                                    {categoryreport.map((item) => (
                                      <MenuItem key={item.cat_id} value={item.cat_id}>
                                        {item.cat_name}
                                      </MenuItem>
                                    ))}
                                  </Select>

                                  {formErrors.petSize && (
                                    <FormHelperText>
                                      {formErrors.petSize}
                                    </FormHelperText>
                                  )}
                                </FormControl>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Box>
                      </Box>
                    </Box>
                  </Container>
                </Grid>

                {/* ฝั่งขวา: ลูกค้า + สรุปรายการ */}
                <Grid item xs={12} md={6}>
                  {/* ຂໍ້ມູນລູກຄ້າ */}
                  <Box sx={{ flex: 1, minWidth: 350, maxWidth: 300 }}>
                    <Typography
                      variant="h6"
                      sx={{
                        mb: 2.5,
                        color: "#2C3E50",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        borderBottom: "2px solid #3498DB",
                        paddingBottom: 1,
                      }}
                    >
                      <PaymentIcon color="primary" /> ຂໍ້ມູນລູກຄ້າ
                    </Typography>

                    <Stack spacing={3}>
                      <TextField
                        fullWidth
                        label="ລະຫັດຜູ້ຈອງ"
                        name="ownerID"
                        value={bookingData.ownerID}
                        onChange={(e) =>
                          handleBookingChange("ownerID", e.target.value)
                        }
                        InputProps={{
                          readOnly: true,
                          sx: {
                            backgroundColor: "#ECF0F1",
                            borderRadius: 2,
                            "& input": {
                              color: "#2C3E50",
                            },
                          },
                        }}
                        // required
                        error={!!formErrors.ownerID}
                        helperText={formErrors.ownerID}
                        sx={{ "& .MuiOutlinedInput-root": { borderRadius: 2 } }}
                      />
                    </Stack>

                    {/* ສະຫຼຸບຂໍ້ມູນການຈອງ */}
                    <Paper
                      elevation={4}
                      sx={{
                        mt: 4, // เพิ่มระยะห่างด้านบน
                        p: 4,
                        borderRadius: 2,
                        backgroundColor: "#f8f9fa",
                        border: "1px solid #e9ecef",
                      }}
                    >
                      <Typography
                        variant="h6"
                        fontWeight="bold"
                        color="#2C3E50"
                        sx={{ mb: 2 }}
                      >
                        ສະຫຼຸບຂໍ້ມູນການຈອງ
                      </Typography>
                      <Stack spacing={1.5}>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography>ກົງຂະໜາດ {selectedCage?.size}</Typography>
                          <Typography>
                            {selectedCage ? priceMap[selectedCage.size] : ""} ×{" "}
                            {bookingData.days} ມື້
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography>ຄ່າຈອງ</Typography>
                          <Typography>
                            20.000 ກີບ × {bookingData.days} ມື້
                          </Typography>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography fontWeight="bold">ລວມທັງໝົດ</Typography>
                          <Typography fontWeight="bold" color="#2980B9">
                            {selectedCage
                              ? formatPrice(calculateTotalPrice())
                              : "0"}{" "}
                            ກີບ
                          </Typography>
                        </Box>
                      </Stack>
                    </Paper>
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions
              sx={{ px: 3, pb: 3, pt: 2, justifyContent: "flex-end" }}
            >
              <Stack direction="row" spacing={2}>
                <Button
                  onClick={handleBookingClose}
                  variant="outlined"
                  color="error"
                  sx={{
                    px: 4,
                    py: 1,
                    fontWeight: "bold",
                    borderRadius: 3,
                    fontSize: "1rem",
                  }}
                >
                  ຍົກເລີກ
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  sx={{
                    px: 4,
                    py: 1,
                    fontWeight: "bold",
                    borderRadius: 3,
                    fontSize: "1rem",
                  }}
                  onClick={handleSubmitBooking}
                >
                  ຢືນຢັນການຈອງ
                </Button>

                {/* ✅ Success Dialog */}
                <Dialog
                  open={successDialogOpen}
                  onClose={handleDialogClose} // Pass the function directly here
                >
                  <DialogContent
                    sx={{
                      textAlign: "center",
                      py: 4,
                      px: 5,
                      backgroundColor: "#f9f3ec",
                      borderRadius: 2,
                    }}
                  >
                    <CheckCircleIcon
                      sx={{ fontSize: 60, color: "green", mb: 2 }}
                    />
                    <Typography variant="h6" fontWeight="bold" color="#5b2b0f">
                      ການຈອງສຳເລັດ
                    </Typography>
                    <Typography sx={{ mt: 1, color: "#5b2b0f" }}>
                      ການຈອງຖືກບັນທຶກແລ້ວ ກົດ OK ເພື່ອປິດໜ້າຕ່າງ
                    </Typography>
                    <Button
                      variant="contained"
                      sx={{
                        mt: 3,
                        backgroundColor: "#7D9B67",
                        fontWeight: "bold",
                        borderRadius: 2,
                        px: 5,
                        "&:hover": { backgroundColor: "#6a8858" },
                      }}
                      onClick={handleSuccessOk}
                    >
                      OK
                    </Button>
                  </DialogContent>
                </Dialog>
              </Stack>
            </DialogActions>
          </Dialog>
        </LocalizationProvider>
      </Container>
    </Box>
  );
};

export default Cages;