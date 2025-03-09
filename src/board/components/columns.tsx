import React from "react";
import { SortableContext } from "@dnd-kit/sortable";
import Column from "./column";
import { ColumnItem } from "../../Types/board";
import IconButton from '@mui/material/IconButton';
import AddIcon from "@mui/icons-material/Add";
import { makeStyles } from "@mui/styles";

interface ColumnsProps {
    sprintId: string;
    columns: Array<ColumnItem>;
    taskType: Array<string>;
}
const Columns = React.memo((props: ColumnsProps) => {
    const { sprintId, columns, taskType } = props;

    const classes = useStyles();
    return (
        <>
            {
                columns.length ?
                    <SortableContext id={'columns-container'} items={columns.map(item => item._id)}>
                        {
                            columns.map((column: ColumnItem) => (
                                <Column
                                    key={column._id}
                                    column={column}
                                    sprintId={sprintId}
                                    taskType={taskType}
                                />
                            ))
                        }
                    </SortableContext>
                    : null
            }
            <div className={classes.addColumn}>
                <IconButton>
                    <AddIcon />
                </IconButton>
            </div>
        </>
    );
});

const useStyles = makeStyles({
    addColumn: {
        position: 'sticky',
        top: 0,
        zIndex: 1,
        background: '#f7f8f9',
    }
})
export default Columns;