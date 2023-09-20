import React, { useCallback, useEffect, useState } from 'react';
import { TaskStatus, TaskStatusItem } from '../Types/taskStaticProperties';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Grid } from '@mui/material';

interface StatusDropdownProps {
    status: TaskStatus
}

const StatusDropdown = (props: StatusDropdownProps) => {
    const [statusList, setStatusList] = useState<Array<TaskStatusItem>>([]);
    const [selectedStatus, setSelectedStaus] = useState<TaskStatus>(props.status || TaskStatus.TO_DO);

    useEffect(() => {
        const entries = Object.values(TaskStatus);
        const list: TaskStatusItem[] = entries.map((item: TaskStatus) => ({ label: item, value: item }));
        console.log('list', list);
        setStatusList(list);
    }, []);


    const handleChange = (event: SelectChangeEvent) => {
        setSelectedStaus(event.target.value as TaskStatus);
    };

    const renderStatus = useCallback(() => {
        if (statusList.length) {
            return (
                <>
                    {statusList.map((status) => (
                        <MenuItem dense={true} val>
                            {status.label}
                        </MenuItem>
                    ))}
                </>
            );
        } else {
            return null;
        }
    }, []);

    return (
        <>
            {
                statusList.length ? (
                    <Grid item={true} xs={12}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="task-staus"
                                value={selectedStatus}
                                onChange={handleChange}
                                label="Status"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                {renderStatus()}
                            </Select>
                        </FormControl>
                    </Grid>
                ) : null
            }
        </>
    )
};
export default StatusDropdown;