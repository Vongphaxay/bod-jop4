import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
} from '@mui/material';

const reservations = {
  upcoming: [
    {
      hotel: 'Lanexang Hotel',
      checkIn: 'April 5, 2025',
      checkOut: 'April 8, 2025',
      status: 'Confirmed',
      price: 120,
      image: 'https://via.placeholder.com/100x100?text=Hotel1',
    },
    {
      hotel: 'Amari Hotel',
      checkIn: 'March 15, 2025',
      checkOut: 'March 18, 2025',
      status: 'Confirmed',
      price: 80,
      image: 'https://via.placeholder.com/100x100?text=Hotel2',
    },
  ],
  past: [],
  waiting: [
    {
      hotel: 'Lanexang Hotel',
      checkIn: 'April 5, 2025',
      checkOut: 'April 8, 2025',
      status: 'waiting',
      price: 120,
      image: 'https://via.placeholder.com/100x100?text=Hotel1',
    },
    {
      hotel: 'Amari Hotel',
      checkIn: 'March 15, 2025',
      checkOut: 'March 18, 2025',
      status: 'waiting',
      price: 80,
      image: 'https://via.placeholder.com/100x100?text=Hotel2',
    },
  ],
};

function ReservationCard({ data }) {
  return (
    <Card sx={{ display: 'flex', mb: 2, boxShadow: 3 }}>
      <CardMedia
        component="img"
        image={data.image}
        alt={data.hotel}
        sx={{ width: 100 }}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">{data.hotel}</Typography>
        <Typography variant="body2">
          <strong>Check-in:</strong> {data.checkIn} <br />
          <strong>Check-out:</strong> {data.checkOut} <br />
          <strong>Status:</strong>{' '}
          <Chip
            label={data.status}
            color={
              data.status === 'Confirmed'
                ? 'success'
                : data.status === 'waiting'
                ? 'warning'
                : 'default'
            }
            size="small"
            sx={{ ml: 1 }}
          />
        </Typography>
        <Typography color="error" mt={1}>
          Price per Night: USD {data.price}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default function ReservationList() {
  const [tab, setTab] = useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const tabLabels = ['การจองที่กำลังจะมาถึง', 'การจองที่ผ่านมา', 'กำลังรอ'];

  const tabData = [
    reservations.upcoming,
    reservations.past,
    reservations.waiting,
  ];

  return (
    <Box sx={{ width: '100%', p: 2 }}>
      <Typography variant="h5" mb={2} textAlign="center">
        ลายทางจองของฉัน
      </Typography>
      <Tabs value={tab} onChange={handleChange} centered>
        {tabLabels.map((label, index) => (
          <Tab label={label} key={index} />
        ))}
      </Tabs>

      <Box mt={3}>
        {tabData[tab].length > 0 ? (
          tabData[tab].map((item, index) => (
            <ReservationCard key={index} data={item} />
          ))
        ) : (
          <Typography align="center" color="text.secondary">
            No data
          </Typography>
        )}
      </Box>
    </Box>
  );
}
