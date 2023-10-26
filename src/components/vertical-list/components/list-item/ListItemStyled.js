import styled from 'styled-components';
import { Row } from 'react-bootstrap';

export const RowStyled = styled(Row)`
  margin-top: 8%;
  margin-left: 0.1%;
  padding: 1%;
  max-width: 100%;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  cursor: pointer;
  color: #000000;

  &:hover {
    border: 1px solid #9061f9;
  }
`;

export const IconStyled = styled.img`
  max-width: 100%;
  max-height: 100%;
  margin: 20%;
  width: 2rem;
  height: 2rem;
  object-fit: fill;

  @media (max-width: 768px) {
    width: 1.75rem;
    height: 1.75rem;
  }
`;

export const Title = styled.span`
  font-family: DM Sans, Inter, Arial, sans-serif;
  font-weight: 400;
  font-size: 2rem;
  color: #000000;
`;

export const Heading = styled.span`
  font-family: Inter, DM Sans, Arial, sans-serif;
  font-weight: 400;
  font-size: 1.125rem;
  color: #000000;
`;

export const Description = styled.span`
  font-family: Inter, DM Sans, Arial, sans-serif;
  font-weight: 400;
  font-size: 1.125rem;
  color: #4b5563;
`;

export const BetaBadge = styled.span`
  opacity: ${props => props?.available ? '1' : '0.3'};
  max-width: 100%;
  width: 100%;
  height: auto;
  background-color: #0E9F6E;
  color: white;
  border-radius: 0.4rem;
  padding: 2% 4% 2% 4%;
`;

export const ExpandedDetails = styled.div`
  background-color: #f9fafb;
  display: ${props => props?.open ? 'flex' : 'none'};
  box-sizing: border-box;
  margin: -2% 0 2% 1px;
  padding: 1.12rem;
  min-width: 100%;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  border: 1px solid #e5e7eb;
  border-top: none;
  border-radius: 0 0 10px 10px;
  display: flex;
  flex-direction: column;
`;

export const ExpandedDescription = styled.span`
    padding-top: 5px;
    text-align: justify;
    color: #374151;
    font-family: Inter, Arial;
    font-weight: 400;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-word;
`;