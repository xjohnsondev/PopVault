import { useState, useEffect } from 'react';
import { Container, Navbar, Offcanvas, Button, ListGroup, Row, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleMinus, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from "react-redux";
import './CustomNavbar.css';
import { addToCart } from './actions';

const CustomNavbar = ({ setShow, show }) => {
    const items = useSelector(st => st.items);

    const dispatch = useDispatch();

    console.log(items)

    function handleQtyChange(item, action) {
                if (action == 'increment') {
                    
                }
                else if (action == 'decrement') {
                    
                }
            
            console.log(items)
    }

    return (
        <Navbar expand="lg" className='navbar' sticky='top'>
            <Container>
                <Navbar.Brand href="#home">PopVault</Navbar.Brand>
                {/* <Navbar.Toggle aria-controls="basic-navbar-nav" /> */}

                <Button
                    variant='none'
                    className='button ms-auto'
                    onClick={() => setShow(!show)}>
                    <FontAwesomeIcon icon={faCartShopping} className="fa fa-cart-shopping" />
                </Button>

                <Offcanvas show={show}
                    onHide={() => setShow(!show)}
                    placement='end'
                    backdrop='static'
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Your Cart</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <ListGroup variant="flush">
                            {items.length > 0 ? (
                                items.map(item => (
                                    <ListGroup.Item key={item.id} className='cart-item'>
                                        <div className='item-box'>
                                            <div className='item-price-row'>
                                                <p>{item.name}</p>
                                                <p>${item.price}</p>
                                            </div>
                                            <div className='item-qty-box'>
                                                <FontAwesomeIcon icon={faCircleMinus} onClick={() => handleQtyChange(item.id, 'decrement')} className='decrement-btn'  />
                                                <p>&nbsp; {item.quantity} &nbsp;</p>                                                
                                                <FontAwesomeIcon icon={faCirclePlus} onClick={() => handleQtyChange(item.id, 'increment')} className='increment-btn' />

                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                ))
                            ) : (
                                <p>Your cart is empty.</p>
                            )}
                        </ListGroup>
                    </Offcanvas.Body>
                </Offcanvas>


            </Container>
        </Navbar>
    )
}

export default CustomNavbar;