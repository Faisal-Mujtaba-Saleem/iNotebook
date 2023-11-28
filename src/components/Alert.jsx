import React, { useContext } from 'react'
import { AlertContext } from '../context/alerts/AlertContext';

export default function Alert(props) {
    const AlertUtilityFunction = (word) => {
        if (word === 'danger') {
            word = 'Error';
        }
        word = word ? word.toLowerCase() : '';
        return word.charAt(0).toUpperCase() + word.slice(1);
    }
    const { alert } = useContext(AlertContext);
    return (
        <div style={{ height: '50px' }}>
            {alert !== null &&
                <div>
                    <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
                        <strong>{AlertUtilityFunction(alert.type)}:</strong> {alert.msg}
                    </div>
                </div>}
        </div>
    )
}