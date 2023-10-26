import * as React from 'react';
import { ButtonContainer, ButtonStyled } from './ButtonStyled';

export const Button = (props) => (
    <ButtonContainer>
        <ButtonStyled
            size={props.size}
            theme={props.theme}
            onClick={props.onClick}
        >
            {props.buttonText}
        </ButtonStyled>
    </ButtonContainer>
);