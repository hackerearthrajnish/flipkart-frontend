import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Divider, Grid, Snackbar, Typography, styled } from '@mui/material'
import React, { useContext, useEffect,useState } from 'react'
import TotalBalance from '../cart/TotalBalance'
import { CalculateDiscount, TotalAmount } from '../utils/CartCalculation'
import EmptyCart from '../cart/EmptyCart'
import { CheckOut, DeleteFromCart } from '../../service/api'
import { Datacontext } from '../../context/dataProvider'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
import MY_URL from '../../Constants/url'
import { useNavigate } from 'react-router-dom'
import { ToastContainer } from 'react-toast'
import CartItem from '../cart/CartItem'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';



const Container = styled(Grid)(({ theme }) => ({

    padding: '2em 3em',
    background: '#f0f0f0',
    justifyConent: 'evenly',
    [theme.breakpoints.down('md')]: {
        padding: '1em'
    }
}));

const Heading = styled(Typography)`
        text-transform : none;
        color : #878787;
        font-weight : 700;
       
`
const Header = styled(Box)`
    padding : 15px 20px;
`
const LeftContainer = styled(Grid)`
    background: #ffffff;
`





const RigthContainer = styled(Grid)(({ theme }) => ({

    background: '#ffffff',
    height: 'max-content',
    boxShadow: '2px 2px 2px',
    [theme.breakpoints.down('md')]: {
        margin: '1em 0'
    }
}))

const PaymentBox = styled(Box)({
    margin: '1em',

})

const Address = styled(Grid)({
    margin: '1em'
})

const OrderBtn = styled(Button)({
    textTransform: 'none',
    fontSize: '14px',
    background: 'green',
    padding: '2px',
    fontWeight: 600
})

