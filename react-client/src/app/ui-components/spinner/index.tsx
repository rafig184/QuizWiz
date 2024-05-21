import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Spinner() {
    return (
        <Box sx={{ display: 'flex', justifyContent: "center", paddingBottom: "10%", marginTop: "15%" }}>
            <CircularProgress className='spinner' size={100} />
        </Box>
    );
}