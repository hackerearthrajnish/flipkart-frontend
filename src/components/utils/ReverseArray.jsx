
export const ReverseArray = (products) => {

    return products.reduce((acc, item) => [item].concat(acc), [])
}