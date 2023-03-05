import { useEffect, useState } from "react";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import DataTable from "react-data-table-component";
import orderDeailServiceUser from "../../../services/user/user.order.detail.service";
import orderServiceUser from "../../../services/user/user.order.service";
import convert_vi_to_en from "../../../utils/utils";


const HistoryOrder = () => {

    const [orderList, setOrderList] = useState([]);// state datatable
    const [intiText, setText] = useState("");// state search
    const [initFilter, setFilter] = useState("");// state button loc
    const [isClickedColor, setIsClickedColor] = useState(null);// state hiển thị màu khi click filter dùng many button
    const [showOrderDetailModal, setShowOrderDetailMOdal] = useState(false);//state bat/tat modal chi tiet don hang

    const [orderDetailList, setOrderDetailList] = useState([]);// state order detail -list

    //const [inforOrderInOrder]

    useEffect(() => {
        orderServiceUser.getAllOrderByUserId(JSON.parse(localStorage.getItem("currentUser")).userId).then((response) => {
            setOrderList(response.data)
        }).catch(error => alert("Lỗi " + error.response.data + ". Bạn hãy quay lại sau."));
    }, [intiText, initFilter]);


    const searchAndFilter = (data) => {

        let dataSearch = data.filter(row => convert_vi_to_en(row.receiptUser.toLowerCase()).indexOf(convert_vi_to_en(intiText.toLowerCase())) > -1
            || row.ordersId.toString().includes(intiText)
            || row.totalAmount.toString().includes(intiText)
            || convert_vi_to_en(row.note.toLowerCase()).indexOf(convert_vi_to_en(intiText.toLowerCase())) > -1
            || convert_vi_to_en(row.statusOrder.toLowerCase()).indexOf(convert_vi_to_en(intiText.toLowerCase())) > -1);;

        if (initFilter === "tat_ca") {
            return dataSearch;
        }
        if (initFilter === "") {
            return dataSearch;
        }
        if (initFilter !== "") {
            return dataSearch.filter(item => (item.statusOrder).includes(initFilter));
        }
        return dataSearch;
    }

    const handleGetListOrderDetailByOrdersId = (ordersId) => {
        orderDeailServiceUser.getAllOrderDetailByOrdersId(ordersId).then((dataResponse) => {
            let listDetail = dataResponse.data;
            setOrderDetailList(listDetail);
        })
        setShowOrderDetailMOdal(true);
    }

    const colunmnsOrder = [
        {
            name: "Mã đơn hàng",
            selector: row => row.ordersId,
            sortable: true, // nha ten cot thi sort
            center: true
        },
        {
            name: "Người nhận",
            selector: (row) => row.receiptUser,
            center: true
        },
        {
            name: "Tổng tiền đơn hàng",
            selector: (row) => <div>{row.totalAmount} đ</div>,
            center: true
        },
        {
            name: "Trạng thái thanh toán",
            selector: row => row.note,
            center: true
        }
        , {
            name: "Tình trạng đơn hàng",
            selector: row => row.statusOrder,
            center: true
        },
        {
            name: "Action",
            cell: (row) => {
                return <>
                    <div style={{ margin: "auto", display: "flex", fontSize: "1%" }}>
                        <Button variant="outline-dark" onClick={() => handleGetListOrderDetailByOrdersId(row.ordersId)}>Chi tiết</Button>
                        <button style={{ marginLeft: "5px" }} className="btn btn-primary" >Hủy</button>
                    </div>
                </>
            },
            center: true
        }
    ];

    const customStylesOrder = {// css datatable
        headCells: {
            style: {
                backgroundColor: "#C0D5FF"
            },
        },
        headRow: {
            style: {

            },
        },

    };



    const colunmnsOrderDetail = [
        {
            name: "Mã sản phẩm",
            selector: row => row.id.productId,
            sortable: true, // nha ten cot thi sort
            center: true
        },
        {
            name: "Tên sản phẩm",
            selector: row => row.product.productName,
            sortable: true, // nha ten cot thi sort
            center: true
        },
        {
            name: "produc Image",
            selector: (row) => <img width={50} height={50} src={row.product.productImage} alt="lỗi ảnh" />,
            center: true
        },
        {
            name: "Số lượng",
            selector: (row) => row.quantity,
            center: true
        },
        {
            name: "Tổng tiền",
            selector: (row) => <div>{row.amount} đ</div>,
            center: true
        },
    ];

    const customStylesOrderDetail = {// css datatable
        headCells: {
            style: {
                backgroundColor: "#C0D5FF"
            },
        },
        headRow: {
            style: {

            },
        },

    };


    return (
        <>
            <div style={{ width: "90%", margin: "auto" }}>
                <h4>Lịch sử đơn hàng</h4>
                <DataTable
                    //title="Lịch sử đơn hàng"
                    columns={colunmnsOrder}
                    data={searchAndFilter(orderList)}
                    pagination
                    fixedHeader // thanh keo cua bang
                    fixedHeaderScrollHeight="400px" // cho cai thanh keo 400px va sat thanh keo cua page luon
                    highlightOnHover // dua chuot vo dong doi mau
                    paginationIconFirstPage
                    responsive
                    paginationPerPage={5}
                    paginationRowsPerPageOptions={[5, 15, 23, 50]}
                    subHeader
                    subHeaderComponent={
                        <>
                            <input type="text" placeholder="Tìm kiếm" className="w-25 form-control" value={intiText} onChange={(e) => setText(e.target.value)}
                            />
                            <Button style={{ marginLeft: "10px" }} variant={isClickedColor === "button1" ? "dark" : "outline-dark"}
                                onClick={() => {
                                    setIsClickedColor("button1")
                                    setFilter("")
                                }}>Tất cả</Button>
                            <Button style={{ marginLeft: "10px" }} variant={isClickedColor === "button2" ? "dark" : "outline-dark"}
                                onClick={() => {
                                    setIsClickedColor("button2")
                                    setFilter("Đang chờ")
                                }}>Đang chờ duyệt</Button>
                            <Button style={{ marginLeft: "10px" }} variant={isClickedColor === "button3" ? "dark" : "outline-dark"}
                                onClick={() => {
                                    setIsClickedColor("button3")
                                    setFilter("Đang giao")
                                }}>Đang giao</Button>
                            <Button style={{ marginLeft: "10px" }} variant={isClickedColor === "button4" ? "dark" : "outline-dark"}
                                onClick={() => {
                                    setIsClickedColor("button4")
                                    setFilter("Đã giao")
                                }}>Đã nhận</Button>
                            <Button style={{ marginLeft: "10px" }} variant={isClickedColor === "button5" ? "dark" : "outline-dark"}
                                onClick={() => {
                                    setIsClickedColor("button5")
                                    setFilter("Đã hủy")
                                }}>Đã hủy</Button>
                        </>
                    }
                    subHeaderAlign="right"
                    customStyles={customStylesOrder}
                />
            </div>


            {/* Modal chi tiet don hang*/}
            <Modal show={showOrderDetailModal} onHide={() => setShowOrderDetailMOdal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Chi tiết đơn hàng </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <div>
                            <div style={{ float: "left" }}>
                                <div><h5>Thông tin</h5></div>
                            </div>
                            <div style={{ float: "right" }}>
                                <div>Tổng tiền : 123456</div>
                            </div>
                        </div>
                    </Row>
                    <div>
                        <div style={{ width: "100%", margin: "0px 5px" }}>
                            <div style={{ margin: "1% 0x 0px 1%", padding: "1%", borderRadius: "0%" }}>
                                <Form>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="formName">
                                                <Form.Label>Tên người nhận</Form.Label>
                                                <Form.Control type="text" placeholder="Người nhận"
                                                //defaultValue={inforUser.fullName} 
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col> <Form.Group controlId="formAddress">
                                            <Form.Label>Địa chỉ nhận</Form.Label>
                                            <Form.Control type="text" placeholder="Địa chỉ"
                                            //defaultValue={inforUser.address} 
                                            />
                                        </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group controlId="formSdt">
                                                <Form.Label>Số điện thoại</Form.Label>
                                                <Form.Control type="text" placeholder="số điện thoại"
                                                //defaultValue={inforUser.phone} 
                                                />
                                            </Form.Group>

                                        </Col>

                                        <Col>
                                            <Form.Group controlId="formAddress">
                                                <Form.Label>Ngày tạo</Form.Label>
                                                <Form.Control type="text" placeholder="Ngày tạo"
                                                //defaultValue={inforUser.address} 
                                                />
                                            </Form.Group></Col>
                                        <Col>
                                            <Form.Group controlId="formAddress">
                                                <Form.Label>Ngày nhận</Form.Label>
                                                <Form.Control type="text" placeholder="Ngày nhận"
                                                //defaultValue={inforUser.address} 
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>

                                            <Form.Group controlId="formSdt">
                                                <Form.Label>Trạng thái đơn hàng</Form.Label>
                                                <Form.Control type="text" placeholder="Trạng thái đơn hàng"
                                                //defaultValue={inforUser.phone} 
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="formName">
                                                <Form.Label>Tình trạng thanh toán</Form.Label>
                                                <Form.Control type="text" placeholder="Tình trạng thanh toán"
                                                //defaultValue={inforUser.fullName} 
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group controlId="formAddress">
                                                <Form.Label>Shipper giao hàng</Form.Label>
                                                <Form.Control type="text" placeholder="Người giao"
                                                //defaultValue={inforUser.address} 
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            </div>
                        </div>
                        <div>
                            <DataTable
                                //title="Lịch sử đơn hàng"
                                columns={colunmnsOrderDetail}
                                data={orderDetailList}
                                pagination
                                fixedHeader // thanh keo cua bang
                                fixedHeaderScrollHeight="400px" // cho cai thanh keo 400px va sat thanh keo cua page luon
                                highlightOnHover // dua chuot vo dong doi mau
                                paginationIconFirstPage
                                responsive
                                paginationPerPage={5}
                                paginationRowsPerPageOptions={[5, 15, 23, 50]}
                                subHeader
                                subHeaderAlign="right"
                                customStyles={customStylesOrderDetail}
                            />
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => setShowOrderDetailMOdal(!showOrderDetailModal)}>Đóng</Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default HistoryOrder;