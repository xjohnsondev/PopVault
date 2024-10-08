import { useNavigate } from 'react-router-dom';
import { Card, Image } from 'react-bootstrap';
import './ItemCard.css';

export const ItemCard = ({ item }) => {
    const navigate = useNavigate();
    
    function handleCardClick() {
        const pointer = item.id - 1;
        navigate(`/item/${pointer}`)
    }

    return (
            <Card className='item-card' onClick={handleCardClick}>
                <Card.Body className='image-container'>
                    <Image src={item.images[0]} fluid />
                    <p className='item-title'>{item.name}</p>
                </Card.Body>
                <Card.Body>
                    <p className='item-price'>${item.price}</p>
                </Card.Body>
            </Card>
    );
}

