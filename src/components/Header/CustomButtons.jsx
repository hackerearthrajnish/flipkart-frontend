import { Badge, Box, Button, Typography, styled } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LoginDialogue from '../login/LoginDialogue';
import { Datacontext } from '../../context/dataProvider';
import Profile from './Profile';
import { useNavigate } from 'react-router-dom';




const Wrapper = styled(Box)(({ theme }) => ({

  display: 'flex',
  alignItems: 'center',
  margin: 'auto',
  width: 'max-contained',
  '& > button , &>div , & > p': {
    marginRight: ' 40px',
    padding: '0.2em',
    cursor: 'pointer'
  },

  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    alignItems: 'start',
    '& > button , &>div , & > p': {
      margin: '0.3em',
      padding: '0.3em',
      '&:hover': {
        background: '#00FFFF',
        borderRadius: '4px',
        cursor: 'pointer',
        color: '#fff'
      },
    },


  }

}));


const LoginBtn = styled(Button)(({ theme }) => ({

  boxShadow: 'none',
  padding: '2px 30px',
  fontWeight: ' bold',
}));

const Cart = styled(Box)`
    cursor: pointer;
    display: flex; 
    & > p{
      margin-left : 10px;
    }
`
const IsprofileShow = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down('md')]: {
    display: 'none'
  }
}));




const CustomButtons = () => {

  const [showDialog, setShowdialog] = useState(false)
  const { account, setAccount, isUpdate } = useContext(Datacontext)
  const auth = JSON.parse(localStorage.getItem('user'))

  const [totalItems, setTotalItems] = useState(auth ? auth.cart : 0)


  const navigate = useNavigate()

  const NavigateToCart = () => {
    navigate('/cart')
  }

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('user'))
    setTotalItems(data ? data.cart : 0)
  }, [isUpdate])

  return (
    <Wrapper>
      <IsprofileShow>

        {
          account ? <Profile account={account} setAccount={setAccount} /> :

            <LoginBtn variant="contained" onClick={() => setShowdialog(true)}>Login</LoginBtn>

        }
      </IsprofileShow>

      <Typography>Become a Seller</Typography>
      <Typography>More</Typography>

      <Cart onClick={NavigateToCart}>
        <Badge badgeContent={totalItems} color="error" max={15}>
          <ShoppingCartIcon />
        </Badge>
        <Typography>Cart</Typography>
      </Cart>
      <LoginDialogue isopen={showDialog} handle={setShowdialog} />
    </Wrapper>
  )
}

export default CustomButtons
