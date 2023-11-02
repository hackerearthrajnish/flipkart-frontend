import { styled } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { Datacontext } from '../../context/dataProvider';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LoadingImg from '../../assest/images/loading.gif'
import { DecreaseAPI, IncreaseAPI } from '../../service/api';

const Component = styled('div')({

    margin: '1.5em 0 0.5em'
})




const ActionBtn = ({ product }) => {
    
    
    const [isRemovedisable, setRemovedisable] = useState(false)
    const [isAdddisable, setdisable] = useState(false)
    const [isUpdating, setisUpdating] = useState(false)
    const [ProductQuantity, setProductQuantity] = useState(0)
    
    const { isUpdate, setisUpdate } = useContext(Datacontext);


    useEffect(() => {
        setProductQuantity(product.quantity)
    }, [isUpdate])

    const IncreaseQuantity = async (product) => {

        setisUpdating(true)
        setdisable(true)
        try {
            await IncreaseAPI(product)
            setdisable(false)
            setisUpdating(false)
            setProductQuantity(pre => pre + 1)
            setisUpdate(pre => pre + 1)
        }
        catch (err) {
            console.log(err)
        }


    }
    const DecreaseQuantity = async (product) => {

        setRemovedisable(true)
        setisUpdating(true)
        try {
            await DecreaseAPI(product)
            setRemovedisable(false)
            setisUpdating(false)
            setProductQuantity(pre => pre - 1)
            setisUpdate(pre => pre - 1)

        }
        catch (err) {
            console.log(err)
        }


    }

    return (
        <Component>
            <span><button className={`DecreaseBtn`}
                onClick={() => DecreaseQuantity(product)}
                disabled={isRemovedisable || ProductQuantity < 2 ? true : false}
            ><RemoveIcon /></button></span>
            <span style={{ margin: "1em" }}>
                {isUpdating ?
                    <img src={LoadingImg} alt='updating..' id='updateImg' /> :
                    ProductQuantity}
            </span>
            <span><button
                className={`IncreaseBtn`}
                onClick={() => IncreaseQuantity(product)}
                disabled={isAdddisable}
            ><AddIcon /></button></span>
        </Component >
    )
}

export default ActionBtn
