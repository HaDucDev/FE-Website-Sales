import React, { useState } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import ReactPaginate from 'react-paginate';
import "./css/confirm_order.css"
import 'bootstrap/dist/css/bootstrap.css';
const ConfirmOrder = () => {

    const [users, setUsers] = useState([]);
    const [pageNumber, setPageNumber] = useState(0);
    const usersPerPage = 3; // Số lượng user hiển thị trên mỗi trang
    const pageCount = Math.ceil(users.length / usersPerPage); // Tính tổng số trang
    const pagesVisited = pageNumber * usersPerPage; // Số user đã xem

    const displayUsers = users.slice(pagesVisited, pagesVisited + usersPerPage).map(user => {
        return (
            <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.phone}</td>
            </tr>
        );
    });

    const changePage = ({ selected }) => {
        setPageNumber(selected);
    };

    return (
        <>
            <h2 style={{ textAlign: "center" }}>Xác nhận đơn hàng</h2>
            <Row>
                <Col>
                    <h5 style={{ textAlign: "center" }}>Sản phẩm mua</h5>
                    <div style={{ margin: "0px 3%", border: "1px solid #2522ca", padding: "1%", borderRadius: "0%" }}  class="table-responsive">
                        <table >
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Ảnh sản phẩm</th>
                                    <th>tên sản phẩm</th>
                                    <th>Giá</th>
                                    <th>Số lượng</th>
                                    <th>Tổng cộng</th>
                                </tr>
                            </thead>
                            <tbody>
                                {displayUsers}
                                <tr><td></td><td></td><td></td><td></td><td></td><td>Shipping:Miễn phí</td></tr>
                                <tr><td></td><td></td><td></td><td></td><td></td><td>Tổng tiền:000000</td></tr>
                            </tbody>
                        </table>
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
                </Col>
                <Col>
                    <h5 style={{ textAlign: "center" }}>Thông tin</h5>
                    <div style={{ margin: "0px 3%", border: "1px solid #2522ca", padding: "1%", borderRadius: "0%" }}>
                        <Form>
                            <Row>
                                <Col>
                                    <Form.Group controlId="formName">
                                        <Form.Label>Tên người nhận</Form.Label>
                                        <Form.Control type="text" placeholder="Người nhận" />
                                    </Form.Group>
                                    <Form.Group controlId="formSdt">
                                        <Form.Label>Số điện thoại</Form.Label>
                                        <Form.Control type="text" placeholder="Enter email" />
                                    </Form.Group>
                                    <Form.Group controlId="formAddress">
                                        <Form.Label>Địa chỉ nhận</Form.Label>
                                        <Form.Control type="text" placeholder="Địa chỉ" />
                                    </Form.Group>
                                </Col>
                                <Col style={{ margin: "0px 2%", justifyContent: "center" }}>
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
                </Col>
            </Row>
            <div style={{ margin: "1% 40%", width: "60%" }}>
                <Button variant="outline-success" style={{ width: "30%" }}>Đặt hàng</Button>
            </div>
        </>
    )
}

export default ConfirmOrder;