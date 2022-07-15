import React,{createContext} from 'react'
import ProductAPI from '../src/API/ProductAPI'
export const GlobalState = createContext()

export const DataProvider = ({children}) =>{
    ProductAPI()
    return (
        <GlobalState.Provider value={"value"}>
            {children}
        </GlobalState.Provider>
    )
}