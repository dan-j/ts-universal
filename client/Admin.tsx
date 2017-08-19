import React from 'react';
const styles = require('./admin.css');

interface AdminProps {

}

export default class Admin extends React.Component<AdminProps, {}> {

    render() {
        return (
            <div className={styles.admin}>
                Admin
            </div>
        );
    }
}
