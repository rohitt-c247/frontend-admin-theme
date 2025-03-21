import * as Yup from 'yup';

// Schema for creating new students (requires password)
export const userCreateValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Username must have at least 2 characters')
        .required('Username is required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    password: Yup.string()
        .min(8, 'Password must be at least 8 characters')
        .max(20, 'Password must be at most 20 characters')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$#!%*?&]{8,20}$/, 'Password must contain an uppercase letter, a lowercase letter, a number, and a special character')
        .required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm password is required'),
    phoneNumber: Yup.string()
        .required('Phone number is required'),
    gender: Yup.string()
        .required('Gender is required'),
    dob: Yup.date()
        .required('Date of birth is required'),
    status: Yup.string()
        .required('Status is required')
});

// Schema for editing existing students (password is optional)
export const userEditValidationSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Username must have at least 2 characters')
        .required('Username is required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email is required'),
    // Password is optional when editing
    password: Yup.string()
        .test('password-test', 'Password must meet requirements', function(value) {
            // No validation if field is empty
            if (!value || value.trim() === '') {
                return true;
            }
            
            // Only validate if non-empty
            const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$#!%*?&]{8,20}$/;
            if (value.length < 8) {
                return this.createError({ message: 'Password must be at least 8 characters' });
            }
            if (value.length > 20) {
                return this.createError({ message: 'Password must be at most 20 characters' });
            }
            if (!passwordRegex.test(value)) {
                return this.createError({ 
                    message: 'Password must contain an uppercase letter, a lowercase letter, a number, and a special character'
                });
            }
            return true;
        }),
    // Confirm password validation
    confirmPassword: Yup.string()
        .test('confirm-password-test', 'Passwords must match', function(value) {
            const { password } = this.parent;
            
            // If password is empty, confirmPassword should not be validated
            if (!password || password.trim() === '') {
                return true;
            }
            
            // If password has a value, confirmPassword must match
            if (!value && password) {
                return this.createError({ message: 'Confirm password is required' });
            }
            
            if (value !== password) {
                return this.createError({ message: 'Passwords must match' });
            }
            
            return true;
        }),
    phoneNumber: Yup.string()
        .required('Phone number is required'),
    gender: Yup.string()
        .required('Gender is required'),
    dob: Yup.date()
        .required('Date of birth is required'),
    status: Yup.string()
        .required('Status is required')
});