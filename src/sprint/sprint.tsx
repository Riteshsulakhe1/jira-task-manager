import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionActions from '@mui/material/AccordionActions';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { BacklogSprint } from '../Types/backlog';
import { makeStyles } from '@mui/styles';
import TaskCard from '../task/taskCard';
import { Severity, Task } from '../Types/common';
import CreateTask from '../task/components/createTask';
import Button from '@mui/material/Button';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';


interface SprintProps {
    sprint: BacklogSprint;
    toggleSnackbar: (msg: string, severity?: Severity) => void;
    createNewSprint: () => void;
}
const SprintCard = ({ sprint, toggleSnackbar, createNewSprint }: SprintProps) => {
    const classes = styles();

    const [showCreateTask, setShowCreateTask] = useState<boolean>(false);

    const toggleCreateTask = () => {
        setShowCreateTask(!showCreateTask);
    };

    const renderTasks = React.useCallback(() => {
        return (sprint?.tasks || []).map((item: Task) => {
            return <TaskCard key={item.id} task={item} sprintId={sprint._id} />
        })
    }, [sprint?.tasks]);

    const onClickCreateSprint = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        createNewSprint();
        event.stopPropagation();
    };

    return (
        <div>
            <Accordion classes={{ root: classes.card }}>
                <AccordionSummary
                    expandIcon={<ArrowForwardIosSharpIcon fontSize={'small'} />}
                    aria-controls="panel1a-content"
                    id={sprint._id}
                    classes={{ root: classes.summary }}
                >
                    <Typography sx={{ width: '85%' }}>{sprint.name}</Typography>
                    {
                        sprint.isDefault ? (
                            <Button
                                variant={'text'}
                                color={'secondary'}
                                sx={{ justifyContent: 'flex-start' }}
                                onClick={onClickCreateSprint}
                            >
                                Create Sprint
                            </Button>
                        ) : null
                    }
                </AccordionSummary>
                <AccordionDetails>
                    {renderTasks()}
                </AccordionDetails>
                <AccordionActions>
                    {
                        showCreateTask ?
                            <CreateTask
                                sprintId={sprint._id}
                                toggleCreateTask={toggleCreateTask}
                                toggleSnackbar={toggleSnackbar}
                            />
                            :
                            <Button
                                fullWidth={true}
                                variant={'text'}
                                color={'secondary'}
                                sx={{ justifyContent: 'flex-start' }}
                                onClick={toggleCreateTask}
                            >
                                + Create Issue
                            </Button>
                    }
                </AccordionActions>
            </Accordion>
        </div>
    );
}

const styles = makeStyles((theme: any) => ({
    card: {
        marginBottom: '0.25rem',
        backgroundColor: '#F4F5F7'
    },
    summary: {
        flexDirection: 'row-reverse'
    }
}));
export default SprintCard;