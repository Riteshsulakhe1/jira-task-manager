import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const CreateProject = () => {
    return (
        <Box
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
            }}
            noValidate
            autoComplete="off"
        >

            <div>
                <TextField
                    id="name"
                    label="Enter Project Name"
                    placeholder="Placeholder"
                    variant="standard"
                />
                <TextField
                    id="key"
                    label="Enter Project Key"
                    variant="standard"
                />
            </div>
        </Box>
    );
};
export default CreateProject;