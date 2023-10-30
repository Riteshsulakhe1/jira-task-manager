import { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { createOrg } from '../Apis/auth';
import { useNavigate } from 'react-router-dom';
import { RouteKeys } from '../navigation/routekeys';
import { SnackbarInfo } from '../Types/common';
import SnackbarAlert from '../common/snackbar';
import { useAppSelector } from '../hooks';
import Loading from '../common/loading';

const CreateOrganization = () => {

    const navigate = useNavigate();

    const { userInfo } = useAppSelector(state => state.auth);

    const [orgName, setOrgName] = useState('');
    const [snackbar, setSnackbar] = useState<SnackbarInfo>({ message: '', severity: 'success' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (userInfo?.orgId) {
            navigateToProjects();
        }
    }, [userInfo]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setOrgName(event.target.value);
    };

    const onCreate = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const result = await createOrg({ name: orgName });
        if (result.org) {
            setSnackbar({ message: result.message });
            navigateToProjects();
        } else {
            const message = result.response.data?.message || 'Fail to create organization';
            setSnackbar({ message, severity: 'error' });
        }
    };

    const navigateToProjects = () => {
        navigate(RouteKeys.project);
    };

    const onCloseSnackbar = () => {
        setSnackbar({ message: '' });
    };

    return (
        <Grid container={true}>
            <SnackbarAlert {...snackbar} onClose={onCloseSnackbar} />
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
                    {loading ? <Loading size={15} /> : 'Create'}
                </Button>
            </div>
        </Grid>
    );
}
export default CreateOrganization;