import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Task } from '../Types/common';
import { Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import StatusDropdown from './taskStatusDropdown';
import { TaskStatus } from '../Types/taskStaticProperties';

const bull = (
    <Box
        component="span"
        sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
        •
    </Box>
);

interface Props {
    task: Task,
}
const TaskCard = (props: Props) => {
    const { task } = props;
    const classes = styles();
    return (
        <Card className={classes.card}>
            <CardContent>
                <Typography component="span">
                    {task.title}
                </Typography>
                <StatusDropdown status={task.status as TaskStatus} />
            </CardContent>
        </Card>
    );
}
export default TaskCard;

const styles = makeStyles((theme: Theme) => ({
    card: {
        margin: '0.25rem'
    }
}))