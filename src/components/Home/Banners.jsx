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
        <>
            <span className='mobile-banner m-0 p-0'>
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

                    <img srcSet="https://rukminim2.flixcart.com/fk-p-flap/434/193/image/5c28c38fb7992620.jpg?q=80 1x, https://rukminim2.flixcart.com/fk-p-flap/868/386/image/5c28c38fb7992620.jpg?q=60 2x" alt='banners'
                        className='banner-img' src="https://rukminim2.flixcart.com/fk-p-flap/900/400/image/5c28c38fb7992620.jpg?q=90"
                    />
                    <img
                        alt=""
                        className='banner-img'
                        srcSet="https://rukminim2.flixcart.com/fk-p-flap/368/164/image/592f3b85d48d1286.jpg?q=80 1x, https://rukminim2.flixcart.com/fk-p-flap/736/327/image/592f3b85d48d1286.jpg?q=60 2x, "
                        src="https://rukminim2.flixcart.com/fk-p-flap/400/200/image/592f3b85d48d1286.jpg?q=90"

                    />
                    <img
                        className='banner-img'
                        alt=""
                        srcSet="https://rukminim2.flixcart.com/fk-p-flap/368/164/image/738de087567df261.jpg?q=80 1x, https://rukminim2.flixcart.com/fk-p-flap/736/327/image/738de087567df261.jpg?q=60 2x,"
                        src="https://rukminim2.flixcart.com/fk-p-flap/400/200/image/738de087567df261.jpg?q=90"

                    />

                </Carousel>
            </span>

            <Carousel
                className='desktop-banner'
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
        </>
    )
}

export default Banners
