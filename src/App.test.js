import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store'; // Import redux-mock-store
import App from './App';

// Create a mock store with initial state
const mockStore = configureStore();
const store = mockStore({
  items: [] // Add your initial state for the store here
});

describe('App Component Smoke Test', () => {
  test('renders without crashing', () => {
    render(
      <Provider store={store}> {/* Wrap with Provider only */}
        <App />
      </Provider>
    );

    // Verify that the Navbar is rendered
    expect(screen.getByText('PopVault')).toBeInTheDocument();
  });
});