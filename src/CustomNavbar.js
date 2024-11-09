import { useState } from 'react';
import { Container, Navbar, Offcanvas, Button, ListGroup, Nav, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleMinus, faCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from "react-redux";
import { changeQuantity, removeItem } from './actions';
import { useNavigate } from 'react-router-dom';
import './CustomNavbar.css';


const CustomNavbar = ({ setShow, show, setShowAlert }) => {
    const [showModal, setShowModal] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);
    const navigate = useNavigate();
    const items = useSelector(st => st.items);
    const dispatch = useDispatch();

    function handleQtyChange(item, action) {
        if (action == 'increment') {
            dispatch(changeQuantity(item, action))
        }
        else if (action == 'decrement') {
            dispatch(changeQuantity(item, action))
        }
    }

    function handleRemoveItem(item) {
        setItemToRemove(item);
        setShowModal(true);
    }

    function confirmRemoveItem() {
        // Logic to remove item
        console.log(`Removing item: ${itemToRemove.name}`);
        dispatch(removeItem(itemToRemove));
        setShowModal(false);
        setShowAlert({
            status: true,
            message: "Item removed"
        });
        
        // Automatically hide the alert after a few seconds
        setTimeout(() => {
            setShowAlert({
                status: false,
                message: null,
            });
        }, 3000);
    }

    function calculateTotal() {
        //Calculate total price for all items in cart
        let total = 0;
        items.forEach(item => {
            total += (item.price * item.quantity);
        })
        return total.toFixed(2);
    }

    function goToCheckout() {
        setShow(false);
        navigate('/checkout');
    }

    return (
        <Navbar expand="lg" className='navbar' sticky='top'>
            <Container>
                <Navbar.Brand href="/">PopVault</Navbar.Brand>
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
                                <>
                                    {items.map(item => (
                                        <ListGroup.Item key={item.id} className='cart-item'>
                                            <div className='item-box'>
                                                <div className='item-price-row'>
                                                    <Nav>
                                                        <Nav.Link href={`/item/${item.id - 1}`}>
                                                            <p className='item-name'>{item.name}</p>
                                                        </Nav.Link>
                                                    </Nav>
                                                    <FontAwesomeIcon icon={faTrashCan} onClick={() => handleRemoveItem(item)} className='remove-btn' />

                                                    <p className='price'>${item.price}</p>
                                                </div>
                                                <div className='item-qty-box'>
                                                    <FontAwesomeIcon icon={faCircleMinus} onClick={() => handleQtyChange(item, 'decrement')} className='decrement-btn' />
                                                    <p>&nbsp; {item.quantity} &nbsp;</p>
                                                    <FontAwesomeIcon icon={faCirclePlus} onClick={() => handleQtyChange(item, 'increment')} className='increment-btn' />
                                                </div>
                                            </div>
                                        </ListGroup.Item>
                                    ))}

                                    <Container className='total-cont'>
                                        <h4>Total:</h4>
                                        <h4>{calculateTotal()}</h4>
                                    </Container>

                                    <Button className='checkout-btn' onClick={() => goToCheckout()}>Checkout</Button>
                                </>
                            ) : (
                                <p>Your cart is empty.</p>
                            )}


                        </ListGroup>
                    </Offcanvas.Body>
                </Offcanvas>

                <Modal show={showModal} onHide={() => setShowModal(false)} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Removal</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Are you sure you want to remove "{itemToRemove?.name}" from your cart?</h4>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
                        <Button variant="danger" onClick={confirmRemoveItem}>Remove</Button>
                    </Modal.Footer>
                </Modal>


            </Container>
        </Navbar>
    )
}

export default CustomNavbar;