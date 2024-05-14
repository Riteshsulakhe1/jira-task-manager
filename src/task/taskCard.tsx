import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Task } from '../Types/common';
import { Grid, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import StatusDropdown from './components/taskStatusDropdown';
import Assignee from './components/assignee';
import TaskActionMenu from './components/taskActionMenu';

interface Props {
    task: Task,
    sprintId: string;
}
const TaskCard = (props: Props) => {
    const { task, sprintId } = props;
    const classes = styles();

    return (
        <Card classes={{ root: classes.card }}>
            <CardContent classes={{ root: classes.content }}>
                <Grid xs={7} item={true} classes={{ root: classes.cardTitle }}>
                    <Typography component="span" align='center'>
                        {task.title}
                    </Typography>
                </Grid>
                <Grid item={true} xs={5} classes={{ root: classes.contentAction }}>
                    <StatusDropdown status={task.status} taskId={task._id} sprintId={sprintId} />
                    <Assignee assignee={task.assignedTo} />
                    <TaskActionMenu taskId={task._id} />
                </Grid>
            </CardContent>
        </Card>
    );
}
export default TaskCard;

const styles = makeStyles((theme: Theme) => ({
    card: {
        margin: '0rem',
        width: '100%',
        padding: '0rem',
        borderBottom: '0.5px solid grey',
        borderRadius: '0rem'
    },
    cardTitle: {
        display: 'flex',
        alignItems: 'center'
    },
    content: {
        display: 'flex',
        padding: '0rem 0.55rem !important'
    },
    contentAction: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
}))