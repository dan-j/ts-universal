import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import { createBrowserHistory } from 'history';
import App from './App';

import './index.css';

const history = createBrowserHistory();

const render = (Component: typeof App) => {
    ReactDOM.render(
        <AppContainer>
            <Component history={history} />
        </AppContainer>,
        document.getElementById('root'),
    );
};

render(App);

if (module.hot) {
    module.hot.accept('./App', () => {
        render(App);
    });
}

