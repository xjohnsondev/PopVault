import { useState, useEffect } from 'react';
import { Container, Navbar, Offcanvas, Button, ListGroup, Row, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleMinus, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from "react-redux";
import './CustomNavbar.css';
import { addToCart, changeQuantity } from './actions';
import Pagination from 'react-bootstrap/Pagination';


const CustomNavbar = ({ setShow, show }) => {
    const items = useSelector(st => st.items);
    const dispatch = useDispatch();

    const [activePage, setActivePage] = useState(1);
    const itemsPerPage = 7;

    // Calculate the items to show on the current page
    const indexOfLastItem = activePage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = items.slice(indexOfFirstItem, indexOfLastItem);
    
    // Number of total pages (ceil to ensure rounding up)
    const totalPages = Math.ceil(items.length / itemsPerPage);

    
    console.log(items)

    function handleQtyChange(item, action) {
        if (action == 'increment') {
            dispatch(changeQuantity(item, action))
        }
        else if (action == 'decrement') {
            dispatch(changeQuantity(item, action))
        }
    }

    // Handle page change
    const handlePageChange = (pageNumber) => {
        setActivePage(pageNumber);
    };

    return (
        <Navbar expand="lg" className='navbar' sticky='top'>
            <Container>
                <Navbar.Brand href="/">PopVault</Navbar.Brand>

                <Button
                    variant='none'
                    className='button ms-auto'
                    onClick={() => setShow(!show)}
                >
                    <FontAwesomeIcon icon={faCartShopping} className="fa fa-cart-shopping" />
                </Button>

                <Offcanvas show={show} onHide={() => setShow(!show)} placement='end' backdrop='static'>
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Your Cart</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        
                        {/* Display items for the current page */}
                        <ListGroup variant="flush">
                            {currentItems.length > 0 ? (
                                currentItems.map(item => (
                                    <ListGroup.Item key={item.id} className='cart-item'>
                                        <div className='item-box'>
                                            <div className='item-price-row'>
                                                <p>{item.name}</p>
                                                <p>${item.price}</p>
                                            </div>
                                            <div className='item-qty-box'>
                                                <FontAwesomeIcon
                                                    icon={faCircleMinus}
                                                    onClick={() => handleQtyChange(item, 'decrement')}
                                                    className='decrement-btn'
                                                />
                                                <p>&nbsp; {item.quantity} &nbsp;</p>
                                                <FontAwesomeIcon
                                                    icon={faCirclePlus}
                                                    onClick={() => handleQtyChange(item, 'increment')}
                                                    className='increment-btn'
                                                />
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                ))
                            ) : (
                                <p>Your cart is empty.</p>
                            )}
                        </ListGroup>

                        {/* Pagination */}
                        <Pagination>
                            {[...Array(totalPages)].map((_, index) => (
                                <Pagination.Item
                                    key={index + 1}
                                    active={index + 1 === activePage}
                                    onClick={() => handlePageChange(index + 1)}
                                >
                                    {index + 1}
                                </Pagination.Item>
                            ))}
                        </Pagination>
                    </Offcanvas.Body>
                </Offcanvas>
            </Container>
        </Navbar>
    );
}

export default CustomNavbar;