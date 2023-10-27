import { useCallback } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppSelector } from '../../hooks';
import { TaskSelectItem } from '../../Types/taskStaticProperties';

interface TaskTypeProps {
    type: string;
    handleTypeChange: (event: SelectChangeEvent) => void;
    showLabel?: boolean
}

const TaskType = (props: TaskTypeProps) => {

    const { type, handleTypeChange, showLabel } = props;
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
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                {showLabel ? <InputLabel id="task-type">Type</InputLabel> : null}
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
}

export default TaskType;