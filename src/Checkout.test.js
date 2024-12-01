import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import Checkout from './Checkout';
import { removeItem, clearCart } from './actions';

jest.mock('./actions', () => ({
    removeItem: jest.fn(),
    clearCart: jest.fn(),
}));

const mockStore = configureStore([]);

describe('Checkout Component', () => {
    let store;
    let setShowAlert;

    beforeEach(() => {
        store = mockStore({
            items: [
                { id: 1, name: 'Item 1', price: 10.0, quantity: 2, image: 'image1.jpg', description: 'Test item 1' },
                { id: 2, name: 'Item 2', price: 15.5, quantity: 1, image: 'image2.jpg', description: 'Test item 2' },
            ],
        });

        setShowAlert = jest.fn();
    });

    test('renders the component and displays items', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Checkout setShowAlert={setShowAlert} />
                </Router>
            </Provider>
        );

        expect(screen.getByText('Shopping Cart')).toBeInTheDocument();
        expect(screen.getByText('Item 1')).toBeInTheDocument();
        expect(screen.getByText('Item 2')).toBeInTheDocument();
        expect(screen.getByText('$10')).toBeInTheDocument();
        expect(screen.getByText('$15.5')).toBeInTheDocument();
    });

    test('calculates the total correctly', () => {
        render(
            <Provider store={store}>
                <Router>
                    <Checkout setShowAlert={setShowAlert} />
                </Router>
            </Provider>
        );

        const total = screen.getByText('Total: $35.5');
        expect(total).toBeInTheDocument();
    });

    test('displays empty cart message when no items', () => {
        store = mockStore({
            items: [],
        });

        render(
            <Provider store={store}>
                <Router>
                    <Checkout setShowAlert={setShowAlert} />
                </Router>
            </Provider>
        );

        expect(screen.getByText('Your cart is empty')).toBeInTheDocument();
    });
});