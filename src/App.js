import { useEffect } from 'react';
import {useDispatch} from 'react-redux'
import { getEcommerceData } from './Actions/EcommerceAction';
import AllProductList from './Components/AllProductsList';
import Header from './Components/Navbar';
import { Routes, Route } from "react-router-dom";
import Cart from './Components/Cart';


function App() {

  const dispatch = useDispatch();
      
  useEffect(() => {
    dispatch(getEcommerceData())
  }, [dispatch]);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<AllProductList />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      
    </div>
  );
}

export default App;
