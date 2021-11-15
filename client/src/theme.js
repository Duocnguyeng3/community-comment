import { red, orange } from '@material-ui/core/colors';
import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  status: {
    danger: orange[500],
  },
  palette: {
    neutral: {
      main: '#64748B',
      contrastText: '#fff',
    },
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
    tertiary: {
      main: '#9c27b0',
    },
    error: {
      // main: red.A400,
      main: '#000',
    },
    contrastThreshold: 3,
    tonalOffset: 0.2,
  },
});

export default theme;
