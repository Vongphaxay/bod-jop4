import React from 'react';
import {
  Box,
  Typography,
  Container,
  Grid,
  Link,
} from '@mui/material';
import { Email, Phone, LocationOn, Facebook, WhatsApp } from '@mui/icons-material';

const Footer = () => {
  return (
    <Box sx={{ bgcolor: "#E8DCC5", py: 4, mt: 5, textAlign: "center" }}>
      <Container>
        <Typography variant="h6" fontWeight="bold">
          DR. P VETERINARY
        </Typography>
        <Typography sx={{ mt: 1, mb: 2 }}>
          ຄລີນິກປິ່ນປົວສັດ ແລະ ບໍລິການກ່ຽວກັບສັດ
        </Typography>

        <Grid container spacing={2} alignItems="flex-start" justifyContent="space-between">
          {/* Contact Info */}
          <Grid item xs={12} md={3} sx={{ textAlign: "left" }}>
            <Typography variant="subtitle1" fontWeight="bold">Contact Info</Typography>
            <Typography><Email fontSize="small" /> drpveterinary@gmail.com</Typography>
            <Typography><Phone fontSize="small" /> +856 20 55667788</Typography>
            <Typography><LocationOn fontSize="small" /> ບ້ານ ດົງປ່າແຫຼບ, ເມືອງ ຈັນທະບູລີ, ແຂວງ ນະຄອນຫຼວງວຽງຈັນ</Typography>
          </Grid>

          {/* Social Media */}
          <Grid item xs={12} md={3} sx={{ textAlign: "left" }}>
            <Typography variant="subtitle1" fontWeight="bold">Socialize</Typography>
            <Box display="flex" justifyContent="flex-start" gap={2}>
              <Link href="https://www.facebook.com/Dr.PVeterinaryClinic" target="_blank" rel="noopener noreferrer">
                <Facebook fontSize="large" sx={{ color: "#1877F2" }} />
              </Link>
              <Link href="https://wa.me/" target="_blank" rel="noopener noreferrer">
                <WhatsApp fontSize="large" sx={{ color: "#25D366" }} />
              </Link>
            </Box>
          </Grid>

          {/* Map Section */}
          <Grid item xs={12} md={5}>
            <Typography variant="subtitle1" fontWeight="bold">Location</Typography>
            <Box
              sx={{
                width: "100%",
                height: "200px",
                borderRadius: "8px",
                overflow: "hidden",
                mt: 1
              }}
            >
              <iframe
                title="DR. P Veterinary Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3794.736018810999!2d102.60733117494958!3d17.991014583002826!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x312469806eba2a67%3A0x34cb01f07a177051!2zRHIuIFAgdmV0ZXJpbmFyeSBjbGluaWMgLSDguoTguqXgurXgupngurTguoHgupvgurTgu4jgupngupvgurvguqfguqrgurHgupTguqXgu4ngur3guocg4LqU4Lqx4Lqt4LqB4LuA4LqV4Lq14Lqe4Lq1!5e0!3m2!1sth!2sla!4v1743059818390!5m2!1sth!2sla"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </Box>
          </Grid>
        </Grid>

        <Typography sx={{ mt: 3, fontSize: "12px" }}>
          © 2025 DR. P VETERINARY. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
