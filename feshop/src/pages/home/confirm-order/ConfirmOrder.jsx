import React, { useEffect, useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import ReactPaginate from 'react-paginate';
import "./css/confirm_order.css"
import 'bootstrap/dist/css/bootstrap.css';
import accountService from "../../../services/account/account.service";
import cartServiceUser from "../../../services/user/user.cart.service";
import { useSelector } from "react-redux";


const ConfirmOrder = () => {

    const [productList, setProductList] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 3; // Số lượng user hiển thị trên mỗi trang
    const pageCount = Math.ceil(productList.length / usersPerPage); // Tính tổng số trang
    const pagesVisited = pageNumber * usersPerPage; // Số user đã xem

    const [inforUser, setInforUser] = useState({
        username: "",
        phone: "",
        address: ""
    });

    const data = useSelector(state => state.listProductBuy);
    const listRequest=data.productSelectList;

    useEffect(() => {
        accountService.inforUserByIdService(JSON.parse(localStorage.getItem("currentUser")).userId).then((dataResponse) => {
            let user = dataResponse.data;
            setInforUser({
                username: user.username,
                phone: user.phone,
                address: user.address
            });
        }).catch((e) => {
            alert(e.response.data)
        });

        // lay tat ca san pham trong gio cua nguoi dung theo id
        cartServiceUser.getAllProductInCartService(JSON.parse(localStorage.getItem("currentUser")).userId).then((dataResponse) => {
            let dataTable =dataResponse.data;

            const dataCartBuy = dataTable.filter(item => listRequest.includes(item.id.productId))
            setProductList(dataCartBuy);
        }).catch((e) => {
            alert(e.response.data)
        });
    }, [pageNumber,listRequest]);

    const displayUsers = productList.slice(pagesVisited, pagesVisited + usersPerPage).map(user => {
        return (
            <tr key={user.id.productId}>
                <td>{user.id.productId}</td>
                <td style={{ padding: "0px", width: "10%" }}><img src={user.product.productImage} alt="" style={{ width: "10%", margin: "0px" }} /></td>
                <td>{user.product.productName}</td>
                <td>{user.product.unitPrice} đ</td>
                <td>{user.quantity}</td>
                <td>{user.quantity * user.product.unitPrice} đ</td>
            </tr>
        );
    });

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <>
            <h2 style={{ textAlign: "center" }}>Xác nhận đơn hàng</h2>
            <div style={{ display: "flex", border: "1px solid #2522ca" }}>
                <div style={{ width: "70%", margin: "0px 5px" }}>
                    <h5 style={{ textAlign: "center" }}>Sản phẩm mua</h5>
                    <div style={{ margin: "1% 0x 0px 1%", padding: "0%", borderRadius: "0%" }} className="table-responsive">
                        <table >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th style={{ width: "30%" }}>Ảnh sản phẩm</th>
                                    <th>tên sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Tổng cộng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayUsers}
                            </tbody>
                        </table>
                        <div>
                            <div style={{ float: "left", padding:"1%" }}>
                                <ReactPaginate
                                    previousLabel={'Previous'}
                                    nextLabel={'Next'}
                                    pageCount={pageCount}
                                    onPageChange={changePage}
                                    containerClassName={'pagination'}
                                    previousLinkClassName={'pagination__link'}
                                    nextLinkClassName={'pagination__link'}
                                    disabledClassName={'pagination__link--disabled'}
                                    activeClassName={'pagination__link--active'}
                                />
                            </div>
                            <div style={{ float: "right" }}>
                                <p>Shipping: Miễn phí</p>
                                <p>Tổng tiền: 000000</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ width: "30%", margin: "0px 5px", borderLeft: "1px solid #2522ca" }}>
                    <h5 style={{ textAlign: "center" }}>Thông tin</h5>
                    <div style={{ margin: "1% 0x 0px 1%", padding: "1%", borderRadius: "0%" }}>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formName">
                                        <Form.Label>Tên người nhận</Form.Label>
                                        <Form.Control type="text" placeholder="Người nhận" defaultValue={inforUser.username} />
                                    </Form.Group>
                                    <Form.Group controlId="formSdt">
                                        <Form.Label>Số điện thoại</Form.Label>
                                        <Form.Control type="text" placeholder="Enter email" defaultValue={inforUser.phone} />
                                    </Form.Group>
                                    <Form.Group controlId="formAddress">
                                        <Form.Label>Địa chỉ nhận</Form.Label>
                                        <Form.Control type="text" placeholder="Địa chỉ" defaultValue={inforUser.address} />
                                    </Form.Group>
                                    <div >
                                        <Form.Group controlId="formRadio" >
                                            <Form.Label>Chọn phương thức thanh toán</Form.Label>
                                            <Form.Check type="radio" label="Tiền mặt" name="formRadio" id="option1" />
                                            <Form.Check type="radio" label="Thanh toán với momo" name="formRadio" id="option2" />
                                        </Form.Group>
                                    </div>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>

            <div style={{ margin: "1% 40%", width: "60%" }}>
                <Button variant="outline-success" style={{ width: "30%" }}>Đặt hàng</Button>
            </div>
        </>
    )
}

export default ConfirmOrder;