import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { ColorModeScript } from '@chakra-ui/react';
import App from './App';
import reportWebVitals from './reportWebVitals';
import theme from './theme';
import { ChakraProvider } from '@chakra-ui/react';
import { GoArrowLeft } from 'react-icons/go';

ReactDOM.render(
    <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
    </ChakraProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
