import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import {
    Description,
    Title,
    BackLink,
} from './VerticalListStyled';
import { ListItem } from './components/list-item/ListItem';
import arrowLeftIcon from '../../assets/svg/arrow-left.svg';

export const VerticalList = ({ title, description, items }) => {
    return (
        <Container>
            <Row style={{ marginTop: '5%' }}>
                <Col xs={12}>
                    <BackLink to='/profile'>
                        <img src={arrowLeftIcon} alt='arrow left icon to get to the previous page'/>
                    </BackLink>
                </Col>
            </Row>
            <Row style={{ marginTop: '5%' }}>
                <Col xs={7}>
                    <Title>{title}</Title>
                </Col>
            </Row>
            <Row>
                <Col xs={8}>
                    <Description>{description}</Description>
                </Col>
            </Row>
            <Row style={{ marginBottom: '5%' }}>
                <Col xs={12}>
                    {items.map((item, index) => (
                        <ListItem
                            key={index}
                            title={item.title}
                            heading={item.heading}
                            description={item.description}
                            icon={item.image}
                            details={item.details}
                            history={item.history}
                        />
                    ))}
                </Col>
            </Row>
        </Container>
    );
};