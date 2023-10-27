import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppSelector, useAppDispatch } from '../hooks';
import { Project } from '../Types/projects';
import { selectProject } from './projects.slice';
import { useNavigate } from 'react-router-dom';
import { getBacklogRoute } from '../navigation/routekeys';
import { makeStyles } from '@mui/styles';

export default function ProjectDropdown() {
    const [selectedProjectId, setSelectedProjectId] = React.useState('');

    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const classes = styles();

    // Redux states
    const {
        isLoading, data, selectedProject
    } = useAppSelector(state => state.project);

    React.useEffect(() => {
        if (selectedProject?.id && !selectedProjectId) {
            setSelectedProjectId(selectedProject.id);
        }
    }, [selectedProject]);

    const handleChange = (event: SelectChangeEvent) => {
        setSelectedProjectId(event.target.value);
        const project = data.filter((item: Project) => item.id === event.target.value)[0] || null;
        dispatch(selectProject(project));
        navigate(getBacklogRoute(project.id), { state: { projectId: project.id } });
    };

    const renderMenuItem = React.useCallback(() => {
        return (data || []).map((item: Project) => (
            <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
        ))
    }, [data]);

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small" classes={{ root: classes.form }}>
            <Select
                id="project-dropdown"
                value={selectedProjectId}
                onChange={handleChange}
            >
                <MenuItem value="">
                    <em>None</em>
                </MenuItem>
                {renderMenuItem()}
            </Select>
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
    }
}));
