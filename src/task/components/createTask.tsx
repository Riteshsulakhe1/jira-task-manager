import React, { useState } from 'react';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { SelectChangeEvent } from '@mui/material/Select';
import TaskType from './taskType';
import { TaskType as Type } from '../../Types/taskStaticProperties';
import Loading from '../../common/loading';
import { createTask } from '../../Apis/task';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { CreateTaskReqBody } from '../../Types/task';
import { addTaskInSprint } from '../../Backlog/backlog.slice';
import { Severity } from '../../Types/common';

interface CreateTaskProps {
    toggleCreateTask: () => void;
    sprintId: string;
    toggleSnackbar: (msg: string, severity?: Severity) => void;
}
const CreateTask = ({ sprintId, toggleCreateTask, toggleSnackbar }: CreateTaskProps) => {

    const [title, setTitle] = useState('');
    const [type, setType] = useState<Type>(Type.TASK);
    const [loading, setLoading] = useState<boolean>(false);

    // Redux state selectors
    const projectId = useAppSelector(state => state.project.selectedProject?.id);

    const dispatch = useAppDispatch();

    const handleTypeChange = (event: SelectChangeEvent) => {
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

    return (
        <Grid item={true} xs={12}>
            <TextField
                id="create-task-input"
                sx={{ m: 1, width: '100%', height: '2.5rem', margin: 0 }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <TaskType type={type} handleTypeChange={handleTypeChange} />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            {loading ? <Loading /> : null}
                        </InputAdornment>
                    )
                }}
                value={title}
                placeholder={"what's need to be done ?"}
                onChange={handleTitleChange}
                onKeyDown={handleKeyDown}
                onBlur={handleBlur}
                autoFocus={true}
            />
        </Grid>
    )
};

export default CreateTask;