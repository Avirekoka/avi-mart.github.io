import { GET_DATA, SEARCH, PAGE_DATA } from "../ActionTypes/EcommerceActionTypes";
import {itemsPerPage} from '../Utility/utilityFunction'


const ecommerce = (state = {products : []}, actions) => {
    switch (actions.type) {
      case GET_DATA:
      
        localStorage.setItem("all_products", JSON.stringify({...state, products: actions.payload, totalProducts: actions.payload.length}));

      return {...state, products: actions.payload, totalProducts: actions.payload.length};
      
      case PAGE_DATA:
        let localStorageAllProductsForPageData = JSON.parse(localStorage.getItem("all_products"));
        let tempData = localStorageAllProductsForPageData.products.slice(actions.payload.lowerInd,actions.payload.higherInd);
        state.totalProducts = localStorageAllProductsForPageData.totalProducts;
      return {...state, totalProducts: localStorageAllProductsForPageData.totalProducts, products : tempData};
      
      case SEARCH:

          let localStorageAllProducts = JSON.parse(localStorage.getItem("all_products"));
          let low = itemsPerPage * (actions.payload.currPage  - 1);
          let high = itemsPerPage * (actions.payload.currPage);
          const getProductsBetweenRange = localStorageAllProducts.products.slice(low, high);
          const filteredProducts = getProductsBetweenRange.filter(product => {
            return product.title.toLowerCase().includes(actions.payload.txt);
          });
          
        return {...state, products: filteredProducts, totalProducts: localStorageAllProducts.totalProducts};

      default:
        return {...state};
    }
  };
export default ecommerce;