import React from 'react';
import { Row, Col } from 'react-bootstrap';
import {
    LoaderStyled,
    DotStyled,
} from './LoaderStyled';

export const Loader = () => (
    <Row style={{ marginTop: '2%', padding: '5%' }}>
        <Col xs={12}>
            <LoaderStyled>
                <DotStyled delay='0s' color='#f6f5ff'/>
                <DotStyled delay='0.2s' color='#edebfe'/>
                <DotStyled delay='0.4s' color='#dcd7fe'/>
                <DotStyled delay='0.6s' color='#cabffd'/>
                <DotStyled delay='0.8s' color='#ac94fa'/>
                <DotStyled delay='1s' color='#9061f9'/>
                <DotStyled delay='1.2s' color='#7e3af2'/>
                <DotStyled delay='1.2s' color='#6c2bd9'/>
                <DotStyled delay='1.4s' color='#5521b5'/>
                <DotStyled delay='1.6s' color='#4a1d96'/>
            </LoaderStyled>
        </Col>
    </Row>
);