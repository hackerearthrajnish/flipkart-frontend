import { Box, Button, Grid, Typography, styled } from '@mui/material'
import React, { useContext, useEffect } from 'react'
import CartItem from './CartItem'
import TotalBalance from './TotalBalance'
import { CalculateDiscount, TotalAmount } from '../utils/CartCalculation'
import EmptyCart from './EmptyCart'
import { DeleteFromCart } from '../../service/api'
import { Datacontext } from '../../context/dataProvider'

import { useNavigate } from 'react-router-dom'



const Container = styled(Grid)(({ theme }) => ({

    padding: '2em 3em',
    background: '#f0f0f0',
    justifyConent: 'evenly',
    [theme.breakpoints.down('md')]: {
        padding: '1em'
    }
}));

const Header = styled(Box)`
    padding : 15px 20px;
`
const LeftContainer = styled(Grid)`
    background: #ffffff;
   
    
`
const PlaceOrder = styled(Button)`
       background : #fb641b ;
       border-radius : 2px;
       box-shadow : none;
       margin : 1em;
       box-shadow: rgba(0, 0, 0, 0.2) 0px 1px 2px 0px;
       font-size: 16px ;
       font-weigth: 600 ;
       width: 200px;
`;

const OrderDiv = styled(Box)`
    position : sticky ;
    display: flex ;
    justify-content: end;
    box-shadow : rgba(0, 0, 0, 0.1) 0px -2px 10px 0px
`

const RigthContainer = styled(Grid)(({ theme }) => ({

    background: '#ffffff',
    height: 'max-content',
    boxShadow: '2px 2px 2px',
    [theme.breakpoints.down('md')]: {
        margin: '1em 0'
    }
}))

const Cart = () => {

    const { isUpdate } = useContext(Datacontext)
    let auth = JSON.parse(localStorage.getItem('user'))
    const { setisUpdate } = useContext(Datacontext)
    const navigate = useNavigate()


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


    const handlePlaceOrder = () => {
        navigate('/place-order')
    }
    return (
        <>
            {
                (auth && auth.cartProducts.length) ?
                    <Container container justifyContent="space-around">
                        <LeftContainer item lg={8} md={8} sm={12} xs={12}>
                            <Header>
                                <Typography>My Cart ({auth.cart})</Typography>
                            </Header>
                            {
                                auth.cartProducts.map((item, index) => {
                                    return (
                                        <CartItem product={item} handleRemoveItem={handleRemoveItem} key={index} />
                                    )
                                })
                            }
                            <OrderDiv>
                                <PlaceOrder variant='contained' onClick={handlePlaceOrder}>Place order</PlaceOrder>
                            </OrderDiv>
                        </LeftContainer>
                        <RigthContainer item lg={3} md={3} sm={12} xs={12} >
                            <TotalBalance
                                Amount={TotalAmount(auth.cartProducts)}
                                items={auth.cart}
                                discount={CalculateDiscount(auth.cartProducts)}
                            />
                        </RigthContainer>
                    </Container>

                    : auth ? <EmptyCart message='Your cart is empty!' des='Add items to it now.' islogedIn={true} /> :
                        <EmptyCart message='Missing Cart items?' des='Login to see the items you added previously' islogedIn={false} />
            }
        </>
    )
}

export default Cart
