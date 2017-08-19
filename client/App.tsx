import React from 'react';
import * as history from 'history';
import universal from 'react-universal-component';

const styles = require('./App.css');

interface AppProps {
    name?: String;
    history: history.History;
}


const Home = universal(() => import('./Home'), {
    minDelay: 1200,
    loading: <div>loading</div>,
    error: <div>Error</div>,
});

const Admin = universal(() => import('./Admin'), {
    minDelay: 1200,
    loading: <div>loading</div>,
    error: <div>Error</div>,
});

export default class App extends React.Component<AppProps, {}> {

    static defaultProps = {
        name: 'World',
    };

    goHome = () => {
        this.props.history.push('/home');
        this.setState({});
    };

    goAdmin = () => {
        this.props.history.push('/admin');
        this.setState({});
    };

    render() {
        const { name, history } = this.props;
        const { location } = history;
        return (
            <div>
                <p className={styles.greeting}>Hello, {name}</p>
                {location.pathname === '/home' && <Home />}
                {location.pathname === '/admin' && <Admin />}
                <button onClick={this.goHome}>
                    home
                </button>
                <button onClick={this.goAdmin}>
                    admin
                </button>
            </div>
        );
    }
}
