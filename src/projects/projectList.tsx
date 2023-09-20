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

const Projects = (props: any) => {

    const dispatch = useAppDispatch();

    // Redux states
    const {
        isLoading, success, data, page, limit,
        totalPages, totalResults
    } = useAppSelector(state => state.project);

    // useEffect(() => {
    //     dispatch(getProjectsEffect());
    // }, []);

    const Demo = styled('div')(({ theme }) => ({
        backgroundColor: theme.palette.background.paper,
    }));

    const renderList = useCallback(() => {
        return (data || []).map((item: Project) => (
            <ListItem
                key={item.id}
                secondaryAction={
                    <IconButton edge="end" aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                }
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
                <List dense={true}>
                    {renderList()}
                </List>
            </Demo>
        </Grid>
    )
};

export default Projects;