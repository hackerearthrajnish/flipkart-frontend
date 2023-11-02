import React, { useContext, useEffect } from 'react'
import Navbar from './Navbar'
import Banners from './Banners'
import { Box, styled } from '@mui/material'
import { getProducts } from '../../redux/Features/ProductSlice'
import { useDispatch, useSelector } from 'react-redux'

import Slide from './Slide'
import MidSlider from './Midslider'
import MidSection from './MidSection'
import { Datacontext } from '../../context/dataProvider'
import { ReverseArray } from '../utils/ReverseArray'
import Footerdetails from '../footer/Footerdetails'
import { useLocation } from 'react-router-dom'
import axios from 'axios'
import MY_URL from '../../Constants/url'

const Component = styled(Box)`
    padding: 1em;
    background: #F2F2F2;

`
const Home = () => {

    const dispatch = useDispatch()
    const { setisUpdate } = useContext(Datacontext)

    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);


    const products = useSelector(state => {
        return state.products.products
    })


    useEffect(() => {
        dispatch(getProducts())
        if (products)
            setisUpdate(pre => pre + 1)
    }, [dispatch])

    useEffect(() => {

        let auth = JSON.parse(localStorage.getItem('user'))
        if (auth) {

            const getUserData = async () => {
                try{

                    const result = await axios.post(`${MY_URL}/get-cart-data`, {
                        email: auth.email , _id : auth._id
                    })
                    auth['amount'] = result.data.amount 
                    auth['cart'] = result.data.cart 
                    auth['cartProducts'] = result.data.cartProducts
                    setisUpdate(pre => pre+1)
                    localStorage.setItem('user', JSON.stringify(auth))
                }
                catch(err){
                    console.log(err)
                }
                
            }
            getUserData();
        }
    }, [])
    return (
        <>
            <Navbar />
            <Component>
                <Banners />
                <MidSlider products={products} title='Deal of the Day' />
                <Slide products={products} title='Trending Items' />
                <MidSection />
                <Slide products={ReverseArray(products)} title='Discount for You' />
                <Slide products={products} title='Top Selections' />
                <Slide products={ReverseArray(products)} title='Sports, Healthcara and More' />
            </Component>
            <Footerdetails />
        </>
    )
}

export default Home
