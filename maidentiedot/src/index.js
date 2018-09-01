import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(
    <App restEndpoint='https://restcountries.eu/rest/v2/all' />, 
    document.getElementById('root')
);
