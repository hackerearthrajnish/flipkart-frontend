import { Box, Grid, Link, Table, TableBody, TableCell, TableRow, Typography, styled } from '@mui/material'
import React, { useEffect } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import ActionItem from './ActionItem'
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import GradeIcon from '@mui/icons-material/Grade';


import { useSelector } from 'react-redux'

const adURL = 'https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50';


const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'


const date = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000)


const Component = styled(Box)(({ theme }) => ({

    background: '#F2F2F2',
    padding: '1em',
    [theme.breakpoints.down('sm')]: {
        padding: 0
    }

}))


const Image = styled('img')({
    width: '100px',
    heigth: '50px',
    marginLeft: '1em',

})

const StyledTypo = styled(Box)`
    display : flex ;
    align-items: center
`;

const Container = styled(Grid)`
    background: #ffffff;
    padding: 1em;
    justify-content: center;
`;


const PriceDetails = styled(Box)`
    display: flex;
    align-items: center;

`;

const Cost = styled(Box)`
    font-weight: 600;
    font-size: 30px;

`;

const MRP = styled(Box)`
    text-decoration : line-through;
    font-size: 16px;
    color: #878787;
    margin: 0 0.5em;
`;

const Discount = styled(Box)`
    color:#388e3c;
    font-size: 16px;
    margin: 0 0.5em
`;

const Offers = styled(Box)`
    display: flex;
    align-items: center;
    margin: 0.5em 0;
`
const OfferDescription = styled(Typography)`

font-size: 14px;
margin-left: 0.5em;
`;

const TermAndCondition = styled(Link)`
font-weight: 600;
text-decoration: none;

`;

const Delivery = styled(TableCell)`
display: flex;
font-weigth: 600;
`
const ColumnText = styled(TableRow)`
vertical-align : baseline;
     &> td{
    border: none;
}
`

const MobileTable = styled(Box)(({ theme }) => ({

    display: 'none',
    [theme.breakpoints.down('sm')]: {
        margin: '1em 0',
        display: 'block'
    }
}))

const DesktopTable = styled(Table)(({ theme }) => ({

    display: 'block',
    [theme.breakpoints.down('sm')]: {
        display: 'none'
    }
}))

const MobileImg = styled('img')({
    width: '100%'
})

const TableHeading = styled(Typography)({

    color: '#878787',
    margin: '1em 0',
    padding: '1em 0',
    borderBottom: '1px solid #878787'

})

const TableDescription = styled(Box)({
    display: 'flex',
    fontSize: '14px',
})

const Rating = styled(Typography)({
    background: '#388e3c',
    color: '#fff',
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '4px',
    fontSize: '13px',
    alignItems: "center",
    padding: '1px 4px 1px 6px'
})

const RatingNumber = styled(Typography)({
    color: '#878787',
    marginLeft: '5px',
    fontSize: '13px'
})

