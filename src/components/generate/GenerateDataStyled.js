import styled, { keyframes } from 'styled-components';
import {AiOutlineLoading3Quarters} from 'react-icons/ai';

const rotate = keyframes`
  100% {
    transform: rotate(360deg);
  }
`;

export const GenerateLoadingIcon = styled(AiOutlineLoading3Quarters)`
  animation: ${rotate} 1s infinite linear;
`;
export const RewriteLoadingIcon = styled(AiOutlineLoading3Quarters)`
  animation: ${rotate} 1s infinite linear;
`;

export const GenerateDataButtonContainer = styled.div`
    display:flex;
    gap:1rem;
    margin: 0 auto;
    @media (max-width: 768px) {
    flex-direction:column;
  }
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 5px;
  background-color: ${(props) => (props.primary ? '#a784f9' : '#F1EEF9')};
  color: ${(props) => (props.primary ? '#FFF' : ' #a784f9')};
  min-width: 120px;
  padding: 5px 10px 5px 10px;
  border: ${(props)=>(props.primary)? '0': '1px solid #a784f9'};
  outline: none;
  border-radius: 5px;
  font-weight: 500;
  &:hover {
    background-color:gray;
  }
`;

export const ActionBtnToolTip = styled.button`
    display: flex;
    align-items: center;
    gap: 5px;
    position: relative;
    color: #a784f9;
    min-width: 120px;
    padding: 5px 10px 5px 10px;
    border: 1px solid #a784f9;
    outline: none;
    border-radius: 5px;
    font-weight: 500;
    background-color: ${props => props.primary ? '#a784f9' : ''};
    color: ${props => props.primary ? '#FFF' : ''};
  &::after {
    content: "${props => props.tooltip}";
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.5rem;
    background-color: #000;
    color: #fff;
    border-radius: 0.25rem;
    font-size: 0.875rem;
    white-space: nowrap;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.2s, visibility 0.2s;
    display:${props=> props.show ? 'flex' : 'none'}
  }

  &:hover::after {
    opacity: 1;
    visibility: visible;
  }
`;

