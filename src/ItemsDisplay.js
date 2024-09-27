import data from './data.json';
import './ItemsDisplay.css';
import { ItemCard } from './ItemCard';

const ItemsDisplay = () => {
return (
    <div className='item-display'>
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