import React, { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { SelectChangeEvent } from '@mui/material/Select';
import TaskTypeDropdown from './taskType';
import { TaskType as Type } from '../../Types/taskStaticProperties';
import Loading from '../../common/loading';
import { createTask } from '../../Apis/task';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { CreateTaskReqBody } from '../../Types/task';
import { addTaskInSprint } from '../../Backlog/backlog.slice';
import { Severity } from '../../Types/common';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import CreateTaskModal from './createTaskModal';

interface CreateTaskProps {
    toggleCreateTask: () => void;
    sprintId: string;
    toggleSnackbar: (msg: string, severity?: Severity) => void;
}
const CreateTask = (props: CreateTaskProps) => {
    const {
        sprintId,
        toggleCreateTask,
        toggleSnackbar,
    } = props;

    const [title, setTitle] = useState('');
    const [type, setType] = useState<Type>(Type.TASK);
    const [loading, setLoading] = useState<boolean>(false);
    const [showCreateTaskDialog, setShowCreateTaskDialog] = useState(false);

    // Redux state selectors
    const projectId = useAppSelector(state => state.project.selectedProject?.id);

    const dispatch = useAppDispatch();

    const handleTypeChange = (event: SelectChangeEvent) => {
        event.stopPropagation();
        setType(event.target.value as Type);
    };

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(event.target.value);
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === 'Enter') {
            createIssue();
        }
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
        console.log('blur==>', event);
        toggleCreateTask();
    };

    const createIssue = async () => {
        if (projectId && sprintId && title) {
            setLoading(true);
            const body: CreateTaskReqBody = {
                title,
                type,
                sprintId,
                projectId
            };
            const data = await createTask(body);
            dispatch(addTaskInSprint({ sprintId, task: data }));
            toggleSnackbar('Task created successfully.');
            setLoading(false);
            toggleCreateTask();
        }
    };


    const toggleShowCreateTaskDialog = () => {
        setShowCreateTaskDialog(!showCreateTaskDialog);
    };
    return (
        <Grid item={true} xs={12}>
            {
                showCreateTaskDialog ? (
                    <CreateTaskModal
                        title={title}
                        type={type}
                        sprintId={sprintId}
                        toggleCreateTaskDialog={toggleShowCreateTaskDialog}
                        toggleSnackbar={toggleSnackbar}
                    />
                ) : null
            }
            <TextField
                id="create-task-input"
                sx={{ m: 1, width: '100%', margin: 0 }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <TaskTypeDropdown type={type} handleTypeChange={handleTypeChange} />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            {
                                loading ?
                                    <Loading />
                                    :
                                    <>
                                        <Button color={'secondary'} onClick={toggleShowCreateTaskDialog}>
                                            Open in dialog
                                        </Button>
                                        <IconButton onClick={toggleCreateTask} aria-label="delete">
                                            <CloseIcon />
                                        </IconButton>
                                    </>

                            }
                        </InputAdornment>
                    )
                }}
                value={title}
                placeholder={"what's need to be done ?"}
                onChange={handleTitleChange}
                onKeyDown={handleKeyDown}
                autoFocus={true}
            />
        </Grid>
    )
};

export default CreateTask;