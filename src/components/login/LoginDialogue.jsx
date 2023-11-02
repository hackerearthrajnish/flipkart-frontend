
import { Box, Button, Grid, TextField, Typography, styled } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import React, { useState, useContext, useRef } from 'react'
import { AuthenticationSignUp, AuthenticationLogin } from '../../service/api';
import { Datacontext } from '../../context/dataProvider.jsx';
import { useFormik } from 'formik'
import { SignUpSchema } from './Schema';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

const Wrapper = styled('form')({
    padding: '2em',
    overflow: 'auto'

})



const Component = styled(Grid)(({ theme }) => ({

    height: '450px',
    [theme.breakpoints.down('sm')]: {
        height: '500px'
    }
}))


const Image = styled(Grid)`
      padding:1em;
      background: #2874f0;
      width: 200px;
      flex-direction : column;
      display: flex;
      justify-content : space-between;
`
const Heading = styled(Typography)`
      text-transform : none;
      color : white ;
      font-size : 30px;
      font-weight: 600;
      
`;

const HeadingDescription = styled(Typography)`
        color: white;
        margin : 1em 0;
     
`;

const Input = styled(TextField)`
      width: 100% ;
      margin:  1em 0;
`
const LoginBtn = styled(Button)`
        text-transform: none;
        box-shadow: none;
         width : 100%;
         margin: 1em 0;
         font-weigth: 700;
         background: #fb641b;
         
`
const RegistrationBtn = styled(Button)`
        text-transform: none;
         width : 100%;
         margin: 1em 0;
         font-weigth: 700;
         background: #ffffff;
         color: #212121;
         
`
const ToggleBtn = styled(Typography)`
        text-transform : none;
        text-align: center;
        margin-top: 1em;
        color: #2874f0;
        cursor: pointer;
        font-weigth: 700;

`;
const Error = styled(Typography)`
    color : #FF0000;
`

const EyeBtn = styled('span')({
    float: 'right',
    marginTop: '-45px',
    marginRight: '10px',
    zIndex: 2,
    cursor: 'pointer',
    position: 'relative'

})



const initialValues = {
    name: "",
    email: "",
    phone: '',
    password: "",
    confirm_password: ""
}

