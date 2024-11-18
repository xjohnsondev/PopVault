import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import CustomNavbar from './CustomNavbar';
import { changeQuantity, removeItem } from './actions';

const mockStore = configureStore([]);

describe('CustomNavbar Component', () => {
  let store;


  beforeEach(() => {
    store = mockStore({
      items: [
        { id: 1, name: 'Item 1', price: 10.0, quantity: 2 },
        { id: 2, name: 'Item 2', price: 20.0, quantity: 1 },
    ], // Mock initial state
    });
    store.dispatch = jest.fn();

  });

  test('renders without crashing', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CustomNavbar setShow={jest.fn()} show={true} setShowAlert={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    // Tests if mock data and total calculation is rendering
    expect(screen.getByText('Your Cart')).toBeInTheDocument();
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Item 2')).toBeInTheDocument();
    expect(screen.getByText('$10')).toBeInTheDocument();
    expect(screen.getByText('$20')).toBeInTheDocument();
    expect(screen.getByText('Total:')).toBeInTheDocument();
    expect(screen.getByText('$40')).toBeInTheDocument(); // Total: 10*2 + 20*1
  });

  test('increments quantity', async () => {
    const { rerender } = render(
      <Provider store={store}>
        <MemoryRouter>
          <CustomNavbar setShow={jest.fn()} show={true} setShowAlert={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
  
    // Find the increment button for Item 1
    const incrementButton = screen.getByTestId('increment-button-1');
    
    // Simulate clicking the increment button
    fireEvent.click(incrementButton);
  
    // Verify that the dispatch function is called with the correct action
    expect(store.dispatch).toHaveBeenCalledWith(
      changeQuantity({ id: 1, name: 'Item 1', price: 10.0, quantity: 2 }, 'increment')
    );
  
    // Update the store state to simulate the incremented quantity
    store = mockStore({
      items: [
        { id: 1, name: 'Item 1', price: 10.0, quantity: 3 },
        { id: 2, name: 'Item 2', price: 20.0, quantity: 1 },
      ],
    });
  
    // Re-render the component with the updated store
    rerender(
      <Provider store={store}>
        <MemoryRouter>
          <CustomNavbar setShow={jest.fn()} show={true} setShowAlert={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );
  
    // Verify the quantity update
    const quantityElement = screen.getByTestId('quantity-1');
    expect(quantityElement).toHaveTextContent('3');
  });

  test('removes an item from the cart', async () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CustomNavbar setShow={jest.fn()} show={true} setShowAlert={jest.fn()} />
        </MemoryRouter>
      </Provider>
    );

    // Find the trash can button for the first item
    const trashButton = screen.getByTestId('trash-1');

    // Simulate clicking the trash button
    fireEvent.click(trashButton);

    // Expect a modal to appear asking for confirmation
    const modalPrompt = screen.getByText('Are you sure you want to remove "Item 1" from your cart?');
    expect(modalPrompt).toBeInTheDocument();

    // Confirm the removal
    const confirmButton = screen.getByTestId('remove-1');
    fireEvent.click(confirmButton);

    // Verify that the dispatch function was called with the correct action
    expect(store.dispatch).toHaveBeenCalledWith(removeItem({ id: 1, name: 'Item 1', price: 10.0, quantity: 2 }));
  });
});