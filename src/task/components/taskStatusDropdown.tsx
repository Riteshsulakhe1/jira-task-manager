import { useCallback, useState } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Grid } from '@mui/material';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { updateTaskById, updateTaskStatus } from '../../Apis/task';
import { updateTaskInSprint } from '../../Backlog/backlog.slice';
import { UpdateTaskStatusReqBody } from '../../Types/task';
import { taskStatusListSelector } from '../../projects/projects.selector';
import { ProjectTaskStatus } from '../../Types/projects';

interface StatusDropdownProps {
    status: string;
    sprintId: string;
    taskId: string;
}

const StatusDropdown = ({ status, taskId, sprintId }: StatusDropdownProps) => {
    const [selectedStatus, setSelectedStaus] = useState<string>(status || '');
    const statusList: Array<ProjectTaskStatus> | null = useAppSelector(taskStatusListSelector);
    // const projectId = useAppSelector(state => state.project.selectedProject?.id);

    const dispatch = useAppDispatch();

    const handleChange = async (event: SelectChangeEvent) => {
        const currentStatus = event.target.value as string;
        setSelectedStaus(currentStatus);
        const body: UpdateTaskStatusReqBody = {
            taskId,
            fromStatus: status,
            toStatus: currentStatus
        };
        const data = await updateTaskStatus(body);
        if (data) {
            dispatch(updateTaskInSprint({ task: data, taskId, sprintId }));
        }
    };

    const renderStatus = useCallback(() => {
        if (statusList?.length) {
            return (
                statusList.map((status: ProjectTaskStatus) => (
                    <MenuItem key={status.id} dense={true} value={status.id}>
                        {status.name}
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