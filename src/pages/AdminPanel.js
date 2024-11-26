import React, { useState } from 'react';
import { Box, TextField, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

function AdminPanel() {
    const [tender, setTender] = useState({
        name: '',
        description: '',
        startTime: '',
        endTime: '',
        bufferTime: '',
    });

    const [tenders, setTenders] = useState([]); // List of tenders
    const [message, setMessage] = useState('');

    //Handle form input changes
    const handleChange = (e) => {
        setTender({ ...tender, [e.target.name]: e.target.value });
    };

    //Handle form submission
    const handleSubmit = () => {
        console.log('Tender Details:', tender);
        setTenders([...tenders, tender]); // Add new tender to the list
        setMessage('Tender created successfully!');
        setTender({
            name: '',
            description: '',
            startTime: '',
            endTime: '',
            bufferTime: '',
        });
        setTimeout(() => setMessage(''), 3000); //clear message after 3 seconds
    };

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                maxWidth: 600,
                margin: 'auto',
                mt: 5,
                p: 2,
                border: '1px solid #ccc',
                borderRadius: '8px',
                boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                Admin Panel: Create Tender
            </Typography>

            {message && (
                <Typography
                    variant="subtitle1"
                    color="success.main"
                    align="center"
                >
                    {message}
                </Typography>
            )}


            {/* Form */}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                    label="Tender Name"
                    name="name"
                    value={tender.name}
                    onChange={handleChange}
                    variant="outlined"
                    fullWidth
                />

                <TextField
                    label="End Time"
                    name="endTime"
                    value={tender.endTime}
                    onChange={handleChange}
                    type="datetime.local"
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                />

                <TextField
                    label="Buffer Time (in minutes)"
                    name="bufferTime"
                    value={tender.bufferTime}
                    onChange={handleChange}
                    type="number"
                    variant="outlined"
                    fullWidth
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                >
                    Create Tender
                </Button>
            </Box>


            {tenders.length > 0 && (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell><b>Tender Name</b></TableCell>
                                <TableCell><b>Description</b></TableCell>
                                <TableCell><b>Start Time</b></TableCell>
                                <TableCell><b>End Time</b></TableCell>
                                <TableCell><b>Buffer Time</b></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {tenders.map((tender, index) => (
                                <TableRow key={index}>
                                    <TableCell>{tender.name}</TableCell>
                                    <TableCell>{tender.description}</TableCell>
                                    <TableCell>{tender.startTime}</TableCell>
                                    <TableCell>{tender.endTime}</TableCell>
                                    <TableCell>{tender.bufferTime}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}

export default AdminPanel;