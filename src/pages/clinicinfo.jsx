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
              image="https://scontent.fvte6-1.fna.fbcdn.net/v/t39.30808-6/472231485_615275431066392_5159280437899117111_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=Kq2UAcR6nkIQ7kNvwGBm7Os&_nc_oc=Adn8NqVF0-a3FfYkpw67Mhetw7Oj2jb_o2o3I1nEP4dQ1g-0gpXci3qu9o1rc_aAJn0&_nc_zt=23&_nc_ht=scontent.fvte6-1.fna&_nc_gid=Pxf6zDVTefIOsv6O95QDEQ&oh=00_AfK9RceKxhyXRZg4HFoaNVrlV9hwxcD2ae90gnuqILnbSw&oe=682B3AEA"
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
