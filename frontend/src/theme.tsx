import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#335c6E', // Steel Blue
    },
    secondary: {
      main: '#40E0D0', // Turquoise
    },
    error: {
      main: '#F76434', // orange red
    },
    warning: {
      main: '#FABD33', // Yellow
    },
    info: {
      main: '#28B8B8', // Dark Turquoise
    },
    success: {
      main: '#008080', // Teal
    },
    background: {
      default: '#FFECB3', // Light Yellow
    },
    text: {
      primary: '#335c6E', // Dark Gray
      secondary: '#008080', // Teal
      white: '#FFFFFF', // White
    },
  },
  typography: {
    fontFamily: 'Mulish, Arial, sans-serif',
  },
});

export default theme;
