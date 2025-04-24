import React from "react";
import {
  Box, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions
} from "@mui/material";

const CageDetailDialog = ({ open, handleClose, selectedCage, priceMap, cageImages }) => {
  if (!selectedCage) return null;

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
          {/* ຂໍ້ມູນລາຍລະອຽດ */}
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
              <strong>💸 ລາຄາ:</strong> {priceMap[selectedCage.size]} / ມື້
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

          {/* ຮູບພາບ */}
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
  );
};

export default CageDetailDialog;