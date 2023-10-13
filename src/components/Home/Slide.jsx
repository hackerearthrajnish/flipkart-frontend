import { Box, Button, Divider, Skeleton, Typography, styled } from '@mui/material';
import React, { useEffect, useState } from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

import Countdown from 'react-countdown';
import { useNavigate } from 'react-router-dom';


const timerURL = 'https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg';

const ProductBox = styled(Box)(({theme})=>({

    padding: '1em',
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover' : {
      '  & > img' : {
            transform: 'scale(1.1)'
        }
    },
   
}))

const ProductImg = styled('img')({
    width: '150px',
    height: 180,
    transition: 'transform .2s',
    marginBottom :' 9px'
})


const Component = styled(Box)`
    background : #ffffff;
    margin-top: 10px;
`
const Deal = styled(Box)`
      padding: 0.7em;
      display: flex;
      align-items:center;
`;

const Dealtime = styled(Box)`
    display: flex;
    margin-left: 1em;
    align-items:center;


    & > img{
        margin : 0 0.5em;
        heigth : 20px;
        width : 20px;
    }
    
`;

const ViewBtn = styled(Button)`
    margin-left : auto ;
    font-size : 13px;
    border-radius: 2px;
    font-weight: 600;

`;

const Text = styled(Typography)`
       font-size: 14px;
       margin-top: 5px
`;

const LoadingBox = styled(Box)`
    padding : 0.5em;
    text-align:center;
    cursor: pointer;
    display : flex;
    flex-direction:column;
    justify-content : center;
    align-items :center   
`






const Slide = ({ products, title }) => {

    const LoadingArray = [1, 1, 1, 1, 1, 1, 1]
    const [loading, setloading] = useState(true)

    useEffect(() => {
        if (products.length > 0)
            setloading(false)
    }, [products.length])

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 6
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };

    const renderer = ({ hours, minutes, seconds, completed }) => {
        return <Box varient='span'>{hours}:{minutes}:{seconds} Left</Box>;
    }

    const navigate = useNavigate()

    const handleClick = (product) => {
        navigate(`/product/${product.id}`, { state: { product } })
    }

    const handleView = () => {
        navigate('/allproducts')
    }

    return (
        <Component>
            <Deal>
                <Typography fontWeight={600}> {title} </Typography>
                {
                    title === 'Deal of the Day' ?
                        <Dealtime>
                            <img src={timerURL} alt='time' />
                            <Countdown date={Date.now() + 5.04e+7} renderer={renderer} />
                        </Dealtime> : null
                }
                <ViewBtn variant='contained' onClick={handleView}>View all</ViewBtn>
            </Deal>
            <Divider />
            {


                <Carousel
                    responsive={responsive}
                    swipeable={false}
                    draggable={false}
                    infinite={true}
                    centerMode={true}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
                    transitionDuration={600}
                    autoPlaySpeed={3000}
                    autoPlay={true}
                    ssr={true}
                >
                    {
                        loading ?
                            LoadingArray.map((data, index) => {
                                return <LoadingBox key={index}>
                                    <Skeleton animation="wave" variant="rectangular" width={150} height={140} />
                                    <Skeleton animation="wave" width={140} height={30} />
                                    <Skeleton animation="wave" width={140} height={30} />
                                    <Skeleton animation="wave" width={140} height={30} />
                                </LoadingBox>
                            }) :
                            products.map((data, index) => {
                                return (
                                    <ProductBox key={index} onClick={() => handleClick(data)} className='Product-box'>
                                        <ProductImg src={data.url} alt="banner" />
                                        <Text style={{ fontWeight: 600, color: '#212121' }}>{data.title.shortTitle}</Text>
                                        <Text style={{ color: 'green' }}>{data.discount}</Text>
                                        <Text style={{ color: '#212121' }}>{data.tagline}</Text>
                                    </ProductBox>
                                )
                            })
                    }

                </Carousel>
            }
        </Component>
    )
}

export default Slide
