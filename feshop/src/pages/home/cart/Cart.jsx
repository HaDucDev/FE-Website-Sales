import { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import cartServiceUser from '../../../services/user/user.cart.service';
import CartItem from './CartItem';
import "./css/cart.css"
import Pagination from 'react-pagination-library';
import 'react-pagination-library/build/css/index.css';
const Cart = () => {

    const [carts, setCarts] = useState([]);// lưu trữ dữ liệu list

    const [loadCart, setLoadCart] = useState(0);

    const [currentPage, setCurrentPage] = useState(1); // lưu trữ trang hiện tại
    const itemsPerPage = 2; // số lượng items trên mỗi trang

    // hàm để tính toán index bắt đầu và index kết thúc của items trên mỗi trang
    const getIndexes = () => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        const endIndex = startIndex + itemsPerPage;
        return { startIndex, endIndex };
    };

    // hàm để lấy danh sách items theo trang hiện tại
    const getCurrentItems = () => {
        const { startIndex, endIndex } = getIndexes();
        return carts.slice(startIndex, endIndex);
    };

    useEffect(() => {
        cartServiceUser.getAllProductInCartService(JSON.parse(localStorage.getItem("currentUser")).userId).then((dataResponse) => {
            console.log("test 12345678 - " + JSON.parse(localStorage.getItem("currentUser")).userId)
            setCarts(dataResponse.data);
            console.log(dataResponse.data)
        })
    }, [loadCart,currentPage])

    // hàm callback được gọi khi người dùng chọn trang mới
    const onPageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
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
                            getCurrentItems().length > 0 ? (
                                getCurrentItems().map((item) => {
                                    return (<CartItem key={item.id.productId} data={item} loadCart={setLoadCart} />)
                                })
                            ) : (<tr>
                                <td colSpan={4}>Không có sản phẩm nào</td>
                            </tr>)
                        }
                    </tbody>
                </Table>
            </div>
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(carts.length / itemsPerPage)}
                changeCurrentPage={onPageChange}
                theme="bottom-border"
            />
        </>
    )
}

export default Cart;