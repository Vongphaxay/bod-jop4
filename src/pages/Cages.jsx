import React, { useState } from "react";
import {
  Box, Grid, Paper, Typography, Button, Stack, Divider, DialogActions, Container, Dialog, DialogTitle, DialogContent,
  TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import PetsIcon from "@mui/icons-material/Pets";
import EventIcon from "@mui/icons-material/Event";
import PaymentIcon from "@mui/icons-material/Payment";

const Cages = () => {
  const [selectedCage, setSelectedCage] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    date: "",
    time: "",
  });
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [bookingData, setBookingData] = useState({
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
    days: 1,
    petType: "",
    petName: "",
    petAge: "",
    petColor: "",
    petGender: "",
    petSize: "",
    ownerName: "",
    price: 0, // ราคา
  });
  const [formErrors, setFormErrors] = useState({});

  const handleDetailsOpen = (cage) => {
    setSelectedCage(cage);
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
  };

  const handleBookingOpen = (cage) => {
    setSelectedCage(cage);
    setBookingOpen(true);
    setFormErrors({});  // ลบ error เมื่อเปิดฟอร์ม
  };

  // ฟังก์ชันล้างข้อมูลทั้งหมด
  const resetBookingData = () => {
    setFormData({
      name: "",
      date: "",
      time: "",
    });

    setBookingData({
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 1)),
      days: 1,
      petType: "",
      petName: "",
      petAge: "",
      petColor: "",
      petGender: "",
      petSize: "",
      ownerName: "",
      phone: "",
      price: 0,  // รีเซตราคากลับเป็น 0
    });

    setSelectedOptions([]);  // ลบตัวเลือกที่เลือกไว้
    setFormErrors({});  // ลบข้อผิดพลาด
  };

  // ฟังก์ชันปิด booking dialog และล้างข้อมูล
  const handleBookingClose = () => {
    resetBookingData();  // ล้างข้อมูลทั้งหมดก่อนปิด dialog
    setBookingOpen(false);  // ปิด dialog
  };


  const calculateDays = (start, end) => {
    const difference = end.getTime() - start.getTime();
    return Math.ceil(difference / (1000 * 3600 * 24));
  };

  const handleDateChange = (type, date) => {
    setBookingData(prev => {
      const newData = { ...prev, [type]: date };
      // Recalculate days when dates change
      if (type === 'startDate' || type === 'endDate') {
        newData.days = calculateDays(
          type === 'startDate' ? date : prev.startDate,
          type === 'endDate' ? date : prev.endDate
        );
      }
      return newData;
    });
  };

  // Handle changes for all booking form fields
  const handleBookingChange = (field, value) => {
    setBookingData(prev => ({ ...prev, [field]: value }));

    // Clear error for this field when value changes
    if (formErrors[field]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  // Validate form before submission
  const validateForm = () => {
    const errors = {};

    // Required fields validation
    if (!bookingData.petName) errors.petName = "ກະລຸນາປ້ອນຊື່ສັດລ້ຽງ";
    if (!bookingData.petType) errors.petType = "ກະລຸນາເລືອກປະເພດສັດລ້ຽງ";
    if (!bookingData.petGender) errors.petGender = "ກະລຸນາເລືອກເພດສັດລ້ຽງ";
    if (!bookingData.petSize) errors.petSize = "ກະລຸນາເລືອກຂະໜາດສັດລ້ຽງ";
    if (!bookingData.ownerName) errors.ownerName = "ກະລຸນາປ້ອນລະຫັດຜູ້ຈອງ";
    if (!bookingData.petColor) errors.petColor = "ກະລຸນາປ້ອນສີສັດລ້ຽງ";
    if (!bookingData.petAge) errors.petAge = "ກະລຸນາປ້ອນອາຍຸສັດລ້ຽງ";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const [successDialogOpen, setSuccessDialogOpen] = useState(false);

  const handleSubmitBooking = () => {
    if (validateForm()) {
      console.log("Booking submitted:", bookingData);
      setSuccessDialogOpen(true); // ✅ แค่เปิด Dialog ก่อน
    }
  };
  
  // เมื่อผู้ใช้กด OK ใน Dialog ค่อยปิดฟอร์มและรีเซตข้อมูล
  const handleSuccessOk = () => {
    setSuccessDialogOpen(false); // ปิด dialog
    handleBookingClose();        // ปิดฟอร์ม + รีเซตข้อมูล
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

  const cages = Array.from({ length: 12 }, (_, i) => {
    const size = i < 4 ? "S" : i < 8 ? "M" : "L";
    return {
      id: i + 1,
      name: `ກົງທີ ${i + 1}`,
      size,
      status: i % 3 === 0 ? "ບໍ່ວ່າງ" : "ວ່າງ",
    };
  });

  const groupedCages = {
    S: cages.filter((c) => c.size === "S"),
    M: cages.filter((c) => c.size === "M"),
    L: cages.filter((c) => c.size === "L"),
  };

  // Calculate total price
  const calculateTotalPrice = () => {
    if (!selectedCage) return 0;
    const cagePrice = priceValueMap[selectedCage.size];
    return (cagePrice + BOOKING_FEE) * bookingData.days;
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <Box sx={{ py: 6, backgroundColor: "#f0f4f8", minHeight: "100vh" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" gutterBottom textAlign="center" fontWeight="bold" color="#2C3E50">
          ລາຍການກົງສັດລ້ຽງ
        </Typography>

        {["S", "M", "L"].map((size) => (
          <Box key={size} sx={{ mb: 6 }}>
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 1, textAlign: "center", color: "#34495E" }}>
              ຂະໜາດ {size}
            </Typography>
            <Typography variant="subtitle1" textAlign="center" sx={{ color: "#7F8C8D", mb: 2 }}>
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
                      <Typography variant="h6" fontWeight="bold" fontSize="1.25rem" color="#2C3E50">
                        {cage.name}
                      </Typography>

                      <Stack direction="row" spacing={1} justifyContent="center" alignItems="center" sx={{ my: 2 }}>
                        {isAvailable ? (
                          <>
                            <CheckCircleIcon color="success" fontSize="large" />
                            <Typography color="green" fontWeight="bold" fontSize="1.1rem">
                              {cage.status}
                            </Typography>
                          </>
                        ) : (
                          <>
                            <CancelIcon color="error" fontSize="large" />
                            <Typography color="red" fontWeight="bold" fontSize="1.1rem">
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
                  <span style={{ color: selectedCage?.status === "ວ່າງ" ? "green" : "red" }}>
                    {selectedCage?.status}
                  </span>
                </Typography>
                <Typography gutterBottom fontSize="1.1rem">
                  <strong>💸 ລາຄາກົງ:</strong> {selectedCage ? priceMap[selectedCage.size] : ""} / ມື້
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
                  <Typography fontSize="1rem">
                    🗓 ຈອງເລີຍ!
                  </Typography>
                </Box>
              </Box>

              {/* รูปภาพ */}
              <Box sx={{ width: "45%", maxWidth: 300, borderRadius: 2, overflow: "hidden" }}>
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

          <DialogActions sx={{ px: 3, pb: 3, display: 'flex', justifyContent: 'space-between' }}>
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
                width: '100%',
                maxWidth: '1000px', // กำหนดความกว้างสูงสุดของ Dialog
                height: '90%',
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
                display: 'flex',
                alignItems: 'center',
                gap: 1
              }}
            >
              <PetsIcon fontSize="large" /> ຈອງຄິວ {selectedCage?.name}
            </DialogTitle>
            <DialogContent dividers sx={{ p: 6 }}>
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
                              onChange={(date) => handleDateChange("startDate", date)}
                              slotProps={{
                                textField: {
                                  size: "small",
                                  sx: {
                                    '& .MuiOutlinedInput-root': { borderRadius: 2 },
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
                              onChange={(date) => handleDateChange("endDate", date)}
                              slotProps={{
                                textField: {
                                  size: "small",
                                  sx: {
                                    '& .MuiOutlinedInput-root': { borderRadius: 2 },
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
                                '& .MuiOutlinedInput-root': { borderRadius: 2 },
                                '& .MuiFormHelperText-root': {
                                  marginLeft: 0,
                                  fontSize: "0.7rem",
                                },
                                maxWidth: "150px",
                              }}
                            />
                          </Box>
                        </Stack>
                        {/* ຂໍ້ມູນສັດລ້ຽງ */}
                        <Box sx={{ flex: 1, minWidth: 350, maxWidth: 500, mt: 5 }}>
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

                          <Grid container spacing={2}>
                            {[{ label: "ຊື່ສັດລ້ຽງ", key: "petName", required: true },
                            { label: "ອາຍຸ", key: "petAge", required: true },
                            { label: "ສີ", key: "petColor", required: true },]
                              .map((field) => (
                                <Grid item xs={6} key={field.key}>
                                  <TextField
                                    label={field.label}
                                    value={bookingData[field.key] || ""}
                                    onChange={(e) => handleBookingChange(field.key, e.target.value)}
                                    variant="outlined"
                                    size="small"
                                    error={!!formErrors[field.key]}
                                    helperText={formErrors[field.key]}
                                    sx={{
                                      maxWidth: "150px",
                                      '& .MuiOutlinedInput-root': { borderRadius: 2 },
                                    }}
                                    fullWidth
                                    required={field.required}
                                  />
                                </Grid>
                              ))}

                            {/* Gender */}
                            <Grid item xs={6}>
                              <FormControl fullWidth required error={!!formErrors.petGender} size="small" sx={{ maxWidth: "150px" }}>
                                <InputLabel>ເພດສັດລ້ຽງ</InputLabel>
                                <Select
                                  value={bookingData.petGender || ""}
                                  onChange={(e) => handleBookingChange("petGender", e.target.value)}
                                  label="ເພດສັດລ້ຽງ"
                                  sx={{ width: "150px" }}
                                >
                                  <MenuItem value="ຜູ້">ຜູ້</MenuItem>
                                  <MenuItem value="ແມ່">ແມ່</MenuItem>
                                </Select>
                                {formErrors.petGender && <FormHelperText>{formErrors.petGender}</FormHelperText>}
                              </FormControl>
                            </Grid>

                            {/* Type */}
                            <Grid item xs={6}>
                              <FormControl fullWidth required error={!!formErrors.petType} size="small" sx={{ maxWidth: "150px" }}>
                                <InputLabel>ປະເພດສັດລ້ຽງ</InputLabel>
                                <Select
                                  value={bookingData.petType || ""}
                                  onChange={(e) => handleBookingChange("petType", e.target.value)}
                                  label="ປະເພດສັດລ້ຽງ"
                                  sx={{ width: "150px" }}
                                >
                                  <MenuItem value="ໝາ">ໝາ</MenuItem>
                                  <MenuItem value="ແມວ">ແມວ</MenuItem>
                                </Select>
                                {formErrors.petType && <FormHelperText>{formErrors.petType}</FormHelperText>}
                              </FormControl>
                            </Grid>

                            {/* Size */}
                            <Grid item xs={6}>
                              <FormControl fullWidth required error={!!formErrors.petSize} size="small" sx={{ maxWidth: "150px" }}>
                                <InputLabel>ຂະໜາດສັດລ້ຽງ</InputLabel>
                                <Select
                                  value={bookingData.petSize || ""}
                                  onChange={(e) => handleBookingChange("petSize", e.target.value)}
                                  label="ຂະໜາດສັດລ້ຽງ"
                                  sx={{ width: "150px" }}
                                >
                                  <MenuItem value="ນ້ອຍ">ນ້ອຍ</MenuItem>
                                  <MenuItem value="ກາງ">ກາງ</MenuItem>
                                  <MenuItem value="ໃຫຍ່">ໃຫຍ່</MenuItem>
                                </Select>
                                {formErrors.petSize && <FormHelperText>{formErrors.petSize}</FormHelperText>}
                              </FormControl>
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
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        borderBottom: '2px solid #3498DB',
                        paddingBottom: 1,
                      }}
                    >
                      <PaymentIcon color="primary" /> ຂໍ້ມູນລູກຄ້າ
                    </Typography>

                    <Stack spacing={3}>
                      <TextField
                        fullWidth
                        label="ລະຫັດຜູ້ຈອງ"
                        name="ownerName"
                        value={bookingData.ownerName}
                        onChange={(e) => handleBookingChange('ownerName', e.target.value)}
                        required
                        error={!!formErrors.ownerName}
                        helperText={formErrors.ownerName}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
                        border: "1px solid #e9ecef"
                      }}
                    >
                      <Typography variant="h6" fontWeight="bold" color="#2C3E50" sx={{ mb: 2 }}>
                        ສະຫຼຸບຂໍ້ມູນການຈອງ
                      </Typography>
                      <Stack spacing={1.5}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography>ກົງຂະໜາດ {selectedCage?.size}</Typography>
                          <Typography>
                            {selectedCage ? priceMap[selectedCage.size] : ""} × {bookingData.days} ມື້
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography>ຄ່າຈອງ</Typography>
                          <Typography>20.000 ກີບ × {bookingData.days} ມື້</Typography>
                        </Box>
                        <Divider sx={{ my: 1 }} />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography fontWeight="bold">ລວມທັງໝົດ</Typography>
                          <Typography fontWeight="bold" color="#2980B9">
                            {selectedCage ? formatPrice(calculateTotalPrice()) : "0"} ກີບ
                          </Typography>
                        </Box>
                      </Stack>
                    </Paper>
                  </Box>

                </Grid>
              </Grid>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 3, pt: 2, justifyContent: 'flex-end' }}>
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
                    <CheckCircleIcon sx={{ fontSize: 60, color: "green", mb: 2 }} />
                    <Typography variant="h6" fontWeight="bold" color="#5b2b0f">
                      ການຈອງສຳເລັດ
                    </Typography>
                    <Typography sx={{ mt: 1, color: "#5b2b0f" }}>
                      ການຈອງຖືກບັນທຶກແລ້ວ ກົດ OK ເພື່ອກັບໄປໂປຣໄຟລ໌
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