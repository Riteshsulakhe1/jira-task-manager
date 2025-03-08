import React from 'react';
import Grid from "@mui/material/Grid"
import { BoardSprint } from "../../Types/board"
import { makeStyles } from '@mui/styles';

interface BoardHeaderProps {
    activeSprint: BoardSprint | null;
}
export const BordHeader = ({ activeSprint }: BoardHeaderProps) => {
    const classes = styles();
    if (!activeSprint?._id) return null;
    return (
        <div className={classes.heading}>
            <Grid item={true} xs={12}>
                {activeSprint?.name}
            </Grid>
        </div>
    )
};

const styles = makeStyles(() => ({
    heading: {
        height: '2rem',
        marginBottom: '0.25rem'
    }
}));