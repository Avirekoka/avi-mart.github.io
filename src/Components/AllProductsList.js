import React, { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Actions/CartAction';
import { useState } from 'react';
import {checkPrime} from '../Utility/utilityFunction';
import { handlePageData, searchResult } from '../Actions/EcommerceAction';
import Pagination from 'react-bootstrap/Pagination';
import {soldOutProducts,itemsPerPage} from '../Utility/utilityFunction';

function AllProductList() {

  const ecommerceData = useSelector(state => state.ecommerce);
  const [soldProducts,setSoldProducts] = useState(false); 
  const [activePage, setActivePage] = useState(1); 
  const [lowerIndex,setLowerIndex] = useState(0);
  const [higherIndex,setHigherIndex] = useState(itemsPerPage);
  const [initialState, setInitialState] = useState([]);
  const [searchText,setSearchText] = useState({
    txt : "",
    currPage: 1
  })
  const itemsList = [];
  
  const dispatch = useDispatch();

  setTimeout(() => {
    setSoldProducts(true);
  }, 60000);

  
  for (let i = 1; i <= Math.ceil(ecommerceData.totalProducts/itemsPerPage); i++) {
    itemsList.push(
      <Pagination.Item key={i} active={i === activePage}>
        {i}
      </Pagination.Item>,
    );
  }
  
  const handlePaginationData = (low, high) => {
    if(ecommerceData.totalProducts > 0){
      setInitialState(ecommerceData.products.slice(low,high));
    }
  };

  const handlePageChange = (e) => {
    const currentPage = Number(e.target.textContent);
    const lowInd = itemsPerPage * (currentPage - 1);
    const upInd = itemsPerPage * currentPage;
    
    setActivePage(currentPage);

    dispatch(handlePageData(lowInd, upInd))
  };

  const handleSearch = (e) => {
    setSearchText(prevState => ({
      ...prevState,
      currPage: activePage,
      txt: e.target.value
    }));
    dispatch(searchResult(searchText));
  }
  
  useEffect(() => {
    handlePaginationData(lowerIndex, higherIndex);
  }, [ecommerceData, activePage, searchText]);
  
  return (
    <Container className='mt-4'>
        
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Search Product</Form.Label>
            <Form.Control placeholder="Search Products" onChange={(e) => handleSearch(e)} autoComplete="off" style={{width: "20rem"}} />
          </Form.Group>
        </Form>
        <hr />
        <div style={{display: "grid", gridTemplateColumns: "1fr 1fr 1fr"}}>
            {
                initialState?.map(item => {
                    return(
                        <Card style={{ width: '20rem',marginBottom: "1rem", padding: "5px"}} key={item.id} >
                            <Card.Title className='text-center'>{item.title}</Card.Title>
                            <Card.Img variant="top" src={item.image} className="p-5" style={{height: "25rem"}} />
                            <Card.Body>                        
                                <Card.Text style={{background: "green",fontWeight: "bold",textAlign: "center"}}>Rating - {item.rating.rate}<i className="bi bi-sticky"></i></Card.Text>
                                {
                                  checkPrime(item.id) === true ? <Card.Text>Buy at - <span style={{textDecoration: "line-through", color: "red"}}>{item.price} RS</span> <span style={{color: "green"}}>5% off </span>{(item.price - ((item.price*5)/100)).toFixed(2)} RS </Card.Text> : <Card.Text>Buy at - {item.price.toFixed(2)} RS</Card.Text> 
                                }
                            </Card.Body>
                            
                            {
                                soldProducts && soldOutProducts.includes(item.id) ? <Button className="disabled">Sold Out</Button> : <Button onClick={() => dispatch(addToCart(item.id))} >Add To Cart</Button>
                            }
                            
       
                        </Card>
                    )
                })
            }
        </div>
        
        <Pagination onClick={(e) => handlePageChange(e)}>{itemsList}</Pagination>
    </Container>
  );
}

export default AllProductList;