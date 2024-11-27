import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Alert, TablePagination } from '@mui/material';

function UserView() {
    // Mock tenders for now (replace this with real data later)
    const [tenders, setTenders] = useState([
        {
            id: 1,
            name: 'Road Construction',
            description: 'Construction of a 10 km road',
            startTime: '2024-11-01T10:00',
            endTime: '2024-11-27T18:01',
            bufferTime: 10,
        },
        {
            id: 2,
            name: 'Bridge Renovation',
            description: 'Renovation of the main city bridge',
            startTime: '2024-11-02T08:00',
            endTime: '2024-11-27T18:02',
            bufferTime: 15,
        },
    ]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(2);

    const handleChangePage = (event, page) => {
        setPage(page);
    }

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0); //Reset to first page
    }

    const [bids, setBids] = useState([]); // List of submitted bids
    const [currentBid, setCurrentBid] = useState(''); // Current bid input
    const [notifications, setNotifications] = useState([]); // Holds tenders closing soon

    // Function to handle bid submission
    const handleBidSubmit = (tenderId) => {
        const now = new Date();
        const tender = tenders.find((t) => t.id === tenderId);

        //check if bid is placed within the last 5 minutes
        const tenderEndTime = new Date(tender.endTime);
        const timeDifference = tenderEndTime - now;

        const newBid = {
            tenderId,
            cost: parseFloat(currentBid),
            companyName: 'User Company', // Hardcoded for now
            bidTime: new Date().toISOString(),
        };

        //Extend tender end timeif bid is within the last 5 minutes
        if (timeDifference > 0 && timeDifference <= 5 * 60 * 1000) {
            const updatedTenders = tenders.map((t) =>
                t.id === tenderId ?
                    {
                        ...t,
                        endTime: new Date(tenderEndTime.getTime() + tender.bufferTime * 60 * 1000).toISOString(),
                    }
                    : t
            );
            setTenders(updatedTenders);
            alert(`Tender end time extended by ${tender.bufferTime} minutes. `);
        }

        setBids([...bids, newBid]);
        setCurrentBid('');
        alert('Bid submitted successfully!');
    };

    // check for tenders closing in the next 5 minutes
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const soonClosing = tenders.filter((tender) => {
                const endTime = new Date(tender.endTime);
                const timeLeft = endTime - now;
                return timeLeft > 0 && timeLeft <= 5 * 60 * 1000; //within 5 minutes
            });
            setNotifications(soonClosing);
        }, 1000); //check every second

        return () => clearInterval(interval); //cleanup interval on component unmount
    }, [tenders]);

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
                maxWidth: 800,
                margin: 'auto',
                mt: 5,
                p: 3,
            }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                User View: Available Tenders
            </Typography>

            {/* Notifications */}
            {notifications.length > 0 && (
                <Box>
                    <Alert severity='warning'>
                        The following tenders are closing soon
                        <ul>
                            {notifications.map((tender) => (
                                <li key={tender.id}>
                                    <Typography>
                                        <strong>{tender.name}</strong> ends at{' '}
                                        {new Date(tender.endTime).toLocaleTimeString()}.
                                    </Typography>
                                </li>
                            ))}
                        </ul>
                    </Alert>
                </Box>
            )}

            {/* Tender List Table */}
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Tender Name</b></TableCell>
                            <TableCell><b>Description</b></TableCell>
                            <TableCell><b>End Time</b></TableCell>
                            <TableCell><b>Actions</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tenders
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage ) // Paginate rows
                        .map((tender) => (
                            <TableRow key={tender.id}>
                                <TableCell>{tender.name}</TableCell>
                                <TableCell>{tender.description}</TableCell>
                                <TableCell>{new Date(tender.endTime).toLocaleString()}</TableCell>
                                <TableCell>
                                    <Box sx={{ display: 'flex', gap: 1 }}>
                                        <TextField
                                            label="Your Quote"
                                            type="number"
                                            value={currentBid}
                                            onChange={(e) => setCurrentBid(e.target.value)}
                                            size="small"
                                            variant="outlined"
                                        />
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            onClick={() => handleBidSubmit(tender.id)}
                                            disabled={!currentBid || isNaN(currentBid)}
                                        >
                                            Submit
                                        </Button>
                                    </Box>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Pagination */}

            <TablePagination
            component="div"
            count={tenders.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            />

            
            {/* Lowest Bid Display */}
            {bids.length > 0 && (
                <Box>
                    <Typography variant="h6" gutterBottom>
                        Lowest Bids:
                    </Typography>
                    {tenders.map((tender) => {
                        const tenderBids = bids.filter((bid) => bid.tenderId === tender.id);
                        if (tenderBids.length > 0) {
                            const lowestBid = tenderBids.reduce((min, bid) =>
                                bid.cost < min.cost ? bid : min
                            );
                            return (
                                <Typography key={tender.id}>
                                    {tender.name}: Lowest Bid is {lowestBid.cost} by {lowestBid.companyName}.
                                </Typography>
                            );
                        }
                        return (
                            <Typography key={tender.id}>
                                {tender.name}: No bids yet.
                            </Typography>
                        );
                    })}
                </Box>
            )}
        </Box>
    );
}

export default UserView;
