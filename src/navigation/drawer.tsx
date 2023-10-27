import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { Box, Toolbar } from '@mui/material';
import ViewWeekOutlinedIcon from '@mui/icons-material/ViewWeekOutlined';
import SegmentOutlinedIcon from '@mui/icons-material/SegmentOutlined';
import { useAppSelector } from '../hooks';
import { drawerLinks as links } from './drawer.constants';
import { DrawerMenuItem, DrawerMenuKeys } from '../Types/common';
import { getBacklogRoute, getBoardRoute } from './routekeys';
import { useNavigate } from 'react-router-dom';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {

    const projectId = useAppSelector(state => state.project.selectedProject?.id);

    const [open, setOpen] = React.useState(false);
    const [drawerLinks, setDrawerLinks] = React.useState<DrawerMenuItem[]>([]);
    const [activeMenuName, setActiveMenuName] = React.useState<DrawerMenuKeys>(DrawerMenuKeys.BACKLOG);
    const theme = useTheme();
    const navigate = useNavigate();

    React.useEffect(() => {
        const menuItems: DrawerMenuItem[] = links.map((item: DrawerMenuItem) => ({
            ...item,
            icon: item.name === DrawerMenuKeys.BACKLOG ? <SegmentOutlinedIcon /> : <ViewWeekOutlinedIcon />
        }));
        setDrawerLinks(menuItems);
    }, []);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const onClickMenuItem = (item: DrawerMenuItem) => {
        let url: string = '';
        if (item.name === DrawerMenuKeys.BACKLOG) {
            url = getBacklogRoute(projectId as string);
        } else if (item.name === DrawerMenuKeys.BOARD) {
            url = getBoardRoute(projectId as string);
        }
        setActiveMenuName(item.name);
        navigate(url);
    };

    return (
        <Drawer
            variant="permanent"
            sx={{
                // width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { boxSizing: 'border-box' }, //width: drawerWidth, 
            }}
        >
            <Toolbar />
            {/* <Box sx={{ overflow: 'auto' }}> */}
            <List component="nav">
                {drawerLinks.map((item: DrawerMenuItem, index) => (
                    <ListItemButton
                        key={item.name}
                        onClick={() => onClickMenuItem(item)}
                        selected={item.name === activeMenuName}
                    >
                        <ListItemIcon>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.name} />
                    </ListItemButton>
                ))}
            </List>
            <Divider />
            <List>
                {['Project Settings'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            {/* </Box> */}
        </Drawer>
    );
}
