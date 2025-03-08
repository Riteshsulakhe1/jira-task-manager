import React, { useCallback, useEffect, useState, memo } from 'react';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useAppSelector, useAppDispatch } from '../../hooks';
import { updateTaskStatus } from '../../Apis/task';
import { updateTaskInSprint } from '../../Backlog/backlog.slice';
import { UpdateTaskStatusReqBody } from '../../Types/task';
import { taskStatusListSelector } from '../../projects/projects.selector';
import { ProjectTaskStatus } from '../../Types/projects';

interface StatusDropdownProps {
    status: string;
    sprintId?: string;
    taskId?: string;
    variant?: 'standard' | 'outlined' | 'filled';
    handleStatusChange?: (event: SelectChangeEvent) => void;
}

const StatusDropdown = memo((props: StatusDropdownProps) => {
    // Destructure props
    const { status, taskId, sprintId, variant, handleStatusChange } = props;

    const [selectedStatus, setSelectedStaus] = useState<string>(status || '');
    const statusList: Array<ProjectTaskStatus> | null = useAppSelector(taskStatusListSelector);
    // const projectId = useAppSelector(state => state.project.selectedProject?.id);

    const dispatch = useAppDispatch();

    const onChangeHandler = (event: SelectChangeEvent) => {
        if (typeof handleStatusChange === 'function') {
            handleStatusChange(event);
        }
        const currentStatus = event.target.value as string;
        setSelectedStaus(currentStatus);
        updateCurrentStatus(currentStatus);
    };

    const updateCurrentStatus = async (currentStatus: string) => {
        if (taskId && sprintId) {
            const body: UpdateTaskStatusReqBody = {
                taskId,
                fromStatus: status,
                toStatus: currentStatus
            };
            const data = await updateTaskStatus(body);
            if (data) {
                dispatch(updateTaskInSprint({ task: data, taskId, sprintId }));
            }
        }
    }

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
        statusList?.length ? (
            <FormControl size="small" fullWidth={true} sx={{ m: 0, maxWidth: '50%', minWidth: 80 }}>
                <Select
                    labelId="task-status-label"
                    id="task-status"
                    value={selectedStatus}
                    onChange={onChangeHandler}
                    label={selectedStatus}
                    fullWidth={true}
                    variant={variant || 'standard'}
                >
                    {renderStatus()}
                </Select>
            </FormControl>
        ) : null
    )
});
export default StatusDropdown;