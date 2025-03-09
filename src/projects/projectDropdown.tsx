import * as React from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent, BaseSelectProps } from '@mui/material/Select';
import { useAppSelector, useAppDispatch } from '../hooks';
import { Project } from '../Types/projects';
import { selectProject } from './projects.slice';
import { useNavigate } from 'react-router-dom';
import { getBacklogRoute } from '../navigation/routekeys';
import { makeStyles } from '@mui/styles';
import { getProjectSprintListEffect, getProjectTaskStatusEffect } from './projects.effect';
import styled from '@emotion/styled';

interface ProjectDropdownProps {
    fromCreateTaskModal?: boolean;
    onChangeProject?: (projectId: string) => void;
}

// Define custom props
interface CustomSelectProps extends BaseSelectProps {
    customcolor?: string;
}
const CustomSelect = styled(Select)<CustomSelectProps>(({ theme, customcolor }) => ({
    color: customcolor || "white", // Dynamic text color
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: customcolor || "white", // Dynamic border color
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
        borderColor: customcolor || "white",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: customcolor || "white",
    },
    "& svg": {
        color: customcolor || "white", // Dynamic dropdown icon color
    },
}));

export default function ProjectDropdown(props: ProjectDropdownProps) {
    const { fromCreateTaskModal = false, onChangeProject } = props;

    const [selectedProjectId, setSelectedProjectId] = React.useState('');
    /**
     * TODO => Use selectedProjectIdSelector to get select projectId from redux
     */
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const classes = styles();

    // Redux states
    const {
        isLoading, data, selectedProject
    } = useAppSelector(state => state.project);

    React.useEffect(() => {
        onUpdateSelectedProject();
    }, [selectedProject]);

    const onUpdateSelectedProject = () => {
        setProjectId();
        if (fromCreateTaskModal && onChangeProject) {
            onChangeProject(selectedProject?.id || '');
        } else {
            fetchProjectTaskStatus();
            fetchProjectSprintList();
        }
    };

    const setProjectId = () => {
        const projectId = getSelectedProjectId();
        if (selectedProjectId !== projectId) {
            setSelectedProjectId(projectId);
        }
    };

    const fetchProjectTaskStatus = () => {
        const projectId = getSelectedProjectId();
        if (projectId) {
            dispatch(getProjectTaskStatusEffect(projectId));
        }
    };

    const fetchProjectSprintList = () => {
        const projectId = getSelectedProjectId();
        if (projectId) {
            dispatch(getProjectSprintListEffect(projectId));
        }
    }

    const getSelectedProjectId = () => (
        selectedProject?.id || ''
    );

    const onChange = (event: SelectChangeEvent) => {
        if (fromCreateTaskModal && typeof onChangeProject === 'function') {
            onChangeProject(event.target.value);
        } else {
            handleChange(event);
        }
    };

    const handleChange = (event: SelectChangeEvent) => {
        const project = data.filter((item: Project) => item.id === event.target.value)[0] || null;
        dispatch(selectProject(project));
        navigate(getBacklogRoute(project.id), { state: { projectId: project.id } });
    };

    const isFromCreateTaskModal = () => {
        return fromCreateTaskModal && onChangeProject && typeof onChangeProject === 'function';
    };

    const shouldAllowNoneOption = () => {
        return isFromCreateTaskModal() ? false : true;
    };

    const renderMenuItem = React.useCallback(() => {
        return (data || []).map((item: Project) => (
            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
        ))
    }, [data]);

    const renderNoneOption = React.useCallback(() => {
        if (shouldAllowNoneOption()) {
            return (
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
            );
        }
        return null;
    }, []);

    return (
        <FormControl
            fullWidth={fromCreateTaskModal ? false : true}
            sx={{ m: fromCreateTaskModal ? 0 : 1, minWidth: 200 }}
            size="small"
            classes={{ root: classes.form }}
        >
            <CustomSelect
                id="project-dropdown"
                customcolor={fromCreateTaskModal ? 'black' : 'white'}
                value={selectedProjectId}
                onChange={(e) => onChange(e as SelectChangeEvent)}
                classes={{ root: classes.select }}
            >
                {renderNoneOption()}
                {renderMenuItem()}
            </CustomSelect>
        </FormControl>
    );
}

const styles = makeStyles(theme => ({
    form: {
        color: 'white',
        borderColor: 'white'
    },
    label: {
        color: 'white'
    },
    select: {
        color: 'white',
        borderColor: 'white'
    }
}));
