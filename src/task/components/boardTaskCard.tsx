import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Task } from '../../Types/common';
import { Grid, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import StatusDropdown from './taskStatusDropdown';
import { TaskStatus } from '../../Types/taskStaticProperties';
import Assignee from './assignee';
import TaskActionMenu from './taskActionMenu';

interface Props {
    task: Task,
    sprintId: string;
}
const BoardTaskCard = (props: Props) => {
    const { task, sprintId } = props;
    const classes = styles();

    return (
        <Card classes={{ root: classes.card }}>
            <CardContent classes={{ root: classes.content }}>
                <Grid xs={12} item={true} classes={{ root: classes.cardTitle }}>
                    <Grid item={true} xs={10}>
                        <Typography component="div" noWrap={true}>
                            {task.title}
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={2}>
                        <TaskActionMenu taskId={task._id} />
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
                <Assignee assignee={task.assignedTo} />
            </CardActions>
        </Card>
    );
}
export default BoardTaskCard;

const styles = makeStyles((theme: Theme) => ({
    card: {
        width: '100%',
        padding: '0rem',
        borderBottom: '0.5px solid grey',
        borderRadius: '0rem',
        marginTop: '0.25rem',
        marginBottom: '0.25rem'
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