const DetailView = () => {

    const { id } = useParams()

    const products = useSelector(state => state.products.products)


    const selectedProduct = products?.filter((product) => product.id === id)

    const { pathname } = useLocation();

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [pathname]);
  

    return (
        <Component>
            <Container container spacing={2}>
                <Grid item lg={4} md={4} sm={10} xs={12}>
                    <ActionItem product={selectedProduct[0]} />
                </Grid>
                <Grid item lg={7} md={8} sm={10} xs={12}>
                    <Typography>{selectedProduct[0]?.title?.longTitle}</Typography>
                    <StyledTypo>
                        <Rating>{selectedProduct[0]?.ratings.rating} <GradeIcon fontSize='13px' sx={{ margin: '3px' }} /></Rating>
                        <RatingNumber>{selectedProduct[0]?.ratings.totalNumbers} Ratings</RatingNumber>
                        <Image src={fassured} alt='flipkart assured' />
                    </StyledTypo>
                    <Typography color={'green'}>Special price</Typography>
                    <PriceDetails>

                        <Cost>{`₹${selectedProduct[0]?.price?.cost} `}</Cost>
                        <MRP>{`₹${selectedProduct[0]?.price?.mrp} `}</MRP>
                        <Discount>{`${selectedProduct[0]?.price?.discount} off`}</Discount>
                    </PriceDetails>
                    <Typography sx={{ fontWeight: 600 }}>Available offers</Typography>
                    <Box>
                        <Offers>
                            <LocalOfferIcon color='success' />
                            <OfferDescription>Bank Offer 10% Instant Discount on ICICI Bank Credit Card, up to ₹1250 on orders of ₹5,000 and above <TermAndCondition href="#">T&C</TermAndCondition></OfferDescription>
                        </Offers>
                        <Offers>
                            <LocalOfferIcon color='success' />
                            <OfferDescription>Bank Offer 10% Instant Discount on Axis Bank Credit Card, up to ₹1250, on orders of ₹5,000 and above <TermAndCondition href="#">T&C</TermAndCondition></OfferDescription>
                        </Offers>
                        <Offers>
                            <LocalOfferIcon color='success' />
                            <OfferDescription>Bank Offer 10% Instant Discount on Axis Bank Credit Card, up to ₹1250, on orders of ₹5,000 and above <TermAndCondition href="#">T&C</TermAndCondition></OfferDescription>
                        </Offers>
                        <Offers>
                            <LocalOfferIcon color='success' />
                            <OfferDescription>Special PriceGet extra 3% off (price inclusive of cashback/coupon)<TermAndCondition href="#">T&C</TermAndCondition></OfferDescription>
                        </Offers>
                        <Offers>
                            <LocalOfferIcon color='success' />
                            <OfferDescription>Bank Offer10% Instant Discount on Citibank Credit Card, up to ₹1250, on orders of ₹5,000 and above <TermAndCondition href="#">T&C</TermAndCondition></OfferDescription>
                        </Offers>

                    </Box>
                    <DesktopTable>
                        <TableBody>
                            <ColumnText>
                                <TableCell style={{ color: '#878787' }}>Delivery</TableCell>
                                <Delivery style={{ fontWeight: 600 }}>Delivery by {date.toLocaleDateString()} | <Discount>Free Delivery</Discount><MRP>{`₹40`}</MRP></Delivery>
                            </ColumnText>
                            <ColumnText>
                                <TableCell style={{ color: '#878787' }}>Warranty</TableCell>
                                <TableCell>
                                    1 Year Warranty, For any assistance give a call at 9540125552 & 706-517-9993, 4, 5 or write us at ecom@egate-world.com or support@egate-world.com. KINDLY FOLLOW THE LINK FOR WARRANTY REGISTRATION- https://www.egate-world.com/Product-Registration</TableCell>
                            </ColumnText>
                            <ColumnText>
                                <TableCell style={{ color: '#878787' }}>Seller</TableCell>
                                <TableCell >
                                    <Box style={{ color: '#2874f0' }}>egate</Box>
                                    <Typography style={{ fontSize: '14px' }}>GST Invoive available</Typography>
                                    <Typography style={{ fontSize: '14px' }}>View more sellers starting from {`₹${selectedProduct[0]?.price?.cost} `}</Typography>
                                </TableCell>
                            </ColumnText>
                            <ColumnText>
                                <TableCell colSpan={2}>
                                    <img src={adURL} alt='flipkart points' style={{ width: 390 }} />
                                </TableCell>
                            </ColumnText>
                            <ColumnText>
                                <TableCell style={{ color: '#878787' }}>Description </TableCell>

                                <TableCell >{selectedProduct[0]?.description}</TableCell>
                            </ColumnText>
                        </TableBody>

                    </DesktopTable>
                    <MobileTable>
                        <Box>
                            <TableHeading>Delivery</TableHeading>
                        </Box>
                        <Box>
                            <TableDescription style={{ fontWeight: 600 }}>Delivery by {date.toLocaleDateString()} | <Discount>Free Delivery</Discount><MRP>{`₹40`}</MRP></TableDescription>
                        </Box>
                        <Box>
                            <TableHeading >Warranty</TableHeading>
                        </Box>
                        <Box>
                            <TableDescription>
                                1 Year Warranty, For any assistance give a call at 9540125552 & 706-517-9993, 4, 5 or write us at ecom@egate-world.com or support@egate-world.com. KINDLY FOLLOW THE LINK FOR WARRANTY REGISTRATION- https://www.egate-world.com/Product-Registration</TableDescription>
                        </Box>
                        <Box>
                            <TableHeading >Seller</TableHeading>
                        </Box>
                        <Box>
                            <Box style={{ color: '#2874f0' }}>egate</Box>
                            <Typography style={{ fontSize: '14px' }}>GST Invoive available</Typography>
                            <Typography style={{ fontSize: '14px' }}>View more sellers starting from {`₹${selectedProduct[0]?.price?.cost} `}</Typography>
                        </Box>
                        <Box>
                            <MobileImg src={adURL} alt='flipkart points' />
                        </Box>
                        <Box>
                            <TableHeading >Description </TableHeading>

                        </Box>
                        <Box>

                            <TableDescription >{selectedProduct[0]?.description}</TableDescription>
                        </Box>


                    </MobileTable>

                </Grid>

            </Container>
        </Component>
    )
}

export default DetailView
