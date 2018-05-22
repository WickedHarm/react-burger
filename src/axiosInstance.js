import axios from "axios";

export const axiosOrder = axios.create({
    baseURL: "https://littleburger-2387d.firebaseio.com/"
    
})

export const axiosMyOrders = axios.create({
    baseURL: "https://littleburger-2387d.firebaseio.com/"
})


export const axiosContactData = axios.create({
    baseURL: "https://littleburger-2387d.firebaseio.com/"
})