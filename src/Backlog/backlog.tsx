import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getBacklog } from './backlog.effect';
import SprintCard from '../sprint/sprint';
import { Grid } from '@mui/material';
import { BacklogSprint } from '../Types/backlog';
import SnackbarAlert from '../common/snackbar';
import Loading from '../common/loading';
import { Severity, SnackbarInfo } from '../Types/common';
import { createSprint } from '../Apis/sprint';
import { addNewSprint } from './backlog.slice';

const Backlog = () => {

    const dispatch = useAppDispatch();

    // Redux store states
    const selectedProject = useAppSelector(state => state.project.selectedProject);
    const { data, error, isLoading } = useAppSelector(state => state.backlog);

    const [snackbar, setSnackbar] = useState<SnackbarInfo>({ message: '', severity: undefined });
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (selectedProject?.id) {
            fetchBacklogSprints();
        }
    }, [selectedProject]);

    useEffect(() => {
        if (data.length && !isLoaded) {
            toggleSnackbar('Backlog sprints fetched successfully');
            setIsLoaded(true);
        }
    }, [data]);

    const fetchBacklogSprints = async () => {
        dispatch(getBacklog(selectedProject?.id || ''));
    }

    const renderSprints = useCallback(() => {
        if (!data.length) return null;
        return (data || []).map((item: BacklogSprint) => (
            <SprintCard
                key={item._id}
                sprint={item}
                toggleSnackbar={toggleSnackbar}
                createNewSprint={createNewSprint}
            />
        ))
    }, [data]);

    const toggleSnackbar = (message: string, severity?: Severity) => {
        setSnackbar({ message, severity });
    };

    const createNewSprint = async () => {
        if (selectedProject?.id) {
            const data = await createSprint(selectedProject?.id);
            toggleSnackbar(data.message);
            dispatch(addNewSprint(data.sprint));
        } else {
            toggleSnackbar('Select project to create new sprint', 'error');
        }
    };

    return (
        <Grid item={true} xs={12} sx={{ height: '89.5vh', overflow: 'auto' }}>
            <div>Backlog Page</div>
            {renderSprints()}
            <SnackbarAlert {...snackbar} onClose={() => toggleSnackbar('')} />
        </Grid>
    )
}

export default Backlog;