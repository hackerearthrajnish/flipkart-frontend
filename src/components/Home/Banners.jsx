import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { bannerData } from '../../Constants/data';
import { styled } from '@mui/material';


const BannerImg = styled('img')(({ theme }) => ({
    width: '100%',
    height: 250,
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        height: '200px',
    }
}))

const Banners = () => {

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        }
    };
    return (
        <Carousel
            responsive={responsive}
            swipeable={false}
            draggable={false}
            infinite={true}
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
            containerClass="carousel-container"
            // removeArrowOnDeviceType={["tablet", "mobile"]}
            transitionDuration={600}
            autoPlaySpeed={3000}
            autoPlay={true}
            ssr={true}


        >
            {
                bannerData.map((data) => {
                    return (
                        <BannerImg src={data.url} alt="banner" key={data.url} />
                    )
                })
            }
        </Carousel>
    )
}

export default Banners
