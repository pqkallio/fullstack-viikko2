import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css'

const db = 'http://localhost:3001/persons'

ReactDOM.render(<App db={db} />, document.getElementById('root'));