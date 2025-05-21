import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { useNavigate } from 'react-router-dom';



const clinicData = [
  {
    name: 'ຮັບຝາກສັດລ້ຽງ',
    description: "ຝາກໄວ້ຢ່າງອົບອຸ່ນ ເຫມາະສົມ ກັບທຸກພັນ",
    image: "https://mpics-cdn.mgronline.com/pics/Images/565000005041501.JPEG",
  },
  {
    name: 'ອາບນ້ຳສັດລ້ຽງ',
    description: "ໃຫ້ສັດລ້ຽງສະອາດ ແລະ ມີຄວາມສຸຂະພາບດີ",
    image: "https://www.chula.ac.th/wp-content/uploads/2021/10/shutterstock_1569883195-1024x683.jpg",
  },
  {
    name: 'ຕັດຂົນສັດລ້ຽງ',
    description: "ຄວາມຊ່ຽວຊານ ດູແລດ້ວຍຄວາມເປັນມືອາຊີບ",
    image: "https://trianacode.org/wp-content/uploads/2023/07/female-is-grooming-trimming-pomeranian-spitz-salon.jpg",
  },
  {
    name: 'ປິ່ນປົວສັດລ້ຽງ',
    description: "ການປິ່ນປົວດ້ວຍຄວາມເປັນມືອາຊີບ ແລະ ອຸປະກອນທັນສະໄໝ",
    image: "https://raksud.com/wp-content/uploads/veterinarian-taking-care-pet-dog1-1024x683.jpg",
  },
];

const ClinicCarousel = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const navigate = useNavigate(); // ✅ นำ useNavigate มาใช้ตรงนี้เลย

  const handleOpenDialog = (clinic) => {
    setSelectedClinic(clinic);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedClinic(null);
  };

  const handleClick = () => {
    navigate('/Cages'); // ✅ ไปที่หน้า /Cages
  };

  return (
    <Box sx={{ p: 4, bgcolor: '#f4f4f4' }}>
      <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
        ບໍລິການຂອງຄລິນິກ
      </Typography>
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          gap: 3,
          py: 3,
          justifyContent: 'center',
          px: 2,
        }}
      >
        {clinicData.map((clinic, index) => (
          <Card
            key={index}
            sx={{
              minWidth: 270,
              maxWidth: 270,
              flexShrink: 0,
              borderRadius: 4,
              boxShadow: 4,
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: 8,
              },
            }}
          >
            <CardMedia
              sx={{
                height: 140,
                backgroundImage: 'linear-gradient(to top right, #e0f7fa, #80deea)',
              }}
              image={clinic.image}
              title={clinic.name}
            />
            <CardContent sx={{ px: 2.5, py: 2 }}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                {clinic.name}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1.5 }}>
                {clinic.description}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.5 }}>
                {/* <Rating value={clinic.rating} precision={0.1} readOnly /> */}
                {/* <Typography sx={{ ml: 1, fontWeight: 500 }}>{clinic.rating}</Typography> */}
              </Box>
              <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                <Button variant="contained" color="primary" size="small" fullWidth onClick={handleClick}>
                  ຈອງຄິວ
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  size="small"
                  fullWidth
                  onClick={() => handleOpenDialog(clinic)}
                >
                  ລາຍລະອຽດ
                </Button>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Popup Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
  {selectedClinic && (
    <>
      <Box
        sx={{
          height: 200,
          backgroundImage: `url(${selectedClinic.image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      />
      <DialogTitle
        sx={{
          fontWeight: 'bold',
          fontSize: '1.5rem',
          bgcolor: '#f0f0f0',
          mt: -2,
        }}
      >
        {selectedClinic.name}
      </DialogTitle>
      <DialogContent
  dividers
  sx={{
    bgcolor: '#fafafa',
    pt: 2,
    pb: 3,
  }}
>
  <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
  <Typography align="center" fontWeight="bold">ລາຍລະອຽດການຈອງຄິວ</Typography>
  </Typography>

  <Box sx={{ bgcolor: '#5D3B27', color: 'white', borderRadius: 2, p: 2, mb: 2 }}>
    <Typography align="center" fontWeight="bold">ຄ່າຈອງ 20,000 ກີບ/ມື້</Typography>
  </Box>

  <Box sx={{ bgcolor: '#5D3B27', color: 'white', borderRadius: 2, p: 2, mb: 2 }}>
    <Typography>ກົງສັດ Size S - 50,000 ກີບ/ມື້</Typography>
    <Typography>ກົງສັດ Size M - 70,000 ກີບ/ມື້</Typography>
    <Typography>ກົງສັດ Size L - 100,000 ກີບ/ມື້</Typography>
  </Box>

  <Box
    sx={{
      bgcolor: '#5D3B27',
      color: 'white',
      borderRadius: 2,
      p: 2,
      fontSize: 14,
      lineHeight: 1.8,
    }}
  >
    <Typography>1. ກວດສອບຂະໜາດສັດລ້ຽງຂອງທ່ານກ່ອນທີ່ຈະເລືອກກົງ</Typography>
    <Typography>2. ເລືອກ ແລະ ກວດສອບວັນທີ ທີ່ຈະຈອງໃຫ້ຖືກຕ້ອງກ່ອນກົດຢຶນຢັນ</Typography>
    <Typography>3. ເມື່ອຮອດມື້ທີ່ເລີ່ມຝາກທ່ານຕ້ອງນຳສັດລ້ຽງມາເອງ</Typography>

  </Box>
</DialogContent>

      <DialogActions sx={{ bgcolor: '#f9f9f9', px: 3, py: 2 }}>
        <Button onClick={handleCloseDialog} variant="contained" color="primary">
          ປິດ
        </Button>
      </DialogActions>
    </>
  )}
</Dialog>


    </Box>
  );
};

export default ClinicCarousel;
