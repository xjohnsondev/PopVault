import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemsDisplay from './ItemsDisplay';
import ItemDetail from './ItemDetail';
import CustomNavbar from './CustomNavbar';
import Checkout from './Checkout';
import NotFound from './NotFound';

function App() {
  const [show, setShow] = useState(false);
  const [showAlert, setShowAlert] = useState({
    status: false,
    message: null,
  });

  return (
    <div className="App">
    <Router>
      <CustomNavbar setShow={setShow} show={show} setShowAlert={setShowAlert}/>
      <Routes>
        {/* Home route to display the list of items */}
        <Route path="/" element={<ItemsDisplay showAlert={showAlert} setShowAlert={setShowAlert}/>} />

        {/* Dynamic route to display details for a specific item */}
        <Route path="/item/:id" element={<ItemDetail setShow={setShow} show={show} showAlert={showAlert} setShowAlert={setShowAlert}/>} />

        {/* Route to display checkout page */}
        <Route path="/checkout" element={<Checkout showAlert={showAlert} setShowAlert={setShowAlert}/>} />
     
        {/* Route to 404 error page */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
    </div>
    );
}

export default App;