const MakeOrder = () => {

    const { isUpdate } = useContext(Datacontext)
    let auth = JSON.parse(localStorage.getItem('user'))
    const { setisUpdate } = useContext(Datacontext)
    const [clientToken, setClientToken] = useState('')
    const [instance, setInstance] = useState('')
    const [address, setAddress] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [isChecked , setisChecked] = useState(false)
    const [isAddressSaved, setisAddressSaved] = useState(false)
    const [state, setState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const [msgState, setmsgState] = useState({
        open: false,
        vertical: 'top',
        horizontal: 'center',
    });
    const [paymentSnakbar, setpaymentSnakbar] = useState(false)
    const { open } = state;
    const [COD, setCOD] = useState(false)


    const handleClose = () => {
        setState({ ...state, open: false });
        setmsgState({ ...msgState, open: false })
    };


    // get payment getway token
    const getToken = async () => {
        try {
            const { data } = await axios.get(`${MY_URL}/braintree/token`)
            setClientToken(data)
        } catch (err) {
            alert(err)
            console.log(err)
        }
    }

    useEffect(() => {
        getToken()
    }, [auth?.name])


    const handleRemoveItem = async (product) => {

        if (auth) {
            try {
                await DeleteFromCart(product, setisUpdate)
                setisUpdate(pre => pre - 1)
            } catch (err) {
                console.log(err)
            }
        }
    }

    useEffect(() => {
        auth = JSON.parse(localStorage.getItem('user'))
    }, [isUpdate])

    const handlePayment = async () => {


        const amount = auth.amount
        const cartProducts = auth.cartProducts
        const address = auth.address
        const email = auth.email
        const name = auth.name

        try {
            setLoading(true)
            // const { nonce } = await instance.requestPaymentMethod()
            await fetch(`${MY_URL}/product/braintree/payment`, {

                method: 'POST',
                body: JSON.stringify({
                    amount, Product: cartProducts, address, email, name
                }),
                headers: {

                    "content-type": "application/json"
                }

            })
            console.log('yes')
            setLoading(false)
            try {
                await CheckOut(setisUpdate)
            }
            catch (err) {
                console.log(err)
            }
            navigate('/')
            setpaymentSnakbar(true)
            console.log('yes')

        } catch (err) {
            setLoading(false)
            console.log(err)
        }

    }

    const setDeliveryAddress = () => {

        if (address.length > 0) {

            auth.address = address
            localStorage.setItem('user', JSON.stringify(auth))
            // just of re-rendering the page
            setState({
                open: true,
                vertical: 'top',
                horizontal: 'center',
            });
            setisUpdate(pre => pre + 1)
            setCOD(true);
            setisAddressSaved(true)
        }
        else {
            alert("Please Enter Address First");
        }
    }

    const showMessage = () => {
        if (!auth || auth?.address === '') {

            setmsgState({
                open: true,
                vertical: 'top',
                horizontal: 'center',
            });
        }
    }
  

    return (
        <>
            {
                (auth && auth?.cartProducts.length) ?
                    <Container container justifyContent="space-around">
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            open={open}
                            onClose={handleClose}
                            autoHideDuration={2000}
                        >
                            <Alert severity="success" sx={{ width: '100%' }} onClose={handleClose}>Address Saved successfully</Alert>
                        </Snackbar>
                        <LeftContainer item lg={8} md={8} sm={12} xs={12}>
                            <Header>
                                <Heading>PLACE ORDER</Heading>
                            </Header>
                            <Divider sx={{ background: '#878787' }} />
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                >
                                    <Heading>DELIVERY ADDRESS</Heading>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Address container justifyContent='space-between'>
                                        <Grid item ls={8} md={8} sm={8} xs={10}>
                                            <input
                                                type='text'
                                                placeholder='Enter Delivery address'
                                                className='addressField m-2'
                                                onChange={(e) => setAddress(e.target.value)}
                                            />
                                        </Grid>

                                        <Grid item ls={3} md={3} sm={3} xs={12}>
                                            <button
                                                className='btn btn-success m-2'
                                                onClick={setDeliveryAddress}
                                                disabled={isAddressSaved || (address.length === 0)}
                                            >Save</button>

                                        </Grid>
                                    </Address>
                                </AccordionDetails>
                            </Accordion>

                            <Divider sx={{ background: '#878787' }} />
                            <Accordion>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                >
                                    <Heading>ORDER SUMMARY</Heading>
                                </AccordionSummary>
                                <AccordionDetails>
                                    {
                                        auth.cartProducts.map((item, index) => {
                                            return (
                                                <CartItem product={item} handleRemoveItem={handleRemoveItem} key={index} />
                                            )
                                        })
                                    }
                                </AccordionDetails>
                            </Accordion>

                            <Divider sx={{ background: '#878787' }} />
                            <Box className='m-3'>
                                <input type='checkbox' value='COD' id='COD'  onChange={(e)=> setisChecked(e.target.checked)} /> <b>Cash on Delivery</b>
                                <OrderBtn variant='contained' className='order-btn mx-2' onClick={handlePayment} disabled={ !isChecked|| address === '' || !COD}>Order</OrderBtn>
                            </Box>
                            <Divider sx={{ background: '#878787' }} />

                            {
                                clientToken ?
                                    <PaymentBox>
                                        <DropIn
                                            options={{
                                                authorization: clientToken,
                                                paypal: {
                                                    flow: 'vault'
                                                },
                                                googlePay: {
                                                    googlePayVersion: 2, // Specify the Google Pay version
                                                    merchantId: 'tk7v4f9m3m9b4snt', // Replace with your Google Pay merchant ID
                                                    transactionInfo: {
                                                        totalPriceStatus: 'FINAL',
                                                        totalPrice: '10.00', // Replace with the total price of the order
                                                        currencyCode: 'USD', // Replace with your currency code
                                                    },
                                                    allowedPaymentMethods: ['CARD', 'TOKENIZED_CARD'], // You can add additional allowed payment methods as needed
                                                    cardRequirements: {
                                                        // Specify card requirements as needed
                                                        allowedCardNetworks: ['VISA', 'MASTERCARD'],
                                                    },
                                                },
                                            }}
                                            onInstance={(instance) => setInstance(instance)}
                                        />

                                        <Snackbar
                                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                                            open={msgState.open}
                                            onClose={handleClose}
                                            autoHideDuration={2000}
                                        >
                                            <Alert severity="error" sx={{ width: '100%' }} onClose={handleClose}>Please Enter address first</Alert>
                                        </Snackbar>
                                        <button
                                            className='btn btn-success m-2'
                                            onClick={() => {
                                                showMessage()
                                                handlePayment()
                                            }
                                            }
                                            disabled={loading || !instance}
                                        >
                                            {loading ? 'Processing ...' : 'Make payment'}
                                        </button>
                                        <ToastContainer position='top-center' />
                                    </PaymentBox> :
                                    <div>client token is not found</div>
                            }
                        </LeftContainer>
                        <RigthContainer item lg={3} md={3} sm={12} xs={12} >
                            <TotalBalance
                                Amount={TotalAmount(auth.cartProducts)}
                                items={auth.cart}
                                discount={CalculateDiscount(auth.cartProducts)}
                            />

                        </RigthContainer>
                        <Snackbar
                            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                            open={paymentSnakbar}
                            onClose={handleClose}
                            autoHideDuration={2000}
                        >
                            <Alert severity="success" sx={{ width: '100%' }} onClose={handleClose}>Payment successfully</Alert>
                        </Snackbar>
                    </Container>

                    : auth ? <EmptyCart message='Your cart is empty!' des='Add items to it now.' islogedIn={true} /> :
                        <EmptyCart message='Missing Cart items?' des='Login to see the items you added previously' islogedIn={false} />
            }
        </>
    )
}

export default MakeOrder
