import { useState, useCallback } from 'react';
import { grey } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import PersonIcon from '@mui/icons-material/Person';

interface AssigneeProps {
    assignee: string;
}
export default function Assignee({ assignee }: AssigneeProps) {
    const [showSearchAssignee, setShowSearchAssignee] = useState(false);

    const toggleSearchAssignee = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setShowSearchAssignee(!showSearchAssignee);
    };

    return (
        <Stack direction="row" spacing={2}>
            <Avatar sx={{ bgcolor: grey[500], width: 24, height: 24 }} onClick={toggleSearchAssignee}>
                <PersonIcon fontSize='small' />
            </Avatar>
        </Stack>
    );
}