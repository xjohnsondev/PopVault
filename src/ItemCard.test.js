import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import { ItemCard } from './ItemCard';

// Mocking useNavigate hook
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: jest.fn(),
}));

describe('ItemCard', () => {
  const mockItem = {
    id: 2,
    name: 'Funko Pop Example',
    price: 15.99,
    images: ['https://example.com/image.jpg'],
  };

  // Smoke Test: Check if the component renders without crashing
  it('should render without crashing', () => {
    const { container } = render(
      <MemoryRouter>
        <ItemCard item={mockItem} />
      </MemoryRouter>
    );
    
    // Simply check if the component rendered without crashing
    expect(container).toBeInTheDocument();
  });

  it('should render item details correctly', () => {
    render(
      <MemoryRouter>
        <ItemCard item={mockItem} />
      </MemoryRouter>
    );

    // Check if the item details are rendered
    expect(screen.getByText(mockItem.name)).toBeInTheDocument();
    expect(screen.getByText(`$${mockItem.price}`)).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', mockItem.images[0]);
  });

  it('should navigate to the correct item detail page on card click', () => {
    // Create a mock navigate function
    const mockNavigate = jest.fn();

    // Mock the useNavigate hook to use the mock function
    useNavigate.mockReturnValue(mockNavigate);

    render(
      <MemoryRouter>
        <ItemCard item={mockItem} />
      </MemoryRouter>
    );

    // Simulate a click event on the image
    fireEvent.click(screen.getByRole('img'));

    // Assert that navigate was called with the correct path
    expect(mockNavigate).toHaveBeenCalledWith('/item/1'); // item.id - 1
  });
});