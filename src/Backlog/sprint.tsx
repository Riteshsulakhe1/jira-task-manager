import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BacklogSprint } from '../Types/backlog';
import { makeStyles } from '@mui/styles';
import TaskCard from '../task/task';
import { Task } from '../Types/common';

interface SprintProps {
    sprint: BacklogSprint;
}
const SprintCard = ({ sprint }: SprintProps) => {
    const classes = styles();

    const renderTasks = React.useCallback(() => {
        return (sprint?.tasks || []).map((item: Task) => {
            return <TaskCard key={item.id} task={item} />
        })
    }, [sprint?.tasks]);

    return (
        <div>
            <Accordion classes={{ root: classes.card }}>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id={sprint._id}
                >
                    <Typography>{sprint.name}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {renderTasks()}
                </AccordionDetails>
            </Accordion>
        </div>
    );
}

const styles = makeStyles((theme: any) => ({
    card: {
        marginBottom: '1rem',
        backgroundColor: '#F4F5F7'
    }
}));
export default SprintCard;