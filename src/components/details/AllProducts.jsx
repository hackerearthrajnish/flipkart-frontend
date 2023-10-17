import React, { useEffect, useState } from 'react'
import { Box, styled, Grid, Typography, Divider, Skeleton } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


import GradeIcon from '@mui/icons-material/Grade';
import AddElipsis from '../utils/AddElipsis';


const ProductBox = styled(Box)({

    padding: '1em',
    textAlign: 'center',
    cursor: 'pointer',
    borderRadius: '4px',
    background: '#fff',
    '&:hover': {
        '&>img': {
            transform: 'scale(1.1)'
        },
        '&>div>p:first-of-type': {
            color: '#2874f0'
        }
    }

})

const ProductImg = styled('img')({
    width: '200px',
    height: '250px',
    transition: 'transform .2s',
    marginBottom: '5px'


})


const Container = styled(Box)({
    background: '#fff',
    padding: '0.5em'
})

const Heading = styled(Typography)({
    textAlign: 'center',
    fontSize: '24px',
    margin: '0.5em 0',
    fontWeight: 600
})

const Wrapper = styled(Box)(({ theme }) => ({
    padding: '1em',
    background: '#f1f3f6',
    [theme.breakpoints.down('sm')]: {
        padding: '0.1em'
    }
}))

const LoadingBox = styled(Box)`
    padding : 0.5em;
    text-align:center;
    cursor: pointer;
    display : flex;
    flex-direction:column;
    justify-content : center;
    align-items :center   
`
const StyledTypo = styled(Box)(({ theme }) => ({

    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
        alignItems: 'start'
    }
}))

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
    fontSize: '13px',
    marginRight: '3px'
});

const Image = styled('img')({
    width: '100px',
    heigth: '40px',
    margin: '0.5em 0'

})
const PriceDetails = styled(Box)(({theme})=>({

    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]:{
        flexDirection:'column',
        alignItems : 'start'
    }
    
}))

const Cost = styled(Box)`
    font-weight: 600;
    font-size: 20px;

`;

const MRP = styled(Box)`
    text-decoration : line-through;
    font-size: 16px;
    color: #878787;
    margin: 0 0.5em;
`;

const Discount = styled(Box)`
    color:#388e3c;
    font-size: 14px;
   
`;

const Title = styled(Typography)({
    textAlign: 'start'
})

const Offer = styled(Typography)({
    fontSize: '12px',
    fontWeight: 600,
    color: '#388e3c',
    textAlign: 'start'
})

const AllProducts = () => {


    const LoadingArray = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    const [loading, setloading] = useState(true)
    const fassured = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/fa_62673a.png'


    const products = useSelector(state => {
        return state.products.products
    })
    const navigate = useNavigate()
    const { pathname } = useLocation();

    useEffect(() => {
        if (products.length > 0)
            setloading(false)
    }, [products.length])

    const handleClick = (product) => {
        navigate(`/product/${product.id}`, { state: { product } })
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return (
        <>
            <Wrapper>

                <Container>
                    <Heading>Our Products</Heading>
                    <Divider sx={{ background: "#878787" }} />
                    <Grid container className='container-fluid my-2 bg-white'  >
                        {
                            loading ? LoadingArray.map((data, index) => {
                                return (
                                    <Grid item xs={6} sm={4} lg={2} md={2} key={index}>
                                        <LoadingBox >
                                            <Skeleton animation="wave" variant="rectangular" width={150} height={140} />
                                            <Skeleton animation="wave" width={140} height={30} />
                                            <Skeleton animation="wave" width={140} height={30} />
                                            <Skeleton animation="wave" width={140} height={30} />
                                        </LoadingBox>
                                    </Grid>
                                )
                            }) :
                                products.map((data, index) => {
                                    return (
                                        <Grid item xs={6} sm={4} lg={3} md={3} key={index}>
                                            <ProductBox onClick={() => handleClick(data)} >
                                                <ProductImg src={data.detailUrl} alt="banner" className='img-fluid mb-2' />
                                                <Box sx={{ textAlign: "start" }}>

                                                    <Title>{AddElipsis(data.title.longTitle)}</Title>
                                                    <StyledTypo>
                                                        <Box className='d-flex'>
                                                            <Rating>{data?.ratings.rating} <GradeIcon fontSize='13px' sx={{ margin: '3px' }} /></Rating>
                                                            <RatingNumber>{data?.ratings.totalNumbers} Ratings</RatingNumber>
                                                        </Box>
                                                        <Box>
                                                            <Image src={fassured} alt='flipkart assured' />
                                                        </Box>
                                                    </StyledTypo>
                                                    <Typography color={'green'}>Special price</Typography>
                                                    <PriceDetails>
                                                        <Box className='d-flex align-items-center   '>
                                                            <Cost>{`₹${data?.price?.cost} `}</Cost>
                                                            <MRP>{`₹${data?.price?.mrp} `}</MRP>
                                                        </Box>
                                                        <Box>
                                                            <Discount>{`${data?.price.discount} Off`}</Discount>
                                                        </Box>
                                                    </PriceDetails>
                                                </Box>
                                                <Offer>Buy 3 items, save extra 3%</Offer>
                                            </ProductBox>
                                        </Grid>
                                    )
                                })
                        }
                    </Grid>
                </Container>
            </Wrapper>
        </>
    )
}

export default AllProducts
