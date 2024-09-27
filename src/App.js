import './App.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ItemsDisplay from './ItemsDisplay';
import ItemDetail from './ItemDetail';
import CustomNavbar from './CustomNavbar';

function App() {
  const [show, setShow] = useState(false);

  return (
    <div className="App">
    <Router>
      <CustomNavbar setShow={setShow} show={show}/>
      <Routes>
        {/* Home route to display the list of items */}
        <Route path="/" element={<ItemsDisplay />} />

        {/* Dynamic route to display details for a specific item */}
        <Route path="/item/:id" element={<ItemDetail setShow={setShow} show={show}/>} />
      </Routes>
    </Router>
    </div>
    );
}

export default App;