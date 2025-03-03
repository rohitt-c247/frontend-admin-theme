import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
});

export const signupSchema = Yup.object().shape({
    name: Yup.string().min(3, 'Full name must be at least 3 characters').required('Full name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(20, 'Password must be at most 20 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$#!%*?&]{8,20}$/, 'Password must contain an uppercase letter, a lowercase letter, a number, and a special character')
        .required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
    phoneNumber: Yup.string().min(10, 'Phone number must be at least 10 characters').required('Phone number is required'),
});