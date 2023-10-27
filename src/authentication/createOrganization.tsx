import { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { createOrg } from '../Apis/auth';

const CreateOrganization = () => {

    const [orgName, setOrgName] = useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setOrgName(event.target.value);
    };

    const onCreate = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const result = await createOrg({ name: orgName });
    };

    return (
        <Grid container={true}>
            <Grid item={true} xs={12}>
                <h4>Create Organization</h4>
            </Grid>
            <Grid item={true} xs={8}>
                <TextField
                    id="create-org"
                    label="Standard"
                    variant="standard"
                    color={'secondary'}
                    value={orgName}
                    fullWidth={true}
                    onChange={handleChange}
                />
            </Grid>
            <div>
                <Button variant="contained" color={'secondary'} onClick={onCreate}>
                    Create
                </Button>
            </div>
        </Grid>
    );
}
export default CreateOrganization;