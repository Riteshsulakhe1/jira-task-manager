import React, { useEffect, useCallback } from 'react';
import Grid from '@mui/material/Grid/Grid';
import { styled } from '@mui/material/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppSelector, useAppDispatch } from '../hooks';
import { getProjectsEffect } from './projects.effect';
import Loading from '../common/loading';
import { Project } from '../Types/projects';
import { selectProject } from './projects.slice';
import { useNavigate } from 'react-router-dom';
import { RouteKeys, getBacklogRoute } from '../navigation/routekeys';
import Button from '@mui/material/Button';

const Projects = (props: any) => {

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    // Redux states
    const {
        isLoading, success, data, page, limit,
        totalPages, totalResults
    } = useAppSelector(state => state.project);

    const Demo = styled('div')(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
    }));

    const gotoProject = (project: Project) => {
        dispatch(selectProject(project));
        navigate(getBacklogRoute(project.id), { state: { projectId: project.id } });
    }

    const renderList = useCallback(() => {
        return (data || []).map((item: Project) => (
            <ListItem
                key={item.id}
                secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                }
                onClick={() => gotoProject(item)}
            >
                <ListItemAvatar>
                    <Avatar>
                        <FolderIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={item.name}
                // secondary={secondary ? 'Secondary text' : null}
                />
            </ListItem>
        ));
    }, [data]);

    return (
        <Grid item={true} xs={12}>
            {isLoading && <Loading />}
            <Demo>
                <Grid item={true} xs={12} justifyContent={'flex-end'}>
                    <Button variant="contained" color={'secondary'}>
                        Create Project
                    </Button>
                </Grid>
                <List sx={{ 'cursor': 'pointer' }}>
                    {renderList()}
                </List>
            </Demo>
        </Grid>
    )
};

export default Projects;