const LoginDialogue = (props) => {
    const loginImgUrl = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/login_img_c4a81e.png'

    const { setAccount, setisUpdate } = useContext(Datacontext)
    const [toggle, setToggle] = useState(true)
    const [title, setTitle] = useState('Login')
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })
    const [description, setDescription] = useState('Get access to your Orders, Wishlist and Recommendations')
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)

    const passRef = useRef(null)
    const confirmPass = useRef(null)


    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({

        initialValues,
        validationSchema: SignUpSchema,

        onSubmit: async (value, action) => {
            try {
                let result = await AuthenticationSignUp(value)
                if (result) {

                    setAccount(value.name)
                    action.resetForm()
                    handleClose()
                }

            }
            catch (err) {
                console.warn(err)
            }
        }
    }

    )

    const manageShowPassword = () => {

        setShowPassword((pre) => {
            if (pre)
                return false
            else
                return true
        })


    }
    const manageShowConfirmPassword = () => {

        setShowConfirmPassword((pre) => {
            if (pre)
                return false
            else
                return true
        })


    }


    const handleClose = () => {
        props.handle(false)
    }



    const handleLogin = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value })
    }

    const Loginfun = async () => {
        try {
            let result = await AuthenticationLogin(loginData)
            setAccount(result.data.name)
            setisUpdate(pre => pre + 1)
            handleClose()

        }
        catch (err) {
            console.log(err)
        }
    }

    return (
        <Dialog open={props.isopen} onClose={handleClose}>
            <Component container>
                <Image item lg={4} md={4} sm={4} xs={12}>
                    <Box>
                        <Heading>{title}</Heading>
                        <HeadingDescription>{description}</HeadingDescription>
                    </Box>
                    <img src={loginImgUrl} alt='loginImage' id='loginImg' />
                </Image>
                {
                    toggle ?
                        <Grid item lg={8} md={8} sm={8} xs={12}>

                            <Wrapper onSubmit={handleSubmit}>
                                <Input
                                    variant="standard"
                                    label="Enter Email/Mobile number"
                                    onChange={handleLogin}
                                    name='email'
                                />
                                <Input
                                    variant="standard"
                                    label="Enter Password"
                                    onChange={handleLogin}
                                    name='password'
                                    type={showPassword ? 'text' : 'password'}
                                />
                                <EyeBtn className='Show-password' onClick={manageShowPassword} > {showPassword ? <VisibilityIcon sx={{ fontSize: 20 }} /> : <VisibilityOffIcon sx={{ fontSize: 20 }} />}</EyeBtn>
                                <Typography variant='body2'>By continuing, you agree to Flipkart's Terms of Use and Privacy Policy.</Typography>
                                <LoginBtn variant="contained" onClick={Loginfun}>Login</LoginBtn>
                                <Typography sx={{ textAlign: 'center' }}>OR</Typography>
                                <RegistrationBtn variant="contained">Request OTP</RegistrationBtn>
                                <ToggleBtn onClick={() => {
                                    setToggle(false);
                                    setTitle("Looks like you're new here!");
                                    setDescription('Sign up with your mobile number to get started')
                                }
                                }
                                >New to Flipkart? Create an account</ToggleBtn>
                            </Wrapper>
                        </Grid>
                        :
                        <Grid item lg={8} md={8} sm={8} xs={12}>

                            <Wrapper onSubmit={handleSubmit}>
                                <Input
                                    variant="standard"
                                    label="Enter Name"
                                    id='name'
                                    name='name'
                                    onChange={handleChange}
                                    value={values.name}
                                    onBlur={handleBlur}
                                />
                                {errors.name && touched.name ? <Error className='form-errors'>{errors.name}</Error> : null}

                                <Input
                                    variant="standard"
                                    label="Enter Email"
                                    name='email'
                                    value={values.email}
                                    placeholder='Enter your email'
                                    onBlur={handleBlur}
                                    onChange={handleChange}

                                />
                                {errors.email && touched.email ? <Error className='form-errors'>{errors.email}</Error> : null}
                                <Input
                                    variant="standard"
                                    label="Enter Mobile number"
                                    name='phone'
                                    value={values.phone}
                                    onBlur={handleBlur}
                                    onChange={handleChange}

                                />
                                {errors.phone && touched.phone ? <Error className='form-errors'>{errors.phone}</Error> : null}


                                <Input
                                    ref={passRef}
                                    variant="standard"
                                    label="Enter Password"
                                    name='password'
                                    autoComplete='off'
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    placeholder='Password'
                                    onBlur={handleBlur}
                                    onChange={(e) => {
                                        handleChange(e)
                                    }}

                                />
                                <EyeBtn className='Show-password' onClick={manageShowPassword} > {showPassword ? <VisibilityIcon sx={{ fontSize: 20 }} /> : <VisibilityOffIcon sx={{ fontSize: 20 }} />}</EyeBtn>

                                {errors.password && touched.password ? <Error className='form-errors'>{errors.password}</Error> : null}


                                <Input
                                    ref={confirmPass}
                                    variant="standard"
                                    label="Confirm Password"
                                    name='confirm_password'
                                    autoComplete='off'

                                    type={showConfirmPassword ? 'text' : 'password'}
                                    value={values.confirm_password}
                                    placeholder='Confirm Password'
                                    onBlur={handleBlur}
                                    onChange={handleChange}

                                />
                                <EyeBtn className='Show-password' onClick={manageShowConfirmPassword}>{showConfirmPassword ? <VisibilityIcon sx={{ fontSize: 20 }} /> : <VisibilityOffIcon sx={{ fontSize: 20 }} />}</EyeBtn>
                                {errors.confirm_password && touched.confirm_password ? <Error className='form-errors'>{errors.confirm_password}</Error> : null}

                                <LoginBtn variant="contained" type='submit'>Sign Up</LoginBtn>
                                <Typography sx={{ textAlign: 'center' }}>OR</Typography>
                                <ToggleBtn onClick={() => {
                                    setToggle(true);
                                    setTitle("Login");
                                    setDescription('Get access to your Orders, Wishlist and Recommendations')
                                }
                                }
                                >Existing User ? Login</ToggleBtn>
                            </Wrapper>
                        </Grid>
                }
            </Component>
        </Dialog>
    )
}

export default LoginDialogue
