import { useState, useEffect } from 'react';

const UseCalculateTotal = (cart) => {
    const [total, setTotal] = useState(0.00);

    useEffect(() => {
        //Calculate total price for all items in cart
        let agg = 0;
        cart.forEach(item => {
            agg += (item.price * item.quantity);
        })
        setTotal(agg.toFixed(2));
    }, [cart])

    return total;
}

export default UseCalculateTotal;