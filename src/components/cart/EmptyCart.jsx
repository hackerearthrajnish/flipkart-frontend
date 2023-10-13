import { Box, Button, Typography, styled } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import LoginDialogue from '../login/LoginDialogue';

const imgurl = 'https://rukminim1.flixcart.com/www/800/800/promos/16/05/2019/d438a32e-765a-4d8b-b4a6-520b560971e8.png?q=90';


const Container = styled(Box)`
      
      margin: 120px 20px;
      display: flex;
      flex-direction: column;
      align-items:center;
      background: #fff; 
      padding : 1em;
      

`
const StyleTypo = styled(Typography)`
        margin : 1em 0 0.2em;
`

const ShowNow = styled(Button)`
    box-shadow : none;
    width: 200px;
    border-radius : 2px;
    margin: 0.5em 0
`
const EmptyCart = (props) => {

    const [showDialog, setShowdialog] = useState(false)

    const navigate = useNavigate()

    const handleClick = () => {
        if (props.islogedIn)
            navigate('/')
        else
           setShowdialog(true) 
    }
    return (
        <Container>

            <img src={imgurl} alt='nothing into cart' className='empty-cart' />
            <StyleTypo>{props.message}</StyleTypo>
            <Typography variant='body2'>{props.des}</Typography>
            <ShowNow variant='contained' onClick={handleClick}>{props.islogedIn ? 'Shop now' : 'Login'}</ShowNow>
            <LoginDialogue isopen={showDialog} handle={setShowdialog} />
        </Container>
    )
}

export default EmptyCart
