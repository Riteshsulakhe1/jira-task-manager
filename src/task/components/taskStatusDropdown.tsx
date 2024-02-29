import { useCallback, useState } from 'react';
import { TaskStatus, TaskSelectItem } from '../../Types/taskStaticProperties';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Grid } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { updateTaskById } from '../../Apis/task';
import { updateTaskInSprint } from '../../Backlog/backlog.slice';

interface StatusDropdownProps {
    status: TaskStatus;
    sprintId: string;
    taskId: string;
}

const StatusDropdown = ({ status, taskId, sprintId }: StatusDropdownProps) => {
    const [selectedStatus, setSelectedStaus] = useState<TaskStatus>(status || TaskStatus.TO_DO);
    const statusList = useAppSelector(state => state.taskStaticProperties.data?.taskStatus);
    // const projectId = useAppSelector(state => state.project.selectedProject?.id);

    const dispatch = useAppDispatch();

    const handleChange = async (event: SelectChangeEvent) => {
        const currentStatus = event.target.value as TaskStatus;
        setSelectedStaus(currentStatus);
        const data = await updateTaskById({ status: currentStatus, _id: taskId });
        if (data) {
            dispatch(updateTaskInSprint({ task: data, taskId, sprintId }));
        }
    };

    const renderStatus = useCallback(() => {
        if (statusList?.length) {
            return (
                statusList.map((status: TaskSelectItem) => (
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
                        <FormControl variant="standard" sx={{ m: 0, minWidth: 80 }}>
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