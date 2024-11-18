import { useNavigate } from 'react-router-dom';
import { Container, Button} from 'react-bootstrap';
import './NotFound.css';

const NotFound = () => { 
    const navigate = useNavigate();

    return (
    <Container className="error-page">
        <h1>404</h1>
        <p>Oops! We couldn’t find that page.</p>
        <p>It looks like you’ve taken a wrong turn in the Funko-verse.</p>
        <Button onClick={() => navigate('/PopVault')}>Return to PopVault</Button>
    </Container>
    )
}

export default NotFound;