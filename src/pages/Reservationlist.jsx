import React, { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent
} from '@mui/material';
import { getAllBookingbycus_id } from '../services/booking.service';
import Cookies from 'js-cookie';
import dayjs from 'dayjs';

const tableColumns = [
  { id: 'bookingDate', label: 'ຈອງ', minWidth: 60 },
  { id: 'startDate', label: 'ວັນທີເລີ່ມ', minWidth: 60 },
  { id: 'endDate', label: 'ວັນທີ່ສິ້ນສຸດ', minWidth: 80 },
  { id: 'petName', label: 'ຊື່ສັດລ້ຽງ', minWidth: 80 },
  { id: 'age', label: 'ອາຍຸ', minWidth: 50 },
  { id: 'color', label: 'ສີ', minWidth: 60 },
  { id: 'gender', label: 'ເພດສັດລ້ຽງ', minWidth: 60 },
  { id: 'petType', label: 'ປະເພດສັດລ້ຽງ', minWidth: 80 },
  { id: 'petSize', label: 'ຂະໜາດສັດລ້ຽງ', minWidth: 60 },
  { id: 'totalPrice', label: 'ລາຄາລວມ', minWidth: 100 }
];

export default function Reservation() {
  const [petReservations, setPetReservations] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const cus_id = Number(Cookies.get("cus_id"));
        const token = Cookies.get("accessToken");
        const response = await getAllBookingbycus_id(cus_id, token);
        console.log(response);
        console.log("API response:", response?.data?.booking);

        const data = response?.data?.booking || [];

        const formattedData = data.map(item => {
          const start = dayjs(item.start_date);
          const end = dayjs(item.stop_date);
          const diffDays = end.diff(start, 'day');

          return {
            bookingDate: `${diffDays} ມື້`,
            startDate: start.format('DD/MM/YYYY'),
            endDate: end.format('DD/MM/YYYY'),
            petName: item.pet?.pet_name,
            age: `${item.pet?.age} ປີ`,
            color: item.pet?.color,
            gender: item.pet?.gender,
            petType: item.pet?.pet_type,
            petSize: item.pet?.size,
            totalPrice: `${Number(item.total).toLocaleString()} ກີບ`
          };
        });

        setPetReservations(formattedData);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box sx={{ width: '100%', maxWidth: '1200px', mx: 'auto', p: 3 }}>
      <Typography variant="h5" mb={2} textAlign="center" fontWeight="bold">
        ລາຍການຈອງຄິວຂອງຂ້ອຍ
      </Typography>

      <Card elevation={4} sx={{ borderRadius: 3 }}>
        <CardContent>
          <TableContainer component={Paper} sx={{ borderRadius: 2, overflowX: 'auto' }}>
            <Table sx={{ minWidth: 800 }} size="small" aria-label="pet reservation table">
              <TableHead>
                <TableRow sx={{ backgroundColor: '#e0f7fa' }}>
                  {tableColumns.map((column) => (
                    <TableCell
                      key={column.id}
                      align="center"
                      sx={{
                        minWidth: column.minWidth,
                        fontWeight: 'bold',
                        fontSize: '1rem',
                        px: 1,
                        py: 0.5,
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {petReservations.length > 0 ? (
                  petReservations.map((reservation, index) => (
                    <TableRow
                      key={index}
                      sx={{
                        '&:nth-of-type(odd)': { backgroundColor: '#fafafa' },
                        '&:hover': { backgroundColor: '#f1f1f1' },
                        transition: 'background-color 0.3s ease'
                      }}
                    >
                      {tableColumns.map((col) => (
                        <TableCell
                          align="center"
                          key={col.id}
                          sx={{ fontSize: '1rem', px: 1, py: 0.5 }}
                        >
                          {reservation[col.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} align="center" sx={{ fontSize: '1rem' }}>
                      ບໍ່ມີຂໍ້ມູນ
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </CardContent>
      </Card>
    </Box>
  );
}
