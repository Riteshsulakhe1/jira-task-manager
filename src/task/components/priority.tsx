import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import React, { useCallback, useEffect, useState, memo } from 'react';
import { useAppSelector } from '../../hooks';
import { getTaskPriorities } from '../task.selector';
import MenuItem from '@mui/material/MenuItem';
import { SelectOption } from '../../Types/common';

interface PriorityProps {
    priority: string;
    handlePriorityChange: (event: SelectChangeEvent) => void;
}
const Priority = memo(({ priority, handlePriorityChange }: PriorityProps) => {

    const taskPriority = useAppSelector(getTaskPriorities);

    const [taskPriorities, setTaskPriorities] = useState<Array<SelectOption>>([]);

    useEffect(() => {
        if (taskPriority) {
            const priorites: Array<SelectOption> = [];
            Object.entries(taskPriority).forEach(([key, value]) => {
                priorites.push({
                    label: key,
                    value: value as string
                });
            });
            setTaskPriorities(priorites);
        }
    }, [taskPriority]);

    const renderPriorities = useCallback(() => {
        if (taskPriorities.length) {
            return taskPriorities.map(item => (
                <MenuItem key={item.label} value={item.value}>{item.label}</MenuItem>
            ));
        }
        return null;
    }, [taskPriorities]);

    return (
        <FormControl fullWidth={true} sx={{ m: 0, maxWidth: '50%', minWidth: 120 }} size="small">
            <Select
                labelId="task-type"
                id="task-type-selectr"
                value={priority}
                onChange={handlePriorityChange}
            >
                {renderPriorities()}
            </Select>
        </FormControl>
    );
});

export default Priority;