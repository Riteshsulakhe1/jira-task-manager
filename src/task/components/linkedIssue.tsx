import React, { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';
import { getTaskLinkedIssueType } from '../task.selector';
import { SelectOption } from '../../Types/common';

const LinkedIssue = () => {

    const linkedIssueTypeStatic = useAppSelector(getTaskLinkedIssueType);

    const [options, setOptions] = useState<Array<SelectOption>>([]);
    const [selectedValue, setSelectedValue] = useState('');

    useEffect(() => {
        setLinkedIssueTypeList();
    }, []);

    const setLinkedIssueTypeList = () => {
        const optionList: Array<SelectOption> = Object.entries(linkedIssueTypeStatic).map(([key, value]) => {
            return {
                label: key,
                value: value as string
            };
        });
        setOptions(optionList);
    }
    return null;
};
export default LinkedIssue;