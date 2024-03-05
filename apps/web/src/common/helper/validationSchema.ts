import * as yup from 'yup';

export const validationSchema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup
    .string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  phone: yup
    .string()
    .min(12, 'Invalid Phone Number')
    .matches(/^[0-9]+$/, 'Invalid phone number')
    .required('Phone number is required'),
  storeId: yup.string().required('Store is required'),
});
