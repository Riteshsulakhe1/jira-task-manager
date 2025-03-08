import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Task } from '../../Types/common';
import { Grid, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Assignee from '../../task/components/assignee';
import TaskActionMenu from '../../task/components/taskActionMenu';

interface Props {
    task: Task,
    sprintId: string;
}
const ColumnTaskCard = (props: Props) => {
    const { task, sprintId } = props;
    const classes = styles();

    return (
        <Card classes={{ root: classes.card }}>
            <CardContent classes={{ root: classes.content }}>
                <Grid xs={12} item={true} classes={{ root: classes.cardTitle }}>
                    <Grid item={true} xs={9}>
                        <Typography component="div">
                            {task.title}
                        </Typography>
                    </Grid>
                    <Grid item={true} xs={3} classes={{ root: classes.cardRightAction }}>
                        <TaskActionMenu taskId={task._id} />
                        <Assignee assignee={task.assignedTo} />
                    </Grid>
                </Grid>
            </CardContent>
            <CardActions>
            </CardActions>
        </Card>
    );
}
export default ColumnTaskCard;

const styles = makeStyles((theme: Theme) => ({
    card: {
        width: '100%',
        padding: '0.25rem',
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
    },
    cardRightAction: {
        display: 'flex',
        flexDirection: 'column !important' as any,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        height: '100%'
    }
}))