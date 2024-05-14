import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";
import { Draggable, Droppable } from "../../common/dragDropHelper";
import Paper from "@mui/material/Paper";
import { Task } from "../../Types/common";
import ColumnTaskCard from "./columnTaskCard";
import { SortableContext } from "@dnd-kit/sortable";
import { ColumnItem } from "../../Types/board";

interface ColumnProps {
    column: ColumnItem;
    sprintId: string;
    taskType: string[];
}
const Column = (props: ColumnProps) => {
    const { column, sprintId, taskType } = props;
    const classes = useStyles();

    return (
        <Grid
            item={true}
            xs={3}
            key={column._id}
            classes={{ root: classes.statusCol }}
        >
            <Draggable id={column._id} data={{ type: 'column' }}>
                <Droppable id={column._id} data={{ accepts: taskType }}>
                    <Paper classes={{ root: classes.colTitle }}>
                        {column.name + `(${column.tasks.length})`}
                    </Paper>
                    <SortableContext id={column._id} items={column.tasks.map(tsk => tsk._id)}>
                        {
                            column.tasks.map((task: Task, index: number) => (
                                <Draggable id={task._id} key={task._id} data={{ type: task.type }}>
                                    <ColumnTaskCard task={task} sprintId={sprintId} />
                                </Draggable>
                            ))
                        }
                    </SortableContext>
                </Droppable>
            </Draggable>
        </Grid>
    )
}
const useStyles = makeStyles(theme => ({
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
}));
export default Column;