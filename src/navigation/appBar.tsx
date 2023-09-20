import * as React from 'react';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Grid, Typography } from '@mui/material';
import ProjectDropdown from '../projects/projectDropdown';

export default function AppBar() {

    return (
        <MuiAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height: '10vh' }}>
            <Toolbar>
                <Typography variant="h6" noWrap component="div">
                    Persistent drawer
                </Typography>
                <Grid item={true} xs={2}>
                    <ProjectDropdown />
                </Grid>
            </Toolbar>
        </MuiAppBar>
    );
}
