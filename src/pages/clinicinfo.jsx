// src/ClinicInfo.js
import React from "react";
import { Box, Typography, Grid, Card, CardMedia } from "@mui/material";

const ClinicInfo = () => {
  return (
    <Box sx={{ mt: 0, width: "100%", bgcolor: "#F5F2EA", p: 6, borderRadius: 3 }}>
      <Typography variant="h4" align="center" sx={{ fontWeight: "bold", color: "#552619", mb: 3 }}>
        ຂໍ້ມູນຄລີນິກ
      </Typography>
      <Grid container spacing={4} alignItems="center" justifyContent="center">
        {/* รูปภาพแทนที่แผนที่ */}
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 2, boxShadow: 3, overflow: "hidden", maxWidth: 400 }}>
            <CardMedia
              component="img"
              image="/catss.jpg"
              alt="Clinic Location"
              sx={{ width: "100%", height: "350px", objectFit: "cover" }} 
            />
          </Card>
        </Grid>

        {/* ข้อมูลคลินิก */}
        <Grid item xs={12} md={6}>
          <Box>
            <Typography variant="h4" sx={{ fontWeight: "bold", color: "#552619" }}>
              DR. P VETERINARY
            </Typography>
            <Typography sx={{ color: "#552619", mt: 2 }}>
              ຄລິນິກ DR. P VETERINARY
              <br />
              ບໍລິການຮັບຝາກສັດລ້ຽງ, ຕັດຂົນສັດລ້ຽງ, ອາບນ້ຳສັດລ້ຽງ ແລະ ປິ່ນປົວສັດລ້ຽງ
            </Typography>
            <Typography sx={{ color: "#552619", mt: 2 }}>
              ທີ່ຢູ່: ຄລິນິກ DR. P VETERINARY
              <br />
              ຕັ້ງຢູ່ບ້ານ ດົງປ່າແຫຼບ, ຮ່ອມ 13 (ໜ້າໂຮງຮຽນຫວຽນຢູ)
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ClinicInfo;
