import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import {
    RowStyled,
    IconStyled,
    Title,
    Heading,
    Description,
    ExpandedDetails,
    ExpandedDescription,
} from './ListItemStyled';

export const ListItem = ({ title, heading, description, icon, details, history }) => {
    const [expand, setExpand] = useState(false);
    const handleExpand = (e) => {
        e.preventDefault();
        setExpand(!expand);
    };
    
    return (
        <>
            <RowStyled onClick={handleExpand}>
                <Col xs={2}>
                    <IconStyled src={icon}/>
                </Col>
                <Col xs={8}>
                    <Row>
                        <Col xs={12}>
                            <Title>{title}</Title>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Heading>{heading}</Heading>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={12}>
                            <Description>{description}</Description>
                        </Col>
                    </Row>
                </Col>
            </RowStyled>
            {expand && details?.length &&
                <ExpandedDetails open={expand}>
                    {details.map((detail, index) => (
                        <ExpandedDescription key={index}>
                            {`${detail.title}:    ${detail.description}`}
                        </ExpandedDescription>
                    ))}
                    {history?.length && history.map((generationData, index) => (
                        <ExpandedDescription key={index}>
                            {generationData.title}
                            {generationData.description}    -    {generationData.details}
                        </ExpandedDescription>
                    ))}
                </ExpandedDetails>
            }
        </>
    );
};