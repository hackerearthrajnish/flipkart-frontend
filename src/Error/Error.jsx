import React from 'react'
import error from '../assest/images/error.png'
import { useNavigate } from 'react-router-dom'
import { Box, Button, Typography, styled } from '@mui/material'


const Container = styled(Box)`
      margin: 5em auto;
      text-align: center;
`;

const Heading = styled(Typography)`
    font-size: 50px;
    font-weight: 600;
    color: red;
    margin: 20px
`;

const ButtonStyle =styled(Button)`
      margin: 1em
`

const Error = () => {
    const navigate = useNavigate()
    return (
        <>
            <Box>

                <Container>
                    <Heading>Page Not Found</Heading>
                    <Typography margin={2}>The requested page does not exist.</Typography>
                    <img src={error} alt="Error"  />
                    <br />
                    <ButtonStyle 
                    variant='contained' 
                    color='success'
                    onClick={() => {
                        navigate('/')
                    }}>Back to Home</ButtonStyle>
                </Container>
            </Box>
        </>
    )
}

export default Error