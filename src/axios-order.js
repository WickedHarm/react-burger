import axios from "axios";

const axiosOrder = axios.create({
    baseURL: "https://littleburger-2387d.firebaseio.com/"
    
})

export default axiosOrder;