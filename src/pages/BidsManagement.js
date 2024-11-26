import React, { useState, useEffect } from 'react';
import { Box, Typography, Table, TableContainer, TableHead, TableCell, TableRow, Paper, TableSortLabel, TableBody } from '@mui/material';

const BidsManagement = ({ bids, tenders }) => {
    const [sortedBids, setSortedBids] = useState([]);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('cost');

    //calculate and sort bids when the component mounts or props change
    useEffect(() => {
        const bidsWithFlags = bids.map((bid) => {
            const tender = tenders.find((t) => t.id === bid.tenderId);
            const tenderEndTime = new Date(tender.endTime);
            const bidTime = new Date(bid.bidTime);

            //check if bid was placed within the last 5 minutes of the tender end time
            const flag = tenderEndTime - bidTime <= 5*60*1000;
            return {...bid, flag};
        });

        //Initial sort by cost
        setSortedBids(
            [...bidsWithFlags].sort((a, b) => (a.cost > b.cost ? 1 : -1))
        );
    }, [bids, tenders]);

    //Handle sorting
    const handleSort = (property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);

        const sorted = [...sortedBids].sort((a, b) => {
            if(isAsc) {
                return a[property] > b[property] ? 1 : -1;
            }
            return a[property] < b[property]? 1 : -1;
        });
        setSortedBids(sorted);
    };

    return (
        <Box
        sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            maxWidth:800,
            margin: 'auto',
            mt: 5,
            p: 3,
        }}
        >
            <Typography variant="h4" align="center" gutterBottom>
                Bids Management
            </Typography>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                active={orderBy === 'companyName'}
                                direction={orderBy ===  'companyName' ? order : 'asc'}
                                onClick={() => handleSort('companyName')}
                                >Company Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                active={orderBy === 'cost'}
                                direction={orderBy === 'cost' ? order : 'asc'}
                                onClick={() => handleSort('cost')}
                                >Bid Cost
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>
                                <TableSortLabel
                                active={orderBy === 'cost'}
                                direction={orderBy === 'cost' ? order : 'asc'}
                                onClick={() => handleSort('bidTime')}
                                >

                                Bid Time
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Flag</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sortedBids.map((bid, index) => (
                            <TableRow key={index}>
                                <TableCell>{bid.companyName}</TableCell>
                                <TableCell>{bid.cost}</TableCell>
                                <TableCell>{new Date(bid.bidTime).toLocaleString()}</TableCell>
                                <TableCell>
                                    {bid.flag ? (<Typography color="error">Late Bid</Typography>) : ('N/A')}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default BidsManagement;