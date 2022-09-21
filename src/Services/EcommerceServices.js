import axios from "axios";


const BaseURL = "https://fakestoreapi.com/products";


export const getEcommerceData = () => axios.get(`${BaseURL}`);


