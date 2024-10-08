import './Checkout.css';
import { useState } from 'react';
import { Container, Table, Image } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleMinus, faCirclePlus, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from "react-redux";

const Checkout = ({ setShowAlert }) => {
    const items = useSelector(st => st.items);
    const dispatch = useDispatch();

    return (
        <Container>
            <h1>Shopping Cart</h1>
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
                                        <Image src={item.image} className='checkout-img' />
                                    </div>
                                    <div className='checkout-content'>
                                        <p style={{ margin: '15px 0 -10px 15px', fontWeight: 'bold' }}>{item.name}</p>
                                        <p style={{ margin: '35px 0 0 15px' }}>{item.description.toUpperCase()}</p>
                                    </div>
                                </div>
                            </td>
                            <td className="col-1" style={{ verticalAlign: 'middle' }}>${item.price}</td>
                            <td className="col-1" style={{ verticalAlign: 'middle' }}>{item.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )
};

export default Checkout;