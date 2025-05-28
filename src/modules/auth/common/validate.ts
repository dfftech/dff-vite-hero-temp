import { AppProps } from '../../../utils/app.props';
// import { RegExp } from 'dff-util';

export const ForgotPasswordValidate = {
    email: {
        required: AppProps.MESSAGE_REQUIRED,
        minLength: { value: 2, message: AppProps.MESSAGE_MIN_LENGTH },
        maxLength: { value: 99, message: AppProps.MESSAGE_MAX_LENGTH },
        // pattern: {
        //     value: RegExp.EMAIL,
        //     message: AppProps.MESSAGE_INVALID_DATA,
        // },
    },
};

export const LoginValidate = {
    email: {
        required: AppProps.MESSAGE_REQUIRED,
        minLength: { value: 2, message: AppProps.MESSAGE_MIN_LENGTH },
        maxLength: { value: 99, message: AppProps.MESSAGE_MAX_LENGTH },
        // pattern: {
        //     value: RegExp.EMAIL,
        //     message: AppProps.MESSAGE_INVALID_DATA,
        // },
    },
    password: {
        required: AppProps.MESSAGE_REQUIRED,
        minLength: { value: 2, message: AppProps.MESSAGE_MIN_LENGTH },
        maxLength: { value: 99, message: AppProps.MESSAGE_MAX_LENGTH },
    },
};

export const SignUpValidate = {
    email: {
        required: AppProps.MESSAGE_REQUIRED,
        minLength: { value: 2, message: AppProps.MESSAGE_MIN_LENGTH },
        maxLength: { value: 99, message: AppProps.MESSAGE_MAX_LENGTH },
        // pattern: {
        //     value: RegExp.EMAIL,
        //     message: AppProps.MESSAGE_INVALID_DATA,
        // },
    },
    password: {
        required: AppProps.MESSAGE_REQUIRED,
        minLength: { value: 2, message: AppProps.MESSAGE_MIN_LENGTH },
        maxLength: { value: 99, message: AppProps.MESSAGE_MAX_LENGTH },
    },
    name: {
        required: AppProps.MESSAGE_REQUIRED,
        minLength: { value: 2, message: AppProps.MESSAGE_MIN_LENGTH },
        maxLength: { value: 99, message: AppProps.MESSAGE_MAX_LENGTH },
    },
    phone: {
        required: AppProps.MESSAGE_REQUIRED,
        minLength: { value: 2, message: AppProps.MESSAGE_MIN_LENGTH },
        maxLength: { value: 99, message: AppProps.MESSAGE_MAX_LENGTH },
    },
};