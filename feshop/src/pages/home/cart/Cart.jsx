import { useState } from 'react';
import { Table } from 'react-bootstrap';
import "./css/cart.css"
const Cart = () => {

    //const [carts, setCarts] = useState([]);
    const [items, setCarts] = useState([]);
    return (
        <>
            <div style={{margin: "1% 3%"}}>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item) => (
                            <tr key={item.id}>
                                <td>{item.name}</td>
                                <td>${item.price}</td>
                                <td>{item.quantity}</td>
                                <td>${item.price * item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default Cart;