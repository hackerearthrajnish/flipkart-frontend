import { Box, Typography, styled } from '@mui/material'
import React from 'react'
import { navData } from '../../Constants/data'


const StyleBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  margin: '77px 20px 0 20px',
  overflow: 'auto',
  background: '#fff',
  scrollbarWidth: 'none', 
  '-ms-overflow-style': 'none', 
  '&::-webkit-scrollbar': {
    width: '0.5em',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: 'transparent',
  },
  [theme.breakpoints.down('md')]: {
    margin: '77px 15px 0 15px',

  },
}));

const ProductWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  padding: '0.7em',
}));



const Text = styled(Typography)`
     font-weight: 530;
`
const Navbar = () => {
  return (
    <StyleBox>
      {
        navData.map((data,index) => {
          return (<ProductWrapper key={index}>
            <img src={data.url} alt={data.text} id='navProductImg' />
            <Text >{data.text}</Text>
          </ProductWrapper>)
        })
      }
    </StyleBox>
  )
}

export default Navbar
