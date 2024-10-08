import data from './data.json';
import './ItemsDisplay.css';
import { ItemCard } from './ItemCard';
import { Alert } from 'react-bootstrap';

const ItemsDisplay = ({ showAlert, setShowAlert }) => {
return (
    <div className='item-display'>
        {showAlert.status && 
            <Alert variant={'danger'}>
                {showAlert.message}
            </Alert>
        }
        
        
        <ul className='item-grid'>
        {data.map(item => (
            <li>
                <ItemCard item={item} />
            </li>
        ))}
        </ul>
    </div>
  );
}

export default ItemsDisplay;