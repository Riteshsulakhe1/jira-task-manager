import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

interface Props {
    size?: number;
}
export default function Loading(props: Props) {
    return (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress size={props.size || 20} />
        </Box>
    );
}