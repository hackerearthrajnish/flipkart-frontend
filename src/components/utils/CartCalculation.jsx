

const TotalAmount = (cartItems) => {
    let total = 0;
    let len = cartItems.length;
    for (let i = 0; i < len; i++) {
        total += cartItems[i]?.price.mrp * cartItems[i]?.quantity ;
    }
    return total;
}

const CalculateDiscount = (cartItems) => {
    let MRP = 0;
    let cost = 0;
    let len = cartItems.length;
    for (let i = 0; i < len; i++) {
        MRP += cartItems[i]?.price.mrp * cartItems[i]?.quantity ;
        cost += cartItems[i]?.price.cost * cartItems[i]?.quantity ;
    }
    return MRP - cost;
}
export { TotalAmount, CalculateDiscount }
