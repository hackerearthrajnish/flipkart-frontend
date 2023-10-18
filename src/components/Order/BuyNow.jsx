import { Accordion, AccordionDetails, AccordionSummary, Alert, Box, Divider, Grid, Snackbar, Tooltip, Typography, styled } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import TotalBalance from '../cart/TotalBalance'
import { CheckOut} from '../../service/api'
import { Datacontext } from '../../context/dataProvider'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
import MY_URL from '../../Constants/url'
import { useNavigate, useParams } from 'react-router-dom'
import { ToastContainer } from 'react-toast'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useSelector } from 'react-redux'

import AddElipsis from '../utils/AddElipsis';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';


const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'

const Component = styled(Grid)`
     border-top : 1px solid #f0f0f0 ;
     justify-content : space-between;
   
`
const LeftComponent = styled(Grid)(({ theme }) => ({

    margin: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

}))

const Image = styled('img')({
    width: '84px',
    heigth: '300px',
    marginLeft: '10px'
})
const PriceDetails = styled(Box)`
    display: flex;
    align-items: center;
    margin: 1em 0 0.7em;

`;

const Wrapper = styled(Typography)`
      display : flex ;
      margin : 0.5em 0 0.2em;
      color: #878787;
      font-size : 14px;
`
const Cost = styled(Box)`
    font-weight: 600;
    font-size: 18px;

`;
const MRP = styled(Box)`
    text-decoration : line-through;
    font-size: 14px;
    color: #878787;
    margin: 0 0.5em 0 0 ;
`;

const Discount = styled(Box)`
    color:#388e3c;
    font-size: 14px;
    margin: 0 0.5em
`;


const ProductImg = styled('img')(({ theme }) => ({
    width: '120px',
    height: '150px',
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}))
const ProductMobImg = styled('img')(({ theme }) => ({
    display: 'none',
    [theme.breakpoints.down('sm')]: {
        display: 'block',
        maxWidth: '300px',
        width: '90%',
        height: '90%',
    }
}))



const ActBtns = styled(Box)(({ theme }) => ({

}))

const RigthComponent = styled(Grid)(({ theme }) => ({

    margin: "1em 0 0.5em",
    [theme.breakpoints.down('sm')]: {
        margin: "1em"
    }

}))


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


const BuyNow = () => {

    let auth = JSON.parse(localStorage.getItem('user'))
    const { setisUpdate } = useContext(Datacontext)
    const [clientToken, setClientToken] = useState('')
    const [instance, setInstance] = useState('')
    const [address, setAddress] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
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


    const { id } = useParams()

    const AllProducts = useSelector(state => state.products.products)


    let selectedProduct = AllProducts?.filter((product) => product.id === id)[0]

    const [COD, setCOD] = useState(false)
    const [ProductQuantity, setProductQuantity] = useState(1)





    const IncreaseQuantity = () => {
        setProductQuantity(pre => pre + 1)

    }
    const DecreaseQuantity = () => {

        setProductQuantity(pre => pre - 1)
    }


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



    const handlePayment = async () => {



        const address = auth.address
        const email = auth.email
        const name = auth.name
        try {
            setLoading(true)
            // const { nonce } = await instance.requestPaymentMethod()
            await fetch(`${MY_URL}/product/braintree/payment`, {

                method: 'POST',
                body: JSON.stringify({
                    amount: (ProductQuantity * selectedProduct.price.cost), address, email, name, Product: [{...selectedProduct, quantity : ProductQuantity}]
                }),
                headers: {

                    "content-type": "application/json"
                }

            })
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
        setState({
            open: true,
            vertical: 'top',
            horizontal: 'center',
        });
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
                                <Component container>
                                    <LeftComponent item lg={3} md={3} sm={3} xs={11}>

                                        <ProductImg src={selectedProduct.url} alt='product image' />
                                        <ProductMobImg src={selectedProduct.detailUrl} alt='product image' />

                                    </LeftComponent>
                                    <RigthComponent item lg={8} md={8} sm={8} xs={11}  >
                                        <Tooltip title={selectedProduct.title.longTitle}>
                                            <Typography>{AddElipsis(selectedProduct.title.longTitle)}</Typography>
                                        </Tooltip>

                                        <Wrapper> Seller:Flipkart
                                            <Box component='span'>
                                                <Image src={fassured} alt='flipkart assured' />

                                            </Box>
                                        </Wrapper>
                                        <PriceDetails>

                                            <MRP>{`₹${selectedProduct?.price?.mrp} `}</MRP>
                                            <Cost>{`₹${selectedProduct?.price?.cost} `}</Cost>
                                            <Discount>{`${selectedProduct?.discount}`}</Discount>
                                        </PriceDetails>
                                        <ActBtns>
                                            <span><button className={`DecreaseBtn`}
                                                onClick={() => DecreaseQuantity()}
                                                disabled={ProductQuantity < 2 ? true : false}
                                            ><RemoveIcon /></button></span>
                                            <span style={{ margin: "1em" }}>
                                                {ProductQuantity}
                                            </span>
                                            <span><button
                                                className={`IncreaseBtn`}
                                                onClick={() => IncreaseQuantity()}
                                            ><AddIcon /></button></span>
                                        </ActBtns>

                                    </RigthComponent>
                                </Component>

                            </AccordionDetails>
                        </Accordion>

                        <Divider sx={{ background: '#878787' }} />
                        <Box className='m-3'>
                            <input type='checkbox' value='COD' id='COD' onClick={() => setCOD(pre => !pre)} /> <b>Cash on Delivery</b>
                            <button className='btn btn-outline-success mx-2' onClick={handlePayment} disabled={address === '' || !COD}>Order</button>
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
                            Amount={ProductQuantity * selectedProduct.price.mrp}
                            items={ProductQuantity}
                            discount={ProductQuantity * (selectedProduct.price.mrp - selectedProduct.price.cost)}
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

            }
        </>
    )
}

export default BuyNow
