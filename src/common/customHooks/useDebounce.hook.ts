import React, { useEffect, useState } from 'react';

let timerId: any = 0;
const useDebounceHook = (input: string, debounce: number) => {

    const [value, setValue] = useState('');

    useEffect(() => {
        if (timerId) {
            clearTimeout(timerId);
        }

        timerId = setTimeout(() => {
            setValue(input);
        }, debounce);
    }, [input]);

    return value;
};

export default useDebounceHook;