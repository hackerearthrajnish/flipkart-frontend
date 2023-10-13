import { Box, Divider, Typography, styled } from '@mui/material'
import React from 'react'


const Heading = styled(Typography)`
        text-transform : none;
        color : #878787;
        font-weight : 700;
        margin : 0.9em 1em;
`

const Wrapper = styled(Box)`
    border : 1px solid #f2f2f2;
    & > div , &>p{
        margin : 1em;
        padding : 0 0.5em;
    }
    
`;
const MRP = styled(Typography)`
    text-decoration : line-through;
    font-size: 14px;
    color: #878787;
    margin: 0 0.5em 0 0 ;
`;

const StyledTypo = styled(Box)`
    display : flex ;
    justify-content : space-between;
`

const ColoredBox = styled(Box)`
    color : #388e3c;
    display : flex;
`
const Total = styled(Box)`
   display : flex ;
    justify-content : space-between;
    font-weight :600;
    font-size: 18px;
`

const TotalBalance = ({ Amount, items, discount }) => {

    return (
        <Box>
            <Box>
                <Heading > PRICE DETAILS </Heading>
            </Box>
            <Wrapper>
                <StyledTypo>Price({items} items)
                    <Typography>
                        ₹{Amount}
                    </Typography>
                </StyledTypo>
                <StyledTypo>Discount
                    <ColoredBox>
                        -₹{discount}
                    </ColoredBox>
                </StyledTypo>

                <StyledTypo>Delivery Charges
                    <ColoredBox>
                        <MRP>₹100</MRP>
                        Free
                    </ColoredBox>
                </StyledTypo>
                <Divider sx={{ borderStyle: 'dotted' , background : '#878787'}} />
                <Total>Total Amount
                    <Typography sx={{fontWeight:600}}>
                        ₹{Amount - discount}
                    </Typography>
                </Total>
                <Divider sx={{ borderStyle: 'dotted' , background : '#878787'}} />
                <Typography color='#388e3c' fontWeight={600}>You will save ₹{discount + 100} on this order</Typography>
            </Wrapper>
        </Box>
    )
}


export default TotalBalance
