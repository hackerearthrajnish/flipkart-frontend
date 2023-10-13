import * as Yup from 'yup'
import YupPassword from 'yup-password'
YupPassword(Yup)

export const SignUpSchema = Yup.object({
    name: Yup.string().min(2).max(20).required('Please Enter Your Name'),
    email:Yup.string().email().required("Please enter email"),
    phone :Yup.string().min(10).max(12).required('Please Enter phone number'),
    password: Yup.string().password().required("Please enter password"),
    confirm_password : Yup.string().required().oneOf([Yup.ref('password'),null],'Password must matched ')
})
