import React, { useState } from "react";
import {
  Box, Grid, Paper, Typography, Button, Stack, Divider, DialogActions, Container, Dialog, DialogTitle, DialogContent
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

const Cages = () => {
  const [selectedCage, setSelectedCage] = useState(null);
  const [open, setOpen] = useState(false);

  const handleOpen = (cage) => {
    setSelectedCage(cage);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCage(null);
  };

  const priceMap = {
    S: "50.000 ກີບ",
    M: "70.000 ກີບ",
    L: "100.000 ກີບ",
  };

  const cageImages = {
    S: "https://happyhausthailand.com/wp-content/uploads/2022/04/happyhaus-sing-cat-cage2-rz.jpg",  // เปลี่ยนเป็น URL ของรูปขนาด S
    M: "https://happyhausthailand.com/wp-content/uploads/2021/06/dog-cage-M-grey-1.jpg",  // เปลี่ยนเป็น URL ของรูปขนาด M
    L: "https://happyhausthailand.com/wp-content/uploads/2021/06/dogcage-L-grey4.jpg",  // เปลี่ยนเป็น URL ของรูปขนาด L
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
                          onClick={() => handleOpen(cage)}
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

<Dialog
  open={open}
  onClose={handleClose}
  maxWidth="sm" // เปลี่ยนจาก md → sm เพื่อลดขนาด
  fullWidth={false} // ปิด fullWidth เพื่อไม่ให้กว้างสุด
  PaperProps={{
    sx: {
      borderRadius: 4,
      boxShadow: "0 16px 48px rgba(0,0,0,0.2)",
      backgroundColor: "#FAFAFA",
      width: "500px", // กำหนดความกว้างแบบกำหนดเองได้ เช่น 500px
      maxWidth: "100%", // ป้องกันล้นหน้าจอ
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
                gap: 1, // ลดช่องว่างให้ใกล้ขึ้น
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
              onClick={handleClose}
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
      </Container>
    </Box>
  );
};


export default Cages;
