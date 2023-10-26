import styled from 'styled-components';
import { Container } from 'react-bootstrap';

export const ResetPasswordContainer = styled(Container)`
    background-color: #f9fafb;
    border: 1px solid #f3f4f6;
    padding: 2% 0 2% 0;
    border-radius: 28px;
    max-width: 50%;
`;

export const ErrorMsg = styled.span`
  font-family: Inter, DM Sans, Arial, sans-serif;
  font-weight: 400;
  line-height: 148%;
  color: #e02424;
`;

export const Label = styled.span`
  font-family: DM Sans, Inter, Arial, sans-serif;
  font-weight: 400;
  line-height: 128%;
  color: #374151;
  margin-bottom: 2%;
`;

export const Input = styled.input`
  margin-top: 1%;
  width: 100%;
  max-width: 100%;
  padding: 1%;
  border: ${props => props?.error ? '1px solid #f8b4b4' : '1px solid #e5e7eb'};
  border-radius: 0.3rem;
  color: #1f2a37;
  overflow: hidden;
  font-family: Inter, DM Sans, Arial, sans-serif;
  font-weight: 400;
  line-height: 144%;
  text-transform: ${props => props?.capitalize ? 'capitalize' : 'none'};

  &:hover {
    border: 1px solid #9061f9;
  }

  &:focus {
    outline: none;
    border: 1px solid #9061f9;
  }

  &::placeholder {
    color: #9ca3af;
  }
`;

export const Title = styled.h1`
    font-family: DM Sans, Inter, Arial, sans-serif;
    font-weight: 500;
    line-height: 128%;
    color: #374151;
    margin-bottom: 2%;
`;