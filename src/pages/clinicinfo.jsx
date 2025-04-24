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
              image="https://scontent.fvte5-1.fna.fbcdn.net/v/t39.30808-6/476331814_638475425413059_1009452581605214338_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHFgwqCscdg_92V6Akokvb2jOzS1p_A9YeM7NLWn8D1h_MdspkOHjPiDGv_ocZdW6fZ1GnHCzez6-teDTcc4Na-&_nc_ohc=VEd5aCTdSFEQ7kNvwFcdRJx&_nc_oc=Adm2ywN2dDvHkgYi613a9hK709_E108Mx6jPopkt9KLfNTx5iCB4Vcun9MZluLmzPwQ&_nc_zt=23&_nc_ht=scontent.fvte5-1.fna&_nc_gid=KrVQnNTR3ROzW5OGG1IIbw&oh=00_AfGyjWRel6290sc_pVZu99aFvaza8NVh5TaY7QqyPio19Q&oe=680BC55E"
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
