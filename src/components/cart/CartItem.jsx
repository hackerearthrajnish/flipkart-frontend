import { Box, Grid, Tooltip, Typography, styled } from '@mui/material'
import React from 'react'
import AddElipsis from '../utils/AddElipsis';
import ActionBtn from '../ButtonGroups/ActionBtn.jsx';


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

const Remove = styled(Box)`
      font-size : 16px;
      font-weight : 600;
      margin : 1.5em 0;
      &:hover{
        color: #2874f0;
        cursor: pointer;
      }
`
const Save = styled(Box)`
      font-size : 16px;
      font-weight : 600;
      margin : 1.5em 1em 1.5em 0;
      &:hover{
        color: #2874f0;
        cursor: pointer;
      }
`
const ProductImg = styled('img')(({ theme }) => ({
  width: '120px',
  height: '120px',
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}))
const ProductMobImg = styled('img')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'block',
    maxWidth : '300px',
    width: '90%',
    height: '90%',
  }
}))

const Btns = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('sm')]: {
    display: 'none'
  }
}))

const ActBtns = styled(Box)(({ theme }) => ({

  display: 'none',
  [theme.breakpoints.down('sm')]: {
    display: 'block'
  }
}))

const RigthContainer = styled(Grid)(({ theme }) => ({

  margin: "1em 0 0.5em",
  [theme.breakpoints.down('sm')]: {
    margin: "1em"
  }

}))





const CartItem = ({ product, handleRemoveItem }) => {


  return (
    <Component container>
      <LeftComponent item lg={3} md={3} sm={3} xs={11}>

        <ProductImg src={product.url} alt='product image' />
        <ProductMobImg src={product.detailUrl} alt='product image' />
        <Btns>

          <ActionBtn product={product} />
        </Btns>
      </LeftComponent>
      <RigthContainer item lg={8} md={8} sm={8} xs={11}  >
        <Tooltip title={product.title.longTitle}>
          <Typography>{AddElipsis(product.title.longTitle)}</Typography>
        </Tooltip>

        <Wrapper> Seller:Flipkart
          <Box component='span'>
            <Image src={fassured} alt='flipkart assured' />

          </Box>
        </Wrapper>
        <PriceDetails>

          <MRP>{`₹${product?.price?.mrp} `}</MRP>
          <Cost>{`₹${product?.price?.cost} `}</Cost>
          <Discount>{`${product?.discount}`}</Discount>
        </PriceDetails>
        <ActBtns>
          <ActionBtn product={product} />
        </ActBtns>
        <Box sx={{ display: 'flex' }}>
          <Save>SAVE FOR LATER</Save>
          <Remove onClick={() => handleRemoveItem(product)}>REMOVE</Remove>
        </Box>
      </RigthContainer>
    </Component>
  )
}

export default CartItem
