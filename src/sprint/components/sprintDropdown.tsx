import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectProjectSprintListSelector, selectedProjectIdSelector } from '../../projects/projects.selector';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { SprintList } from '../../Types/projects';
import MenuItem from '@mui/material/MenuItem';

interface SprintDropdownProps {
    sprintId?: string;
    handleSprintIdChange: (event: SelectChangeEvent) => void;
}
const SprintDropdown = ({ sprintId, handleSprintIdChange }: SprintDropdownProps) => {
    const selectedProjectId = useSelector(selectedProjectIdSelector);
    const sprintList = useSelector(selectProjectSprintListSelector);

    const renderSprintListItem = useCallback(() => {
        return (
            sprintList?.map((item: SprintList) => (
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
            ))
        )
    }, [sprintList]);

    return (
        sprintList.length ? (
            <FormControl fullWidth={true} sx={{ m: 0, maxWidth: '50%', minWidth: 120 }} size="small">
                <Select
                    labelId="sprint-list"
                    id="sprint-selectr"
                    value={sprintId}
                    onChange={handleSprintIdChange}
                >
                    {renderSprintListItem()}
                </Select>
            </FormControl>
        ) : null
    )
};
export default SprintDropdown;