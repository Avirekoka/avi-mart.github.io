import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import {Link} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { decreamentQuantity, increamentQuantity, removeFromCart } from '../Actions/CartAction';
import {soldOutProducts} from '../Utility/utilityFunction'

function Cart() {

  useSelector(state => state.cart);

  const cartData = JSON.parse(localStorage.getItem("cart_data"));

  const dispatch = useDispatch();
  const remove = (itemId) => {
    dispatch(removeFromCart(itemId));
  }
  
  return (

    <Container className="mt-4">

      {
        cartData && cartData.cartItem.length !== 0 ? 
        <table className="table table-bordered table-hover table-dark align-middle">
          <thead className="text-center">
            <tr>
              <th scope="col">Item No.</th>
              <th scope="col">Title</th>
              <th scope="col">Image</th>
              <th scope="col">Qty</th>
              <th scope="col">Price</th>
              <th scope="col">+/-</th>
              <th scope="col">Remove</th>
            </tr>
          </thead>

          {
            cartData.cartItem.map((item) => {
              return(
                
                <tbody key={item.id} className="text-center">
                  <tr>
                    <th scope="row">{item.id}</th>
                    <td style={{width: "400px"}}>{item.title}</td>
                    <td>
                      <img src={item.image} width={"200px"} height={"260px"} alt={item.title}/>
                    </td>
                    <td>{item.qty}</td>
                    <td>{item.qty * item.price}</td>
                    <td>
                      {
                        soldOutProducts.includes(item.id) ? "" : <><Button onClick={() => dispatch(increamentQuantity(item.id))} style={{marginRight: "1rem"}}>+</Button>
                        <Button onClick={() => dispatch(decreamentQuantity(item.id))}>-</Button></>
                      }
                    </td>
                    <td>
                      
                      <Button onClick={() => remove(item.id)}>Remove</Button>
                      
                    </td>
                    
                    
                  </tr>
                </tbody>
              )
            })
          }

          <tfoot className='text-center font-weight-bold'>
            <tr>
              <td colSpan="3">Total</td>
              <td>{cartData.totalQty}</td>
              <td colSpan="3">{Math.ceil(cartData.totalAmt)}</td>
            </tr>
          </tfoot>
        </table>
        : <h3 style={{color: "black"}}>Your cart is empty, fill it now <Link to="/"><Button>Check Products</Button></Link></h3>
      }
      
    </Container>
    
  );
}

export default Cart;