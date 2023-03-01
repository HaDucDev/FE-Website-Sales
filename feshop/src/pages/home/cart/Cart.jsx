import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import cartServiceUser from '../../../services/user/user.cart.service';
import CartItem from './CartItem';
import "./css/cart.css"
const Cart = () => {

    const [carts, setCarts] = useState([]);

    const [loadCart, setLoadCart] = useState(0);

    useEffect(() => {
        cartServiceUser.getAllProductInCartService(JSON.parse(localStorage.getItem("currentUser")).userId).then((dataResponse) => {
            console.log("test 12345678 - " + JSON.parse(localStorage.getItem("currentUser")).userId)
            setCarts(dataResponse.data);
            console.log(dataResponse.data)
        })
    }, [loadCart])
    return (
        <>
            <h2 style={{ textAlign: 'center' }}>Giỏ hàng</h2>
            <div style={{ margin: "auto", width: "85%" }}>
                <Table responsive>
                    <thead>
                        <tr>
                            <th style={{ width: "1%" }}>Chọn</th>
                            <th style={{ width: "6%" }}>Mã sản phẩm</th>
                            <th style={{ width: "30%" }}>Sản phẩm</th>
                            <th style={{ width: "8%" }}>Số lượng</th>
                            <th style={{ width: "5%" }}>Giá</th>
                            <th style={{ width: "5%" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            carts.length > 0 ? (
                                carts.map((item, index) => {
                                    return (<CartItem key={index} data={item} loadCart={setLoadCart} />)
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