import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import ErrorBoundary from './components/ErrorBoundary/index.jsx';

ReactDOM.render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>
    ,
    document.querySelector("#root")
)
// 热模块
if (module.hot) {
    module.hot.accept();
}

// ReactDOM.render(
//     React.createElement('div', { className: 'title' }, "zheshishaya"),
//     document.querySelector("#root")
// )