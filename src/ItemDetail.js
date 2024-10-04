import React, { useEffect, useRef } from 'react';
import './ItemDetail.css';
import Container from 'react-bootstrap/Container';
import Carousel from 'react-bootstrap/Carousel';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import $ from 'jquery';
import { faShoppingBag, faLock } from '@fortawesome/free-solid-svg-icons';
import data from './data.json';
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "./actions";

const ItemDetail = ({ setShow, show }) => {
    const { id } = useParams();
    const btnCartRef = useRef(null);

    const items = useSelector(st => st.items);
    const dispatch = useDispatch();

    const item = data[id];
    console.log(item)
    console.log(JSON.parse(sessionStorage.getItem("cartItems")));

    useEffect(() => {
        // Checks if item is already in cart
        console.log('Running useEffect:', { items, item });
        if (item) {
            const matchingItems = items.filter(i => i.id === item.id);
            if (matchingItems.length > 0) {
                btnCartRef.current.parentElement.classList.add('bought');
            }
        }
    }, [items, item]);

    function addItem() {
        // add item to cart
        if (!item) return;

        if (btnCartRef.current) {
            btnCartRef.current.classList.add('loader');
        }
        dispatch(addToCart(item));
        setTimeout(() => {
            if (btnCartRef.current) {
                btnCartRef.current.classList.remove('loader');
                btnCartRef.current.parentElement.classList.add('bought');
            }
        }, 1000);
    }

    return (
        <Container className='detail-page'>
            <p className='carousel-name'>{item.name}</p>
            <Carousel slide={false} interval={null} data-bs-theme="dark" className='carousel'>
                {item.images.map(img => (
                    <Carousel.Item>
                        <img src={img} className='carousel-image'></img>
                    </Carousel.Item>
                ))}
            </Carousel>
            <Container className='price-cont'>
                <Row>
                    <Col>
                        <p className='detail-description'>{item.description.toUpperCase()}</p>
                        <p className='detail-price'>${item.price}</p>
                        <p>Rating: {item.rating}</p>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="btn_wrapper">
                            <button
                                type="button"
                                className="button btn-cart"
                                onClick={() => addItem()}
                                ref={btnCartRef}
                            >
                                <span>
                                    <i className="fa fa-shopping-cart"></i>
                                    <i className="fa fa-arrow-down"></i>
                                    <span>Add to cart</span>
                                </span>
                                <div className="spinner"></div>
                            </button>
                            <a className="cart" onClick={() => setShow(!show)}>
                                <span >
                                    <FontAwesomeIcon icon={faShoppingBag} className="fa fa-shopping-bag" />
                                    <span>View Cart</span>
                                </span>
                            </a>
                            <a href="#" className="checkout">
                                <span>
                                    <FontAwesomeIcon icon={faLock} className="fa fa-lock" />
                                    <span>Checkout</span>
                                </span>
                            </a>
                        </div>
                    </Col>
                </Row>
            </Container>
        </Container>
    );
}

export default ItemDetail