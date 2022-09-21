import * as api from "../Services/EcommerceServices";
import { GET_DATA, PAGE_DATA, SEARCH } from "../ActionTypes/EcommerceActionTypes";

export const getEcommerceData = () => async (dispatch) => {
  try {
    const { data } = await api.getEcommerceData();
    dispatch({ type: GET_DATA, payload: data });
  } catch (error) {
    console.log(error)
  }
};

export const searchResult = (searchValue) => {
  try {
    return({ type: SEARCH, payload: searchValue });
  } catch (error) {
    console.log(error)
  }
};

export const handlePageData = (lowerInd, higherInd) => {
  try {

    return({ type: PAGE_DATA, payload: {lowerInd: lowerInd, higherInd: higherInd} });
  } catch (error) {
    console.log(error)
  }
};



