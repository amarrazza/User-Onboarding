import * as yup from 'yup';

const formSchema = yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('Name required')
        .min(3, 'Name has to be longer than 3 characters'),
    email: yup
        .string()
        .email('Must be valid email')
        .required('Need to enter an email'),
    password: yup
        .string()
        .trim()
        .required('need to enter password')
        .min(3, 'password has to be longer than 3 characters'),
    terms: yup
        .boolean()
        .oneOf([true], 'Need to check')

})

export default formSchema