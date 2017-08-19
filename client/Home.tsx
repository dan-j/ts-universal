import React from 'react';
const styles = require('./home.css');
interface HomeProps {

}

export default class Home extends React.Component<HomeProps, {}> {

    render() {
        return (
            <div className={styles.home}>
                Home
            </div>
        );
    }
}
