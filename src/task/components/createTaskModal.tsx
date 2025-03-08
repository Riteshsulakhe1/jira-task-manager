import React, { useCallback, useState, forwardRef, ReactNode, ChangeEvent } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TaskPriority, TaskType } from '../../Types/taskStaticProperties';
import TaskTypeDropdown from './taskType';
import InputLabel from '@mui/material/InputLabel';
import { Grid, SelectChangeEvent } from '@mui/material';
import StatusDropdown from './statusDropdown';
import TextEditor from '../../common/textEditor/textEditor';
import SprintDropdown from '../../sprint/components/sprintDropdown';
import Priority from './priority';
import LinkedIssue from './linkedIssue';
import ProjectDropdown from '../../projects/projectDropdown';
import { useAppSelector } from '../../hooks';
import { initialTaskStatusSelector } from '../../projects/projects.selector';
import { CreateTaskReqBody } from '../../Types/task';
import { createTask } from '../../Apis/task';
import { useAppDispatch } from '../../store';
import { addTaskInSprint } from '../../Backlog/backlog.slice';
import Loading from '../../common/loading';
import { Severity } from '../../Types/common';

interface InputWrapperProps {
    label: string;
    children: ReactNode;
}
const InputWrapper = forwardRef((props: InputWrapperProps, ref) => (
    <Grid item={true} xs={12} sx={{ marginBottom: '1rem' }}>
        <InputLabel id={props.label}>{props.label}</InputLabel>
        {props.children}
    </Grid >
));
interface CreateTaskModalProps {
    title?: string;
    type?: TaskType;
    sprintId?: string;
    toggleCreateTaskDialog: () => void;
    toggleSnackbar: (msg: string, severity?: Severity) => void;
}
const CreateTaskModal = (props: CreateTaskModalProps) => {
    const {
        toggleCreateTaskDialog,
        toggleSnackbar
    } = props;

    const dispatch = useAppDispatch();
    const initialTaskStatusId = useAppSelector(initialTaskStatusSelector);
    // Task properties
    const [projectId, setProjectId] = useState('');
    const [type, setType] = useState(props.type || TaskType.TASK);
    const [status, setStatus] = useState(initialTaskStatusId || '');
    const [title, setTitle] = useState(props.title || '');
    const [description, setDescription] = useState('');
    const [sprintId, setSprintId] = useState(props.sprintId || '');
    const [priority, setPriority] = useState(TaskPriority.LOW);
    const [loading, setLoading] = useState(false);


    const handleClose = () => {
        props.toggleCreateTaskDialog();
    };

    const handleProjectChange = useCallback((projectId: string) => {
        setProjectId(projectId);
    }, []);

    const handleTypeChange = useCallback((event: SelectChangeEvent) => {
        setType(event.target.value as TaskType);
    }, []);

    const handleStatusChange = useCallback((event: SelectChangeEvent) => {
        setStatus(event.target.value);
    }, []);

    const handleTitleChange = useCallback((event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setTitle(event.target.value as TaskType);
    }, []);

    const handleDescriptionChange = useCallback((data: string) => {
        setDescription(data);
    }, []);

    const handleSprintIdChange = useCallback((event: SelectChangeEvent) => {
        setSprintId(event.target.value);
    }, []);

    const handlePriorityChange = useCallback((event: SelectChangeEvent) => {
        setPriority(event.target.value as TaskPriority);
    }, []);

    const onSubmit = async () => {
        if (projectId && sprintId && title) {
            setLoading(true);
            const body: CreateTaskReqBody = {
                title,
                type,
                status,
                description,
                priority,
                sprintId,
                projectId
            };
            const data = await createTask(body);
            dispatch(addTaskInSprint({ sprintId, task: data }));
            toggleSnackbar('Task created successfully.');
            setLoading(false);
            toggleCreateTaskDialog();
        } else {
            toggleSnackbar('Title is required.', 'error');
        }
    };

    return (
        <Dialog open={true} maxWidth={'md'} fullWidth={true} onClose={handleClose}>
            <DialogTitle>Create Task</DialogTitle>
            <DialogContent>
                <DialogContentText sx={{ marginBottom: '0.25rem' }}>
                    Please provide the details about task
                </DialogContentText>
                <InputWrapper label={'Project'}>
                    <ProjectDropdown
                        fromCreateTaskModal={true}
                        onChangeProject={handleProjectChange}
                    />
                </InputWrapper>
                <InputWrapper label={'Issue Type'}>
                    <TaskTypeDropdown
                        type={type}
                        handleTypeChange={handleTypeChange}
                    />
                </InputWrapper>
                <InputWrapper label={'Status'}>
                    <StatusDropdown
                        status={status}
                        variant={'outlined'}
                        handleStatusChange={handleStatusChange}
                    />
                </InputWrapper>
                <InputWrapper label={'Title'}>
                    <TextField
                        variant="outlined"
                        size='small'
                        fullWidth={true}
                        value={title}
                        onChange={handleTitleChange}
                    />
                </InputWrapper>
                <InputWrapper label={'Description'}>
                    <TextEditor
                        data={description}
                        isViewMode={false}
                        onDataChange={handleDescriptionChange}
                    />
                </InputWrapper>
                <InputWrapper label={'Priority'}>
                    <Priority
                        priority={priority}
                        handlePriorityChange={handlePriorityChange}
                    />
                </InputWrapper>
                <InputWrapper label={'Labels'}>
                    <TextField
                        variant="outlined"
                        size='small'
                        fullWidth={true}
                    />
                </InputWrapper>
                <InputWrapper label={'Sprint'}>
                    <SprintDropdown
                        sprintId={sprintId}
                        handleSprintIdChange={handleSprintIdChange}
                    />
                </InputWrapper>
                <InputWrapper label={'Linked Issue'}>
                    <LinkedIssue

                    />
                </InputWrapper>

            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={handleClose}>Cancel</Button>
                <Button variant='contained' onClick={onSubmit}>
                    {loading ? <Loading /> : 'Create'}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
export default CreateTaskModal;