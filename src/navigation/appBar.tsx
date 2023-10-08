import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { Grid, Typography } from '@mui/material';
import ProjectDropdown from '../projects/projectDropdown';
import UserActionMenu from '../common/userActionMenu';
import { makeStyles } from '@mui/styles';

export default function AppBar() {
    const classes = styles();
    return (
        <MuiAppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, height: '10vh' }}>
            <Toolbar>
                <Grid item={true} xs={9} classes={{ root: classes.leftCol }}>
                    <Typography variant="h6" noWrap component="div">
                        Task Manager
                    </Typography>
                    <Grid item={true} xs={2}>
                        <ProjectDropdown />
                    </Grid>
                </Grid>
                <Grid item={true} xs={2}>
                    <UserActionMenu />
                </Grid>
            </Toolbar>
        </MuiAppBar>
    );
}

const styles = makeStyles((theme) => ({
    leftCol: {
        display: 'flex',
        alignItems: 'center',
        width: '100%'
    }
}))