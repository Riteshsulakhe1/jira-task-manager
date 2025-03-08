import React, { useCallback, memo } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppSelector } from '../../hooks';
import { TaskSelectItem, TaskType } from '../../Types/taskStaticProperties';

interface TaskTypeProps {
    type: TaskType;
    handleTypeChange: (event: SelectChangeEvent) => void;
}

const TaskTypeDropdown = memo((props: TaskTypeProps) => {

    const { type, handleTypeChange } = props;
    const taskTypes: TaskSelectItem[] = useAppSelector(state => state.taskStaticProperties.data?.taskType) || [];

    const renderTypes = useCallback(() => {
        return (
            taskTypes?.map((item: TaskSelectItem) => (
                <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
            ))
        )
    }, [taskTypes]);

    if (taskTypes?.length) {
        return (
            <FormControl fullWidth={true} sx={{ m: 0, maxWidth: '50%', minWidth: 120 }} size="small">
                <Select
                    labelId="task-type"
                    id="task-type-selectr"
                    value={type}
                    onChange={handleTypeChange}
                >
                    {renderTypes()}
                </Select>
            </FormControl>
        );
    } else {
        return null;
    }
});

export default TaskTypeDropdown;