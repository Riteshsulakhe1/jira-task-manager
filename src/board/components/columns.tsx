import React from "react";
import { SortableContext } from "@dnd-kit/sortable";
import Column from "./column";
import { ColumnItem } from "../../Types/board";
import { Grid } from "@mui/material";

interface ColumnsProps {
    sprintId: string;
    columns: Array<ColumnItem>;
    taskType: Array<string>;
}
const Columns = React.memo((props: ColumnsProps) => {
    const { sprintId, columns, taskType } = props;

    return (
        columns.length ?
            <SortableContext id={'columns-container'} items={columns.map(item => item._id)}>
                <Grid container={true}>
                    {
                        columns.map((column: ColumnItem) => (
                            <Column
                                column={column}
                                sprintId={sprintId}
                                taskType={taskType}
                            />
                        ))
                    }
                </Grid>
            </SortableContext>
            : null
    );
});

export default Columns;