import { useCallback, useState } from 'react';
import { TaskStatus, TaskStatusItem } from '../Types/taskStaticProperties';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Grid } from '@mui/material';
import { useAppSelector } from '../hooks';

interface StatusDropdownProps {
    status: TaskStatus
}

const StatusDropdown = (props: StatusDropdownProps) => {
    console.log('props', props);
    const [selectedStatus, setSelectedStaus] = useState<TaskStatus>(props.status || TaskStatus.TO_DO);
    const statusList = useAppSelector(state => state.taskStaticProperties.data?.taskStatus);


    const handleChange = (event: SelectChangeEvent) => {
        setSelectedStaus(event.target.value as TaskStatus);
    };

    const renderStatus = useCallback(() => {
        if (statusList?.length) {
            return (
                statusList.map((status) => (
                    <MenuItem key={status.value} dense={true} value={status.value}>
                        {status.label}
                    </MenuItem>
                ))
            );
        } else {
            return null;
        }
    }, []);

    return (
        <>
            {
                statusList?.length ? (
                    <Grid item={true} xs={12}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 80 }}>
                            <Select
                                labelId="task-status-label"
                                id="task-status"
                                value={selectedStatus}
                                onChange={handleChange}
                                label={selectedStatus}
                                variant="standard"
                            >
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