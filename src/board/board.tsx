import { useEffect, useCallback, useRef, forwardRef, Ref } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getBoardEffect } from './board.effect';
import Loading from '../common/loading';
import Grid from '@mui/material/Grid';
import { BoardItem } from '../Types/board';
import BoardTaskCard from '../task/components/boardTaskCard';
import { Task } from '../Types/common';
import { makeStyles } from '@mui/styles';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';

interface RefType {
    current: HTMLElement | null;
}

const ParentCol = forwardRef((props: any, ref: any) => (
    <Grid {...props} ref={ref} />
));

const ChildCol = forwardRef((props: any, ref: any) => (
    <Grid {...props} ref={ref} />
));

const Board = () => {
    const dispatch = useAppDispatch();
    // Reducer states
    const selectedProject = useAppSelector(state => state.project.selectedProject);
    const { isLoading, err, data } = useAppSelector(state => state.board);

    const classes = styles();

    useEffect(() => {
        fetchBoard();
    }, [selectedProject]);

    const fetchBoard = async () => {
        if (selectedProject?.id) {
            dispatch(getBoardEffect(selectedProject?.id));
        }
    }

    const renderBordColumns = useCallback(() => {
        if (data?.board.length) {
            return data.board.map((item: BoardItem) => {
                return (
                    <ChildCol
                        item={true}
                        xs={4}
                        key={item._id}
                        classes={{ root: classes.statusCol }}
                    >
                        <Paper classes={{ root: classes.colTitle }}>
                            {item._id + `(${item.tasks.length})`}
                        </Paper>
                        {
                            item.tasks.map((task: Task) => (
                                <BoardTaskCard task={task} key={task._id} sprintId={data._id} />
                            ))
                        }
                    </ChildCol>
                )
            })
        } else {
            return null;
        }
    }, [data?.board]);

    return (
        <Container>
            {
                isLoading ? (
                    <Grid container={true} justifyContent={'center'} alignItems={'center'}>
                        <Loading size={30} />
                    </Grid>
                ) : null
            }
            <div className={classes.heading}>
                <Grid item={true} xs={12}>
                    {data?.name}
                </Grid>
            </div>
            <ParentCol container={true} spacing={2} classes={{ root: classes.parentCol }}>
                {renderBordColumns()}
            </ParentCol>
        </Container>
    )
};

export default Board;

const styles = makeStyles(theme => ({
    statusCol: {
        height: '100%',
        padding: '0.25rem',
        background: '#f7f8f9',
        paddingTop: '0px !important',
        paddingBottom: '2rem'
    },
    colTitle: {
        height: '5vh',
        backgroundColor: '#f7f8f9 !important',
        position: 'sticky',
        top: 0,
        zIndex: 1,
        borderRadius: '0px !important'
    },
    parentCol: {
        height: '78vh',
        overflow: 'auto',
    },
    heading: {
        marginBottom: '2rem'
    }
}));