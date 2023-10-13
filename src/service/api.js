import axios from "axios";
import URL from "../Constants/url";


export const AuthenticationSignUp = async (data) => {
    try {
        const result = await axios.post(`${URL}/signup`, data)
        localStorage.setItem('user', JSON.stringify(result.data))
        return result
    }
    catch (err) {
        alert(err?.response?.data.message)
    }
}

export const AuthenticationLogin = async (data) => {
    try {
        const result = await axios.post(`${URL}/login`, data)
        localStorage.setItem('user', JSON.stringify(result.data))
        return result
    }
    catch (err) {
        console.warn(err)
    }
}


export const payUsingPaytm = async (data) => {
    try {
        const response = await axios.post(`${URL}/create-checkout-session"`, data)
        return response.data
    } catch (err) {
        console.log('error while making payment', err)
    }
}

export const AddToCart = async (product, setisUpdate) => {
    const { _id, ...items } = product;

    const auth = JSON.parse(localStorage.getItem('user'))

    if (auth === null) {
        return false
    }
    else {
        const products = { ...items, userId: auth?._id }

        try {

            let result = await fetch(`${URL}/addtocart`, {
                method: "POST",
                body: JSON.stringify({
                    email: auth?.email,
                    ...products
                }),
                headers: {
                    "content-type": "application/json"
                }
            })
            result = await result.json()
            setisUpdate(pre => pre + 1)
            if (!result.isExist) {
                auth.cart = result.cart.cart
                auth.amount = result.cart.amount
                auth.cartProducts = result.cartItems
                localStorage.setItem("user", JSON.stringify(auth));
            }
            return true;
        }
        catch (err) {
            console.log(err)
            return false
        }

    }


};

export const DeleteFromCart = async (product, setisUpdate) => {

    const auth = JSON.parse(localStorage.getItem('user'))

    if (auth === null) {
        return false
    }
    else {
        const products = { ...product, userId: auth?._id }

        try {

            let result = await fetch(`${URL}/delete-from-cart`, {
                method: "POST",
                body: JSON.stringify({
                    email: auth?.email,
                    ...products
                }),
                headers: {
                    "content-type": "application/json"
                }
            })
            result = await result.json()
            console.log("🚀 ~ file: api.js:103 ~ DeleteFromCart ~ result:", result)

            auth.cart = result.cart.cart
            auth.amount = result.cart.amount
            auth.cartProducts = result.cartItems
            localStorage.setItem("user", JSON.stringify(auth));

            setisUpdate(pre => pre - 1)


            return true;
        }
        catch (err) {
            console.log(err)
            return false
        }

    }


};

export const CheckOut = async (setisUpdate) => {

    const auth = JSON.parse(localStorage.getItem('user'))

    if (auth === null) {
        return false
    }
    else {

        try {

            await fetch(`${URL}/checkout`, {
                method: "POST",
                body: JSON.stringify({
                    email: auth?.email,
                    userId: auth?._id
                }),
                headers: {
                    "content-type": "application/json"
                }
            })
            auth.cartProducts = []
            auth.amount = 0
            auth.cart = 0
            auth.address = ''
            localStorage.setItem('user', JSON.stringify(auth))
            setisUpdate(pre => pre - 1)
            return true;
        }
        catch (err) {
            console.log(err)
            return false
        }

    }


};


export const IncreaseAPI = async (product) => {
    const auth = JSON.parse(localStorage.getItem('user'))


    try {
        await fetch(`${URL}/increase-quantity`, {
            method: "PUT",
            body: JSON.stringify({
                userId: auth?._id,
                email: auth?.email,
                amount: auth.amount,
                cart: auth.cart,
                ...product
            }),
            headers: {
                "content-type": "application/json"
            }
        })
        
        let cartItems = auth.cartProducts
        cartItems.forEach(element => {
            if (element.id === product.id)
                element.quantity += 1
        })
        auth['cartProducts'] = cartItems;
        auth['cart'] = auth.cart + 1
        auth['amount'] = auth.amount + product.price.cost
        localStorage.setItem('user', JSON.stringify(auth))

    } catch (err) {
        console.log(err)
    }
}
export const DecreaseAPI = async (product) => {
    const auth = JSON.parse(localStorage.getItem('user'))


    try {
        await fetch(`${URL}/decrease-quantity`, {
            method: "PUT",
            body: JSON.stringify({
                userId: auth?._id,
                email: auth?.email,
                amount: auth.amount,
                cart: auth.cart,
                ...product
            }),
            headers: {
                "content-type": "application/json"
            }
        })
        let cartItems = auth.cartProducts
        cartItems.forEach(element => {
            if (element.id === product.id)
                element.quantity -= 1
        })
        auth['cartProducts'] = cartItems;
        auth['cart'] = auth.cart - 1
        auth['amount'] = auth.amount - product.price.cost
        localStorage.setItem('user', JSON.stringify(auth))

    } catch (err) {
        console.log(err)
    }
}