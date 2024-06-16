import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import ApolloWrapper from './apolloClient';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={theme}>
    <ApolloWrapper>
      <App />
    </ApolloWrapper>
  </ThemeProvider>
);
