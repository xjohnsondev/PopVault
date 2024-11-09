import './Checkout.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleMinus, faCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from "react-redux";
import { removeItem } from './actions';

import { Container, Table, Image, Button, Modal } from 'react-bootstrap';

const Checkout = ({ setShowAlert }) => {
    const [showModal, setShowModal] = useState(false);
    const [itemToRemove, setItemToRemove] = useState(null);

    const items = useSelector(st => st.items);
    console.log(items)
    const dispatch = useDispatch();

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

    return (
        <Container>
            <h1 className='checkout-header'>Shopping Cart</h1>
            <Table responsive className='checkout-table'>
                <thead>
                    <tr>
                        <th className="col-6"></th>
                        <th className="col-1">Price</th>
                        <th className="col-1">Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {items && items.map(item => (
                        <tr key={item.id}>
                            <td className="col-6">
                                <div className='table-item'>
                                    <div className='checkout-img-box'>
                                        <Link to={`/item/${item.id - 1}`}>
                                            <Image src={item.image} className='checkout-img' />
                                        </Link>
                                    </div>
                                    <div className='checkout-content'>
                                        <div className="checkout-item-title">
                                            <Link to={`/item/${item.id - 1}`} style={{ textDecoration: 'none' }}>
                                                <p style={{ margin: '15px 0 -10px 15px', fontWeight: 'bold', color: 'black' }}>{item.name}</p>
                                            </Link>
                                            <Button
                                                variant='none'
                                                className='button ms-auto checkout-trashcan'
                                                onClick={() => handleRemoveItem(item)}
                                                >
                                                <FontAwesomeIcon icon={faTrashCan} className="fa" />
                                            </Button>
                                        </div>
                                        <p style={{ margin: '20px 0 0 15px', fontSize: '14px' }}>{item.description.toUpperCase()}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="col-1" style={{ verticalAlign: 'middle' }}>${item.price}</td>
                            <td className="col-1" style={{ verticalAlign: 'middle' }}>{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
                <tfoot>

                </tfoot>
            </Table>

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
    )
};

export default Checkout;