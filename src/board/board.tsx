import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { getBoardEffect } from './board.effect';
import Loading from '../common/loading';
import Grid from '@mui/material/Grid';
import { ColumnItem } from '../Types/board';
import { Task } from '../Types/common';
import { makeStyles } from '@mui/styles';
import Container from '@mui/material/Container';
import { DndContext, DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { deepCopy } from '../common/utils';
import { BordHeader } from './components/boardHeader';
import EmptyScreen from './components/emptyScreen';
import Columns from './components/columns';
import DragOverlayTaskCard from './components/dragOverlayTaskCard';

const Board = () => {
    const dispatch = useAppDispatch();
    // Reducer states
    const selectedProject = useAppSelector(state => state.project.selectedProject);
    const { isLoading, err, data: activeSprint } = useAppSelector(state => state.board);
    const taskTypes = useAppSelector(state => state.taskStaticProperties?.data?.taskType);

    const classes = styles();

    // Component states
    const [taskType, setTaskType] = useState<Array<string>>([]);
    const [activeDraggingTask, setActiveDraggingTask] = useState<Task | null>(null);
    const [columns, setColumns] = useState<ColumnItem[]>([]);

    useEffect(() => {
        fetchBoard();
    }, [selectedProject]);

    useEffect(() => {
        if (taskTypes?.length) {
            const types = taskTypes.map(item => item.value);
            setTaskType(types);
        }
    }, [taskTypes]);

    useEffect(() => {
        if (activeSprint?.board?.length) {
            setColumns(activeSprint.board);
        } else if (columns.length) {
            setColumns([]);
        }
    }, [activeSprint]);

    const fetchBoard = async () => {
        if (selectedProject?.id) {
            dispatch(getBoardEffect(selectedProject?.id));
        }
    };

    const handleDragStart = (event: DragStartEvent) => {
        console.log('drag start==>', event);
        const taskId = event.active.id as string;
        const colId = event.active.data.current?.sortable?.containerId;
        const task = getTaskByColIdAndTaskId(colId, taskId);
        setActiveDraggingTask(task || null);
    }

    const getTaskByColIdAndTaskId = (colId: string, taskId: string) => {
        let task;
        if (colId && taskId) {
            const column = columns.find((col: ColumnItem) => col._id === colId);
            if (column?._id) {
                task = column.tasks.find(task => task._id === taskId);
            }
        }
        return task;
    };

    const handleDragEnd = (event: DragEndEvent) => {
        console.log('on drag end==>', event);
        const { active, over } = event;
        if (over && active) {
            // Move columns
            const allColumns: Array<ColumnItem> = JSON.parse(JSON.stringify(columns));
            if (active.data.current?.type === 'column') {
                const column = deepCopy(allColumns[active.data.current?.sortable.index]);
                allColumns.splice(active.data.current?.sortable.index, 1);
                allColumns.splice(over.data.current?.sortable.index, 0, column);
            } else {
                // Move task between the columns
                // Get the current active task
                const sourceColIndex = getColumnIndex(active.data.current?.sortable.containerId);
                const task: Task = { ...allColumns[sourceColIndex].tasks[active.data.current?.sortable.index] };

                // Remove from source column
                if (sourceColIndex >= 0) {
                    allColumns[sourceColIndex].tasks.splice(active.data.current?.sortable.index, 1);
                }

                // Move task to destination
                const isDroppedOnColumn = isDestinationTypeColumn(over.id as string);
                if (isDroppedOnColumn) {
                    const destinationColIndex = getColumnIndex(over.id as string);
                    allColumns[destinationColIndex].tasks.push(task);
                } else {
                    const destinationColIndex = getColumnIndex(over.data.current?.sortable.containerId);
                    allColumns[destinationColIndex].tasks.splice(over.data.current?.sortable.index, 0, task);
                }
            }
            setColumns(allColumns);
            setActiveDraggingTask(null);
        }
    }

    const isDestinationTypeColumn = (id: string) => {
        return getColumnIndex(id) >= 0;
    }

    const getColumnIndex = (colId: string) => {
        return columns.findIndex(col => col._id === colId);
    }


    return (
        <Container>
            {
                isLoading ? (
                    <Grid container={true} justifyContent={'center'} alignItems={'center'}>
                        <Loading size={30} />
                    </Grid>
                ) : columns.length ? (
                    <>
                        <BordHeader activeSprint={activeSprint} />
                        <DndContext
                            onDragEnd={handleDragEnd}
                            onDragStart={handleDragStart}
                        >
                            <Grid container={true} spacing={2} classes={{ root: classes.parentCol }}>
                                <Columns
                                    columns={columns}
                                    sprintId={activeSprint?._id || ''}
                                    taskType={taskType}
                                />
                                <DragOverlayTaskCard
                                    activeDraggingTask={activeDraggingTask}
                                    sprintId={activeSprint?._id || ''}
                                />
                            </Grid>
                        </DndContext>
                    </>
                ) : (
                    <EmptyScreen />
                )
            }
        </Container>
    )
};

export default Board;

const styles = makeStyles(theme => ({
    parentCol: {
        height: '78vh',
        overflow: 'auto',
    },
}));