import * as Yup from 'yup';

const REQUIRED_TXT = 'This field is required';
const EMAIL_TXT = 'Must be a valid email';

const PASSWORD_VALIDATION_MESSAGE = 'Password must be 8-20 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character without spaces';

const passwordValidation = Yup.string()
    .min(8, PASSWORD_VALIDATION_MESSAGE)
    .max(20, PASSWORD_VALIDATION_MESSAGE)
    .matches(/[a-z]/, PASSWORD_VALIDATION_MESSAGE)
    .matches(/[A-Z]/, PASSWORD_VALIDATION_MESSAGE)
    .matches(/\d/, PASSWORD_VALIDATION_MESSAGE)
    .matches(/[!@#$%^&*(),.?":{}|<>]/, PASSWORD_VALIDATION_MESSAGE)
    .matches(/^[^\s]+$/, PASSWORD_VALIDATION_MESSAGE)
    .required(REQUIRED_TXT);

export const SignUpFormSchema = Yup.object({
    name: Yup.string().required(REQUIRED_TXT),
    email: Yup.string().email(EMAIL_TXT).required(REQUIRED_TXT),
    password: passwordValidation,
    passwordRepeated: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .required(REQUIRED_TXT),
});

export const LoginFormSchema = Yup.object({
    email: Yup.string().email(EMAIL_TXT).required(REQUIRED_TXT),
    password: passwordValidation,
});

export const PasswordChangeFormSchema = Yup.object({
    password: passwordValidation,
    currentPassword: Yup.string().required(REQUIRED_TXT),
    passwordRepeated: Yup.string()
        .oneOf([Yup.ref('currentPassword'), null], 'Passwords must match')
        .required(REQUIRED_TXT),
});


export const linkedinFormSchema = Yup.object({
    name: Yup.string().required(REQUIRED_TXT),
    email: Yup.string().email(EMAIL_TXT).required(REQUIRED_TXT),
    nextJobTitle: Yup.string().required(REQUIRED_TXT),
    jobDescription: Yup.string().required(REQUIRED_TXT),
    linkedin: Yup.string().required(REQUIRED_TXT),
});
export const FileUploadFormSchema = Yup.object({
    name: Yup.string().required(REQUIRED_TXT),
    email: Yup.string().email(EMAIL_TXT).required(REQUIRED_TXT),
    JobTitle: Yup.string().required(REQUIRED_TXT),
    jobDescription: Yup.string().required(REQUIRED_TXT),
    pdf: Yup.mixed().required(REQUIRED_TXT),
});
export const CoverLetterFormSchema = Yup.object({
    name: Yup.string().required(REQUIRED_TXT),
    email: Yup.string().email(EMAIL_TXT).required(REQUIRED_TXT),
    nextJobTitle: Yup.string().required(REQUIRED_TXT),
    jobDescription: Yup.string().required(REQUIRED_TXT),
    languageOptions:Yup.string(),
    skills:Yup.string().required(REQUIRED_TXT),
    yearsOfExperience:Yup.string().required(REQUIRED_TXT)
});

