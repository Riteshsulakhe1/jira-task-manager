import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Loading from '../common/loading';
import useDebounceHook from '../common/useDebounce.hook';
import SnackbarAlert from '../common/snackbar';
import { createProject } from '../Apis/project';
import { SnackbarInfo } from '../Types/common';
import { useNavigate } from 'react-router-dom';
import { RouteKeys } from '../navigation/routekeys';
import { useAppDispatch } from '../store';
import { getProjectsEffect } from './projects.effect';

const CreateProject = () => {
    const [project, setProject] = useState({ name: '', key: '' });
    const [loading, setLoading] = useState(false);
    const [snackbar, setSnackbar] = useState<SnackbarInfo>({ message: '', severity: 'success' });

    const projectName = useDebounceHook(project.name, 500);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        suggestProjectKey();
    }, [projectName]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setProject(prev => ({
            ...prev,
            [event.target.id]: event.target.value
        }));
    };

    const suggestProjectKey = () => {
        const splittedName = projectName.split(" ");
        let key = ''
        if (splittedName.length > 1) {
            splittedName.forEach((char: string) => {
                if (char) {
                    key += char[0].toUpperCase();
                }
            });
        } else if (splittedName.length === 1 && splittedName[0].length > 3) {
            const first = splittedName[0];
            key += first.charAt(0).toUpperCase() + first.charAt(first.length - 1).toUpperCase();
        }
        setProject(prev => ({ ...prev, key }));
    };

    const onCreateProject = async () => {
        setLoading(true);
        if (project.name?.length > 3 && project.key?.length > 1) {
            const result = await createProject(project);
            setLoading(false);
            if (result.project) {
                setSnackbar({ message: result.message });
                dispatch(getProjectsEffect());
                navigate(RouteKeys.project);
            } else {
                setSnackbar({
                    message: result.response.data?.message || 'Fail to create project.',
                    severity: 'error'
                });
            }
        } else {
            setSnackbar({
                message: 'Please fill all the fields.',
                severity: 'error'
            });
        }
    };


    const onCloseSnackbar = () => {
        setSnackbar({ message: '' });
    };

    return (
        <Grid container={true} flexDirection={'column'} alignItems={'center'}>
            <Grid item={true} xs={6}>
                <SnackbarAlert {...snackbar} onClose={onCloseSnackbar} />
                <Typography component={'h2'}>Create New Project</Typography>
                <TextField
                    id="name"
                    label="Enter Project Name"
                    placeholder="Placeholder"
                    variant="standard"
                    value={project.name}
                    onChange={handleChange}
                    fullWidth={true}
                />
                <TextField
                    id="key"
                    label="Enter Project Key"
                    variant="standard"
                    value={project.key}
                    onChange={handleChange}
                    fullWidth={true}
                    sx={{ marginBottom: '0.5rem' }}
                />
                <Button
                    color={'secondary'}
                    variant={'contained'}
                    onClick={onCreateProject}
                >
                    {loading ? <Loading size={15} /> : 'Create'}
                </Button>
            </Grid>
        </Grid>
    );
};
export default CreateProject;