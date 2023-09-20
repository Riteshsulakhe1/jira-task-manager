import React, { useCallback, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getBacklog } from './backlog.effect';
import SprintCard from './sprint';
import { Grid } from '@mui/material';
import { BacklogSprint } from '../Types/backlog';
import SnackbarAlert from '../common/snackbar';
import Loading from '../common/loading';
import { Severity, SnackbarInfo } from '../Types/common';
const Backlog = () => {

    const dispatch = useAppDispatch();

    // Redux store states
    const selectedProject = useAppSelector(state => state.project.selectedProject);
    const { data, error, isLoading } = useAppSelector(state => state.backlog);

    const [snackbar, setSnackbar] = useState<SnackbarInfo>({ message: '', severity: undefined });

    useEffect(() => {
        if (selectedProject?.id) {
            fetchBacklogSprints();
        }
    }, [selectedProject]);

    useEffect(() => {
        if (data.length) {
            toggleSnackbar('Backlog sprints fetched successfully');
        }
    }, [data]);

    const fetchBacklogSprints = async () => {
        dispatch(getBacklog(selectedProject?.id || ''));
    }

    const renderSprints = useCallback(() => {
        return (data || []).map((item: BacklogSprint) => (
            <SprintCard key={item._id} sprint={item} />
        ))
    }, [data]);

    const toggleSnackbar = (message: string, severity?: Severity) => {
        setSnackbar({ message, severity });
    };

    return (
        <Grid item={true} xs={12}>
            <div>Backlog Page</div>
            {renderSprints()}
            <SnackbarAlert {...snackbar} onClose={() => toggleSnackbar('')} />
        </Grid>
    )
}

export default Backlog;