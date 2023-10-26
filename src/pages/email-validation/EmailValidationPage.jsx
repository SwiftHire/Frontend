// import React, { useEffect, useState } from 'react';
// import { Img, ImgContainer } from './EmailValidationPageStyled';
// import successImg from '../../assets/png/email-validation-success.png';
// import errorImg from '../../assets/png/email-validation-failure.png';
// import { useValidateEmail } from '../../hooks/useValidateEmail';
// import { PageLoader } from '../../../src/components/loaders';

// export const EmailValidationPage = () => {
//     // for email validation we receive a token in the url
//     const token = new URL(window.location).searchParams.get('token');
//     const [emailValidationStatus, setEmailValidationStatus] = useState(0);
//     const [isLoading, setLoading] = useState(true);
//     const validateEmail = useValidateEmail();
//     const successComponent = (
//         <ImgContainer>
//             <Img src={successImg} alt='image shown after the validation suceeds' />
//         </ImgContainer>
//     );
//     const errorComponent = (
//         <ImgContainer>
//             <Img src={errorImg} alt='image shown when the validation fails' />
//         </ImgContainer>
//     );
    
//     if (!token) return errorComponent;
    
//     useEffect(() => {
//         if (emailValidationStatus === 0) {
//             validateEmail(token).then(({ status }) => {
//                 setEmailValidationStatus(status);
//                 setLoading(false);
//             });
//         }
//     }, [token, isLoading]);
    
//     return isLoading ? <PageLoader /> : (emailValidationStatus === 200 ? successComponent : errorComponent);
// };

import React, { useEffect, useState } from 'react';
import { Img, ImgContainer } from './EmailValidationPageStyled';
import successImg from '../../assets/png/email-validation-success.png';
import errorImg from '../../assets/png/email-validation-failure.png';
import { useValidateEmail } from '../../hooks/useValidateEmail';
import { PageLoader } from '../../../src/components/loaders';
import { useNavigate } from 'react-router-dom';

export const EmailValidationPage = () => {
    // for email validation we receive a token in the url
    const token = new URL(window.location).searchParams.get('token');
    const [emailValidationStatus, setEmailValidationStatus] = useState(0);
    const [isLoading, setLoading] = useState(true);
    const validateEmail = useValidateEmail();
    const navigate = useNavigate();

    const redirectToSignIn = () => {
        setTimeout(() => {
            navigate('/sign-in');
        }, 3000); // Redirect after 3 seconds
    };

    const successComponent = (
        <ImgContainer>
            <Img src={successImg} alt='image shown after the validation succeeds' />
        </ImgContainer>
    );
    const errorComponent = (
        <ImgContainer>
            <Img src={errorImg} alt='image shown when the validation fails' />
        </ImgContainer>
    );
    
    if (!token) return errorComponent;
    
    useEffect(() => {
        if (emailValidationStatus === 0) {
            validateEmail(token).then(({ status }) => {
                setEmailValidationStatus(status);
                setLoading(false);
                if (status === 200) {
                    redirectToSignIn();
                }
            });
        }
    }, [token, isLoading]);
    
    return isLoading ? <PageLoader /> : (emailValidationStatus === 200 ? successComponent : errorComponent);
};


