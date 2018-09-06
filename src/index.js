import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './site.css';
import './finderjs.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
