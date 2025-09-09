import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    TextField,
    Button,
    Avatar,
    Divider,
    Paper,
    IconButton,
    InputAdornment,
    Chip,
    Alert,
    Snackbar,
    CardMedia
} from '@mui/material';
import {
    Phone,
    Email,
    LocationOn,
    Send,
    Person,
    Work,
    AccessTime,
    WhatsApp,
    Facebook,
    Instagram,
    Message,
    CalendarToday,
    Pets
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const ContactPage = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
        setOpenSnackbar(true);
        // Reset form
        setFormData({
            name: '',
            email: '',
            phone: '',
            subject: '',
            message: ''
        });
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleBookingClick = () => {
        navigate('/cages');
    };

    // Sample staff data
    const staffMembers = [
        {
            id: 1,
            name: 'ທ.ນ. ສົມສັກ ພະຍອມ',
            position: 'ທ່ານໝໍຫຼັກ',
            department: 'ຄະແນະວິຊາສັດຕະວະແພດ',
            phone: '020 55555555',
            email: 'doctor.somsak@drp.com',
            avatar: '/api/placeholder/80/80',
            available: true,
            specialization: 'ສັດໃຫຍ່, ການຜ່າຕັດ'
        },
        {
            id: 2,
            name: 'ນ.ສ. ນາງດວງ ວິລະຊັນ',
            position: 'ສະພາບແບ ແລະ ຕັດແຕ່ງຂົນ',
            department: 'ຄະແນະບໍລິການສວຍງາມ',
            phone: '020 66666666',
            email: 'groomer.duang@drp.com',
            avatar: '/api/placeholder/80/80',
            available: true,
            specialization: 'ຕັດແຕ່ງຂົນທຸກປະເພດ'
        },
        {
            id: 3,
            name: 'ທ.ນ. ວິທີ ໃສສະອາດ',
            position: 'ທ່ານໝໍຊ່ວຍ',
            department: 'ຄະແນະວິຊາສັດຕະວະແພດ',
            phone: '020 77777777',
            email: 'doctor.vithi@drp.com',
            avatar: '/api/placeholder/80/80',
            available: false,
            specialization: 'ສັດນ້ອຍ, ການວັກຊີນ'
        }
    ];

    const clinicInfo = {
        name: 'ຄລີນິກສັດຕະວະແພດ DR. P',
        address: 'ບ້ານ ດົງປະລານ, ເມືອງ ສີສັດຕະນາກ, ນະຄອນຫຼວງວຽງຈັນ',
        phone: '021 123456',
        email: 'contact@drp-veterinary.com',
        website: 'www.drp-veterinary.com',
        hours: {
            weekdays: '08:00 - 18:00',
            weekend: '09:00 - 16:00'
        }
    };

    return (
        <Box sx={{ bgcolor: '#f5f7fa', minHeight: '100vh', py: 4 }}>
            <Container maxWidth="lg">
                {/* Header Section */}
                <Box sx={{ textAlign: 'center', mb: 6 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 2 }}>
                        <Avatar
                            sx={{
                                bgcolor: theme.palette.primary.main,
                                width: 60,
                                height: 60,
                                mr: 2
                            }}
                        >
                            <Pets fontSize="large" />
                        </Avatar>
                        <Typography
                            variant="h3"
                            fontWeight="bold"
                            color="primary"
                            sx={{ textShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                        >
                            ຕິດຕໍ່ຫາພະນັກງານ
                        </Typography>
                    </Box>
                    <Typography variant="h6" color="text.secondary" sx={{ maxWidth: '600px', mx: 'auto' }}>
                        ພວກເຮົາພ້ອມໃຫ້ບໍລິການ ແລະ ຕອບຄຳຖາມຂອງທ່ານຕະຫຼອດເວລາ
                    </Typography>
                </Box>

                <Grid container spacing={4}>
                    {/* Contact Information */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ boxShadow: 3, borderRadius: 3, height: '100%' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" fontWeight="bold" color="primary" sx={{ mb: 3 }}>
                                    ຂໍ້ມູນຕິດຕໍ່
                                </Typography>
                                
                                <Box sx={{ mb: 3 }}>
                                    <Typography variant="subtitle1" fontWeight="bold" sx={{ mb: 1 }}>
                                        {clinicInfo.name}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                                        <LocationOn sx={{ color: 'text.secondary', mr: 1, mt: 0.5 }} />
                                        <Typography variant="body2" color="text.secondary">
                                            {clinicInfo.address}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                        <Phone sx={{ color: 'text.secondary', mr: 1 }} />
                                        <Typography variant="body2">
                                            {clinicInfo.phone}
                                        </Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Email sx={{ color: 'text.secondary', mr: 1 }} />
                                        <Typography variant="body2">
                                            {clinicInfo.email}
                                        </Typography>
                                    </Box>
                                </Box>

                                <Divider sx={{ my: 2 }} />

                                <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1, display: 'flex', alignItems: 'center' }}>
                                    <AccessTime sx={{ mr: 1, fontSize: 20 }} />
                                    ເວລາເຮັດວຽກ
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 0.5 }}>
                                    ຈັນ - ສຸກ: {clinicInfo.hours.weekdays}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 2 }}>
                                    ເສົາ - ອາທິດ: {clinicInfo.hours.weekend}
                                </Typography>

                                <Divider sx={{ my: 2 }} />

                                <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 2 }}>
                                    ຕິດຕາມພວກເຮົາ
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1 }}>
                                    <IconButton sx={{ bgcolor: '#25D366', color: 'white', '&:hover': { bgcolor: '#20ba5a' } }}>
                                        <WhatsApp />
                                    </IconButton>
                                    <IconButton sx={{ bgcolor: '#1877F2', color: 'white', '&:hover': { bgcolor: '#166fe5' } }}>
                                        <Facebook />
                                    </IconButton>
                                    <IconButton sx={{ bgcolor: '#E4405F', color: 'white', '&:hover': { bgcolor: '#d73550' } }}>
                                        <Instagram />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Clinic Info Card */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ boxShadow: 3, borderRadius: 3, bgcolor: "#F5F2EA", height: '100%' }}>
                            <CardContent sx={{ p: 3 }}>
                                <Typography variant="h6" fontWeight="bold" sx={{ color: "#552619", mb: 3, textAlign: 'center' }}>
                                    ຂໍ້ມູນຄລີນິກ
                                </Typography>
                                
                                {/* รูปภาพแทนที่แผนที่ */}
                                <Card sx={{ borderRadius: 2, boxShadow: 3, overflow: "hidden", mb: 3 }}>
                                    <CardMedia
                                        component="img"
                                        image="/patu.jpg"
                                        alt="Clinic Location"
                                        sx={{ width: "100%", height: "150px", objectFit: "cover" }} 
                                    />
                                </Card>

                                {/* ข้อมูลคลินิก */}
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: "bold", color: "#552619", mb: 1 }}>
                                        DR. P VETERINARY
                                    </Typography>
                                    <Typography sx={{ color: "#552619", mb: 2, fontSize: '0.9rem' }}>
                                        ຄລິນິກ DR. P VETERINARY
                                        <br />
                                        ບໍລິການຮັບຝາກສັດລ້ຽງ, ຕັດຂົນສັດລ້ຽງ, ອາບນ້ຳສັດລ້ຽງ ແລະ ປິ່ນປົວສັດລ້ຽງ
                                    </Typography>
                                    <Typography sx={{ color: "#552619", fontSize: '0.9rem' }}>
                                        <strong>ທີ່ຢູ່:</strong> ຄລິນິກ DR. P VETERINARY
                                        <br />
                                        ຕັ້ງຢູ່ບ້ານ ດົງປ່າແຫຼບ, ຮ່ອມ 13 (ໜ້າໂຮງຮຽນຫວຽນຢູ)
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>

                    {/* Quick Booking */}
                    <Grid item xs={12} md={4}>
                        <Card sx={{ boxShadow: 3, borderRadius: 3, bgcolor: 'primary.main', color: 'white', height: '100%' }}>
                            <CardContent sx={{ p: 3, textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', height: '100%' }}>
                                <CalendarToday sx={{ fontSize: 40, mb: 2 }} />
                                <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                                    ຈອງນັດໝາຍ
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 3, opacity: 0.9 }}>
                                    ຈອງເວລາລ່ວງໜ້າເພື່ອຮັບບໍລິການ
                                </Typography>
                                <Button
                                    variant="contained"
                                    onClick={handleBookingClick}
                                    sx={{
                                        bgcolor: 'white',
                                        color: 'primary.main',
                                        '&:hover': {
                                            bgcolor: 'grey.100'
                                        }
                                    }}
                                    startIcon={<CalendarToday />}
                                >
                                    ຈອງດຽວນີ້
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                {/* Emergency Contact */}
                <Paper 
                    sx={{ 
                        mt: 6, 
                        p: 4, 
                        borderRadius: 3,
                        background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
                        color: 'white',
                        textAlign: 'center'
                    }}
                >
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
                        📞 ໂທສຸກເສີນ 24/7
                    </Typography>
                    <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
                        020 999 8888
                    </Typography>
                    <Typography variant="body1">
                        ສໍາລັບກໍລະນີສຸກເສີນທີ່ຕ້ອງການຄວາມຊ່ວຍເຫຼືອທັນທີ
                    </Typography>
                </Paper>
            </Container>

            {/* Success Snackbar */}
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="success"
                    sx={{ width: '100%' }}
                    elevation={6}
                    variant="filled"
                >
                    ສົ່ງຂໍ້ຄວາມສຳເລັດແລ້ວ! ພວກເຮົາຈະຕິດຕໍ່ກັບທ່ານໃນໄວໆນີ້
                </Alert>
            </Snackbar>
        </Box>
    );
};

export default ContactPage;