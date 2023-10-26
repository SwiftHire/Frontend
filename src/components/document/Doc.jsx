import React from 'react';
// import { Col, Row } from 'react-bootstrap';
import {
    DocFrame,
    DocContainer,
} from './DocStyled';

export const Doc = ({ file }) => {
    return (
        <DocContainer>
            <div>
                <div>
                    <DocFrame
                        title='Terms'
                        src={file}
                    />
                </div>
            </div>
        </DocContainer>
    );
}