import React from 'react';
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

// ຂໍ້ມູນຕົວຢ່າງ
const petReservations = [
  {
    bookingDate: '12/04/2025',
    startDate: '20/04/2025',
    endDate: '25/04/2025',
    petName: 'ໂຕນີ',
    age: '3 ປີ',
    color: 'ສີນ້ຳຕານ',
    gender: 'ຜູ້',
    petType: 'ໝາ',
    petSize: 'ກາງ',
    totalPrice: '500,000 ກີບ'
  },
  {
    bookingDate: '15/04/2025',
    startDate: '01/05/2025',
    endDate: '05/05/2025',
    petName: 'ມີມີ່',
    age: '2 ປີ',
    color: 'ສີຂາວ',
    gender: 'ແມ່',
    petType: 'ແມວ',
    petSize: 'ນ້ອຍ',
    totalPrice: '400,000 ກີບ'
  },
  {
    bookingDate: '18/04/2025',
    startDate: '10/05/2025',
    endDate: '15/05/2025',
    petName: 'ລັກກີ້',
    age: '4 ປີ',
    color: 'ສີດຳ',
    gender: 'ຜູ້',
    petType: 'ໝາ',
    petSize: 'ໃຫຍ່',
    totalPrice: '650,000 ກີບ'
  }
];

const tableColumns = [
  { id: 'bookingDate', label: 'ມື້ຈອງ', minWidth: 60 },
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
                        fontSize: '0.75rem',
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
                          sx={{ fontSize: '0.75rem', px: 1, py: 0.5 }}
                        >
                          {reservation[col.id]}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={10} align="center">
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
