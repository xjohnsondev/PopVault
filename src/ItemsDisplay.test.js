import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import ItemsDisplay from './ItemsDisplay';
import { MemoryRouter } from 'react-router-dom';
import { Alert } from 'react-bootstrap';

// Sample mock data for testing
const mockData = [
  { id: 1, name: 'Baby Yoda', price: 12.99, description: 'The Child from The Mandalorian' },
  { id: 2, name: 'Iron Man', price: 14.99, description: 'Tony Stark in his Iron Man suit' },
];

// Mock reducer to replace store
const mockReducer = (state = { items: mockData }, action) => state;

// Create a mock Redux store using configureStore
const store = configureStore({
  reducer: {
    items: mockReducer,
  },
});

describe('ItemsDisplay Component', () => {
  it('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Provider store={store}>
          <ItemsDisplay showAlert={{ status: false, message: '' }} setShowAlert={() => {}} />
        </Provider>
      </MemoryRouter>
    );

     // Check if the items are being rendered correctly
     mockData.forEach(item => {
        expect(screen.getByText(new RegExp(item.name, 'i'))).toBeInTheDocument();  
        expect(screen.getByTestId(`item-price-${item.id}`)).toHaveTextContent(`$${item.price}`);  
      });
  });

  it('displays an alert when showAlert.status is true', () => {
    const showAlert = { status: true, message: 'Something went wrong!' };

    render(
      <MemoryRouter>
        <Provider store={store}>
          <ItemsDisplay showAlert={showAlert} setShowAlert={() => {}} />
        </Provider>
      </MemoryRouter>
    );

    // Check if the alert is shown
    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();
  });

  it('does not display alert when showAlert.status is false', () => {
    const showAlert = { status: false, message: '' };

    render(
      <MemoryRouter>
        <Provider store={store}>
          <ItemsDisplay showAlert={showAlert} setShowAlert={() => {}} />
        </Provider>
      </MemoryRouter>
    );

    // Ensure no alert is shown
    expect(screen.queryByText('Something went wrong!')).toBeNull();
  });
});