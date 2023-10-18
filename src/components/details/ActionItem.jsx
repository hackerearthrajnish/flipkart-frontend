import { Box, Button, styled } from '@mui/material'
import React, { useContext } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BoltIcon from '@mui/icons-material/Bolt';
import { useNavigate } from 'react-router-dom';
import { AddToCart } from '../../service/api';
import { Datacontext } from '../../context/dataProvider';

const LeftContainer = styled(Box)`
     min-width: 40%;
    

`;

const Image = styled('img')(({ theme }) => ({
    width: '95%',
    height: '450px',
    border: '1px solid #f0f0f0',
    padding: '0.5em',
    [theme.breakpoints.down('sm')]: {
        maxWidth: '300px',
        maxHeigth: '200px',
        border: 'none'


    }

}))

const ImageBox = styled(Box)({
    display: 'flex',
    justifyContent: 'center'
})

const AddToCartBtn = styled(Button)`
    width: 46%;
    border-radius: 2px;
    font-size: 16px;
    padding: 0.5em;
    background: #ff9f00;
`
const BuyNowBtn = styled(Button)`
    width: 46%;
    border-radius: 2px;
    font-size: 16px;
    padding: 0.5em;
    background: #fb641b;


`;
const Buttons = styled(Box)`
         display : flex;
         justify-content : space-between;
         margin : 1em 0;
`

const ActionItem = ({ product }) => {

    const navigate = useNavigate()
    const auth = JSON.parse(localStorage.getItem('user'))
    const { setisUpdate } = useContext(Datacontext)

    const handleAddToCart = async (product) => {

        if (auth) {
            try {
                const result = await AddToCart(product, setisUpdate)
                if (result)
                    navigate('/cart')
            } catch (err) {
                console.log(err)
            }
        }


    }

    const BuyNow = async (id) => {
        navigate(`/buynow/${id}`)
    }
    return (
        <LeftContainer>
            <ImageBox>

                <Image src={product?.detailUrl} alt='img' />
            </ImageBox>
            <Buttons>
                <AddToCartBtn variant='contained' onClick={() => handleAddToCart(product)}>
                    <ShoppingCartIcon />
                    Add to Cart</AddToCartBtn>
                <BuyNowBtn variant='contained' onClick={() => BuyNow(product.id)}>
                    <BoltIcon />
                    Buy Now</BuyNowBtn>
            </Buttons>
        </LeftContainer>
    )
}

export default ActionItem
