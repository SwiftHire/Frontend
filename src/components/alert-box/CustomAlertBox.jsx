import React, { useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import Zoom from '@mui/material/Zoom';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export const CustomAlertBox = ({ severity, onClose, message, timeout }) => {
    const severities = {
        error: 'Error',
        warning: 'Warning',
        info: 'Info',
        success: 'Success',
    };

    useEffect(() => {
        if (onClose && timeout) {
            setTimeout(() => {
                onClose();
            }, timeout);
        }
    }, [onClose, timeout]);

    return (
        <Row style={{ marginTop: '2%' }}>
            <Col xs={10}>
                <Zoom in={true}>
                    <Alert severity={severity} onClose={onClose}>
                        <AlertTitle>{severities[severity]}</AlertTitle>
                        {message}
                    </Alert>
                </Zoom>
            </Col>
        </Row>
    );
};