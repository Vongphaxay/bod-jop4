import React, { useState } from "react";
import {
  Box, Grid, Paper, Typography, Button, Stack, Divider, DialogActions, Container, Dialog, DialogTitle, DialogContent,
  TextField, FormControl, InputLabel, Select, MenuItem
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const Cages = () => {
  const [selectedCage, setSelectedCage] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    days: "",
    startDate: "",
    endDate: "",
    petName: "",
    petType: "",
    petBreed: "",
    ownerName: ""
  });

  const handleDetailsOpen = (cage) => {
    setSelectedCage(cage);
    setDetailsOpen(true);
  };

  const handleDetailsClose = () => {
    setDetailsOpen(false);
    setSelectedCage(null);
  };

  const handleBookingOpen = (cage) => {
    setSelectedCage(cage);
    setBookingOpen(true);
    // Reset form data when opening the booking dialog
    resetBookingForm();
  };

  const handleBookingClose = () => {
    setBookingOpen(false);
    // Reset form data when closing the booking dialog
    resetBookingForm();
  };
  
  // Function to reset booking form
  const resetBookingForm = () => {
    setBookingData({
      days: "",
      startDate: "",
      endDate: "",
      petName: "",
      petType: "",
      petBreed: "",
      ownerName: ""
    });
  };

  const handleBookingChange = (field, value) => {
    setBookingData({
      ...bookingData,
      [field]: value
    });
    
    // Calculate end date based on start date and days
    if (field === 'days' && bookingData.startDate) {
      try {
        const startDate = new Date(bookingData.startDate);
        const days = parseInt(value) || 0;
        if (!isNaN(startDate.getTime())) {
          const endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + days);
          setBookingData(prev => ({
            ...prev,
            endDate: formatDate(endDate)
          }));
        }
      } catch (error) {
        console.error("Date calculation error:", error);
      }
    } else if (field === 'startDate' && bookingData.days) {
      try {
        const startDate = new Date(value);
        const days = parseInt(bookingData.days) || 0;
        if (!isNaN(startDate.getTime())) {
          const endDate = new Date(startDate);
          endDate.setDate(startDate.getDate() + days);
          setBookingData(prev => ({
            ...prev,
            endDate: formatDate(endDate)
          }));
        }
      } catch (error) {
        console.error("Date calculation error:", error);
      }
    }
  };

  // Helper function to format dates
  const formatDate = (date) => {
    if (!date) return "";
    try {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch (error) {
      console.error("Date formatting error:", error);
      return "";
    }
  };

  const handleSubmitBooking = () => {
    // Handle the booking submission logic here
    console.log("Booking submitted:", bookingData);
    // Show success message or handle the booking process
    alert("ການຈອງສຳເລັດແລ້ວ!");
    // Close dialog and reset form
    setBookingOpen(false);
    resetBookingForm();
  };

  const priceMap = {
    S: "50.000 ກີບ",
    M: "70.000 ກີບ",
    L: "100.000 ກີບ",
  };

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
              💸 ລາຄາ {priceMap[size]} / ມື້
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
          maxWidth="sm"
          fullWidth={false}
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
                  <strong>💸 ລາຄາ:</strong> {selectedCage ? priceMap[selectedCage.size] : ""} / ມື້
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
                  src={cageImages[selectedCage?.size]}
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

          <DialogActions sx={{ px: 3, pb: 3 }}>
            <Button
              onClick={handleDetailsClose}
              variant="contained"
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
        <Dialog
          open={bookingOpen}
          onClose={handleBookingClose}
          fullWidth
          maxWidth="md"
          PaperProps={{
            sx: {
              borderRadius: 4,
              boxShadow: "0 16px 48px rgba(0,0,0,0.2)",
              backgroundColor: "#FAFAFA",
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
              padding: 2
            }}
          >
            🔖 ເພີ່ມຂໍ້ມູນການຈອງຄິວ - {selectedCage?.name}
          </DialogTitle>
          <DialogContent dividers sx={{ p: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="ຈອງຈັກມື້"
                  type="number"
                  value={bookingData.days}
                  onChange={(e) => handleBookingChange('days', e.target.value)}
                  InputProps={{ inputProps: { min: 1 } }}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="ເລີ່ມວັນທີ"
                  type="date"
                  value={bookingData.startDate}
                  onChange={(e) => handleBookingChange('startDate', e.target.value)}
                  variant="outlined"
                  margin="normal"
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="ສິ້ນສຸດວັນທີ"
                  type="date"
                  value={bookingData.endDate}
                  variant="outlined"
                  margin="normal"
                  disabled
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="ຊື່ສັດລ້ຽງ"
                  value={bookingData.petName}
                  onChange={(e) => handleBookingChange('petName', e.target.value)}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel>ປະເພດສັດລ້ຽງ</InputLabel>
                  <Select
                    value={bookingData.petType}
                    onChange={(e) => handleBookingChange('petType', e.target.value)}
                    label="ປະເພດສັດລ້ຽງ"
                  >
                    <MenuItem value="ໝາ">ໝາ</MenuItem>
                    <MenuItem value="ແມວ">ແມວ</MenuItem>
                    <MenuItem value="ນົກ">ນົກ</MenuItem>
                    <MenuItem value="ອື່ນໆ">ອື່ນໆ</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="ສາຍພັນ"
                  value={bookingData.petBreed}
                  onChange={(e) => handleBookingChange('petBreed', e.target.value)}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="ຊື່ເຈົ້າຂອງ"
                  value={bookingData.ownerName}
                  onChange={(e) => handleBookingChange('ownerName', e.target.value)}
                  variant="outlined"
                  margin="normal"
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ mt: 2, p: 2, bgcolor: "#ECF0F1", borderRadius: 2 }}>
                  <Typography variant="subtitle1" fontWeight="bold" color="#2C3E50">
                    ສະຫຼຸບຂໍ້ມູນ:
                  </Typography>
                  <Typography fontSize="0.9rem" color="#7F8C8D">
                    ຂະໜາດກົງ: {selectedCage?.size} | ລາຄາ: {selectedCage ? priceMap[selectedCage.size] : ""} / ມື້
                  </Typography>
                  {bookingData.days && (
                    <Typography fontSize="0.9rem" color="#7F8C8D">
                      ຄ່າໃຊ້ຈ່າຍທັງໝົດ: {
                        selectedCage ? 
                        parseInt(bookingData.days) * 
                        parseInt(priceMap[selectedCage.size].replace(/[^\d]/g,'')) + 
                        " ກີບ" : ""
                      }
                    </Typography>
                  )}
                </Box>
              </Grid>
            </Grid>
          </DialogContent>

          <DialogActions sx={{ px: 3, py: 2, justifyContent: "space-between" }}>
            <Button
              onClick={handleBookingClose}
              variant="outlined"
              color="error"
              sx={{
                px: 3,
                py: 1,
                borderRadius: 2,
              }}
            >
              ຍົກເລີກ
            </Button>
            <Button
              onClick={handleSubmitBooking}
              variant="contained"
              color="primary"
              sx={{
                px: 4,
                py: 1,
                fontWeight: "bold",
                borderRadius: 2,
                bgcolor: "#27AE60",
                "&:hover": {
                  bgcolor: "#219653",
                }
              }}
            >
              ຢືນຢັນການຈອງ
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Cages;