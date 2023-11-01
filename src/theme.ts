import { createTheme } from '@mui/material/styles';
import { green, purple, grey } from '@mui/material/colors';

const theme = createTheme({
    palette: {
        primary: {
            main: '#ffff',
        },
        secondary: {
            main: '#0052CC',
        },
    },
    components: {
        MuiAccordion: {
            defaultProps: {
                style: {
                    backgroundColor: '#F4F5F7'
                }
            }
        },
        MuiButton: {
            defaultProps: {

                style: {
                    textTransform: 'capitalize'
                }
            }
        },
        MuiInputBase: {
            defaultProps: {
                style: {
                    border: '1 px solid #2684FF'
                }
            }
        },

    }
});
export default theme;