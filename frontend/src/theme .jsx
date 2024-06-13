import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#28b8b8',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#40E0D0',
    },
    error: {
      main: '#F76434',
    },
    warning: {
      main: '#FFA500',
    },
    info: {
      main: '#00CED1',
    },
    success: {
      main: '#008080',
    },
    background: {
      default: '#FFECB3',
    },
    text: {
      primary: '#333333',
      secondary: '#008080',
    },
    light:"#CFFAFA",
    teal:'#4AA088',
    yellowdark:'#FAAD00',
    steelBlue:"#335c6E"
  },

  typography: {
    fontFamily: 'Mulish, Arial, sans-serif',
  },
});

export default theme;
