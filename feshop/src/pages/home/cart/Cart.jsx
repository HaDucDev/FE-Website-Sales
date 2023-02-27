import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import cartServiceUser from '../../../services/user/user.cart.service';
import CartItem from './CartItem';
import "./css/cart.css"
const Cart = () => {

    const [carts, setCarts] = useState([]);

    useEffect(() => {
        cartServiceUser.getAllProductInCartService(JSON.parse(localStorage.getItem("currentUser")).userId).then((dataResponse) => {
            console.log("test 12345678 - " + JSON.parse(localStorage.getItem("currentUser")).userId)
            setCarts(dataResponse.data);
            console.log(dataResponse.data)
        })
    }, [])
    return (
        <>
            <div style={{ margin: "1% 3%" }}>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Mã sản phẩm</th>
                            <th>Số lượng</th>
                            <th>Giá</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            carts.length > 0 ? (
                                carts.map((item, index) => {
                                    return (<CartItem key={index} data={item} />)
                                })
                            ) : (<tr>
                                <td colSpan={4}>Không có sản phẩm nào</td>
                            </tr>)
                        }
                    </tbody>
                </Table>
            </div>
        </>
    )
}

export default Cart;