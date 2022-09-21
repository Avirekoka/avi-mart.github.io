import axios from "axios";

//API's
const BaseURL = "https://fakestoreapi.com/products";

export const getSingleProduct = (itemId) => axios.get(`${BaseURL}/${itemId}`)



