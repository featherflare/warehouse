import React, { useState, useEffect } from 'react';
import { emitCustomEvent } from 'react-custom-events';
import QrReader from 'react-qr-scanner'

const QrcodeLogIn = () => {
    const defaultState = [{
        result: 'No result'
    }]
    const [data, setData] = useState(defaultState);
    const [{ result }] = data

    const handleScan = (data) => {
        try {
            var scaning = [
                {
                    result: data.text,
                }
            ];
        } catch {
            var scaning = [
                {
                    result: data,
                }
            ];
        }

        if (data) {
            setData(scaning);
        }
    }

    const handleError = (err) => {
        console.log(err);
    }

    useEffect(() => {
        if (result !== 'No result') {
            emitCustomEvent('LOGIN', result);
        }
    }, [result]);

    return (
        <div>
            <QrReader 
                delay={300} 
                onError={handleError} 
                onScan={handleScan} 
                style={{height: 240, width: 320}} 
            />
        </div>
    );
};

export default QrcodeLogIn;
