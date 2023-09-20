import { createTheme } from '@mui/material/styles';
import { green, purple, grey } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffff',
        },
        secondary: {
            main: green[500],
        },
    },
    components: {
        MuiAccordion: {
            defaultProps: {
                style: {
                    backgroundColor: '#F4F5F7'
                }
            }
        }
    }
});
export default theme;