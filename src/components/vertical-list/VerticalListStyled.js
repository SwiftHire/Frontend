import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Title = styled.span`
  font-family: DM Sans, Inter, Arial, sans-serif;
  font-weight: 400;
  font-size: 2rem;
  line-height: 2.48rem;
  color: #000000;
  
  @media (max-width: 768px) {
    font-size: 3.5vw;
  }
`;

export const Description = styled.span`
  font-family: Inter, DM Sans, Arial, sans-serif;
  font-weight: 400;
  font-size: 1.125rem;
  line-height: 1.755rem;
  color: #4b5563;
  
  @media (max-width: 768px) {
    font-size: 2.5vw;
  }
`;

export const BackLink = styled(Link)`
    text-decoration: none;
    cursor: pointer;
`;