import { ADD_TO_CART, DECREAMENT_QTY, INCREAMENT_QTY, REMOVE_FROM_CART } from "../ActionTypes/CartActionType";

const initialProductsState = {
  cartItem: [],
  totalAmt: 0,
  totalQty: 0
}

export const cart = (state = {cartItem: [], totalAmt: 0, totalQty: 0, qty: 0}, actions) => {
    switch (actions.type) {
      case ADD_TO_CART:

        console.log(actions.payload)
        if(localStorage.getItem("cart_data")){

          let localstorageForAddToCart = JSON.parse(localStorage.getItem("cart_data"));
          localstorageForAddToCart.totalQty += 1;
          localstorageForAddToCart.totalAmt += actions.payload.price;
          
          localstorageForAddToCart.cartItem.some(i => {
            if(i.id === actions.payload.id) i.qty += 1;
          });

          const index = localstorageForAddToCart.cartItem.findIndex(item => item.id === actions.payload.id);
         
          index === -1 && localstorageForAddToCart.cartItem.push(actions.payload);
          
          localStorage.setItem("cart_data", JSON.stringify(localstorageForAddToCart));
        }else{
          localStorage.setItem("cart_data", JSON.stringify({...state, cartItem: [...state.cartItem, actions.payload], totalAmt: state.totalAmt + actions.payload.price, totalQty: state.cartItem.length}));
        }

        return {...state, cartItem: [...state.cartItem, actions.payload], totalAmt: state.totalAmt + actions.payload.price, totalQty: state.cartItem.length};

      case INCREAMENT_QTY:
        let getLocalStorageForIncreament = JSON.parse(localStorage.getItem("cart_data"));

        getLocalStorageForIncreament.cartItem.some(i => {
          if(i.id === actions.payload) {
            i.qty += 1;
          }
        });

        getLocalStorageForIncreament.totalQty = getLocalStorageForIncreament.cartItem.reduce((prevSum,{qty}) => prevSum + qty, 0);
        getLocalStorageForIncreament.totalAmt += getLocalStorageForIncreament.cartItem.find(item => item.id === actions.payload).price;

        localStorage.setItem("cart_data", JSON.stringify(getLocalStorageForIncreament));

        return getLocalStorageForIncreament;

      case DECREAMENT_QTY:
        let getLocalStorageForDecreament = JSON.parse(localStorage.getItem("cart_data"));

        getLocalStorageForDecreament.cartItem.some(i => {
          if(i.id === actions.payload) {
            
            i.qty > 0 && i.qty--
          }
        });

        const filterdDecreamentData = getLocalStorageForDecreament.cartItem.filter(i => i.qty !== 0);

        getLocalStorageForDecreament.totalQty -= 1;
        getLocalStorageForDecreament.totalAmt -= getLocalStorageForDecreament.cartItem.find(item => item.id === actions.payload).price;
        getLocalStorageForDecreament.cartItem = filterdDecreamentData;

        localStorage.setItem("cart_data", JSON.stringify(getLocalStorageForDecreament));

        return getLocalStorageForDecreament;

      case REMOVE_FROM_CART:

        let localstorageForRemoveFromCart = JSON.parse(localStorage.getItem("cart_data"));
        const filteredCart = localstorageForRemoveFromCart.cartItem.filter(item => item.id !== actions.payload);

        
        localstorageForRemoveFromCart.totalQty -= localstorageForRemoveFromCart.cartItem.find(item => item.id === actions.payload).qty;
        localstorageForRemoveFromCart.totalAmt -= localstorageForRemoveFromCart.cartItem.find(item => item.id === actions.payload).price * localstorageForRemoveFromCart.cartItem.find(item => item.id === actions.payload).qty;
        localstorageForRemoveFromCart.cartItem = filteredCart;

        localStorage.setItem("cart_data", JSON.stringify(localstorageForRemoveFromCart));
        return filteredCart;
               
      default:
        return state;
    }
  };