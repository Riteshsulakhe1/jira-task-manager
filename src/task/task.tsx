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
import StatusDropdown from './taskStatusDropdown';
import { TaskStatus } from '../Types/taskStaticProperties';
import Assignee from './assignee';
import TaskActionMenu from './taskActionMenu';

interface Props {
    task: Task,
}
const TaskCard = (props: Props) => {
    const { task } = props;
    const classes = styles();

    return (
        <Card className={classes.card}>
            <CardContent classes={{ root: classes.content }}>
                <Grid xs={7} item={true}>
                    <Typography component="span" align='center'>
                        {task.title}
                    </Typography>
                </Grid>
                <Grid item={true} xs={5} classes={{ root: classes.contentAction }}>
                    <StatusDropdown status={task.status as TaskStatus} />
                    <Assignee assignee={task.assignedTo} />
                    <TaskActionMenu taskId={task.id} />
                </Grid>
            </CardContent>
        </Card>
    );
}
export default TaskCard;

const styles = makeStyles((theme: Theme) => ({
    card: {
        margin: '0.25rem',
        width: '100%',
        padding: '0.25rem 0.5rem'
    },
    content: {
        display: 'flex'
    },
    contentAction: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }
}))