import { createContext, useState } from "react";


export const Datacontext = createContext(null)


const DataProvider = ({ children }) => {

    const user = JSON.parse(localStorage.getItem('user'));
    const [account, setAccount] = useState(user ? user.name : '');
    const [isUpdate, setisUpdate] = useState(user ? user.cart : 0)


    return (
        <Datacontext.Provider value={{ account, setAccount, isUpdate, setisUpdate }} >
            {children}
        </Datacontext.Provider>
    )
}

export default DataProvider