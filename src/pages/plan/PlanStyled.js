import styled from 'styled-components';
import { Container } from 'react-bootstrap';

export const PlanContainer = styled(Container)`
    background-color: #f9fafb;
    border: 1px solid #f3f4f6;
    padding: 2% 0 2% 0;
    border-radius: 28px;
    max-width: 50%;
`;

export const Label = styled.span`
  font-family: DM Sans, Inter, Arial, sans-serif;
  font-weight: 400;
  line-height: 128%;
  color: #374151;
  margin-bottom: 2%;
`;

export const PlanImg = styled.img`
    width: 126px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
    -moz-border-radius: 50%;
    -webkit-border-radius: 50%;
    border-radius: 50%;
`;