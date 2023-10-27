import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

interface TaskActionMenuProps {
    taskId: string;
}
const TaskActionMenu = ({ taskId }: TaskActionMenuProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="task-action-menu-button"
                aria-controls={open ? 'task-action-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MoreHorizIcon color={'disabled'} />
            </Button>
            <Menu
                id="task-action-menu"
                aria-labelledby="task-action-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                <MenuItem onClick={handleClose}>Edit</MenuItem>
                <MenuItem onClick={handleClose}>Move To</MenuItem>
                <MenuItem onClick={handleClose}>Copy Issue Link</MenuItem>
                <MenuItem onClick={handleClose}>Assignee</MenuItem>
                <MenuItem onClick={handleClose}>Parent</MenuItem>
                <MenuItem onClick={handleClose}>Clone</MenuItem>
                <MenuItem onClick={handleClose}>Add a flag</MenuItem>
                <MenuItem onClick={handleClose}>Remove flag</MenuItem>
                <MenuItem onClick={handleClose}>Delete</MenuItem>
            </Menu>
        </div>
    );
}

export default TaskActionMenu;