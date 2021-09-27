import React from './core/MimicReact.js';
// import Redux from './core/MimicRedux.js';
import './common/reset.css';
import './app.scss';

function App() {
    return React.createElement('div', {}, 'HELLOWORLD');
}

React.render(App(), document.querySelector('#app'));