import styled, { keyframes } from 'styled-components';

export const LoaderStyled = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 1rem;
`;

const waveAnimation = keyframes`
  50%,
  75% {
    transform: scale(2.5);
  }

  80%,
  100% {
    opacity: 0;
  }
`;

const Dot = styled.div`
    background-color: pink;
    border-radius: 50%;
    width: 1rem;
    height: 1rem;
    margin: 0 0.25rem;
`;

export const DotStyled = styled(Dot)`
  animation: ${waveAnimation} 1s linear infinite;
  animation-delay: ${(props) => props.delay};
  background-color: ${(props) => props.color};
`;