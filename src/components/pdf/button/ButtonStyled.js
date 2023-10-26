import styled from 'styled-components';

export const ButtonContainer = styled.div`
    text-align: center;
    align-content: center;
    justify-content: center;
    width: auto;
`;

export const ButtonStyled = styled.button`
  color: ${(props) => props?.theme === 'primary' ? '#ffffff' : '#9061f9' };
  background-color: ${(props) => props?.theme === 'primary' ? '#9061f9' : '#f6f5ff' };
  min-width:12.5rem;
  border: none;
  border-radius: 5px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-family: DM Sans, Arial;
  font-weight: 500;
  padding: ${(props) => props?.size === 'sm' ? '0.2rem 1rem' : '0.8rem 2.8rem' };
  display: flex;
  cursor: pointer;

  @media screen and (max-width: 991px) {
    padding: ${(props) => props?.size === 'sm' ? '0.1rem 0.5rem' : '0.4rem 1.4rem' };
  }
`;