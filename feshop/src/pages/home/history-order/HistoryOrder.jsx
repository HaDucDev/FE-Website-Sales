import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import orderServiceUser from "../../../services/user/user.order.service";


const HistoryOrder = () => {

    const [orderList, setOrderList] = useState([]);// state datatable


    useEffect(() => {
        orderServiceUser.getAllOrderByUserId(JSON.parse(localStorage.getItem("currentUser")).userId).then((response) => {
            setOrderList(response.data)
        }).catch(error => alert("Lỗi " + error.response.data + ". Bạn hãy quay lại sau."));
    }, [])
    const colunmns = [
        {
            name: "Mã đơn hàng",
            selector: row => row.ordersId,
            sortable: true, // nha ten cot thi sort
            center: true
        },
        {
            name: "Tổng tiền",
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
                        <Button variant="outline-dark" onClick={
                            () => {
                            }
                        }>Chi tiết</Button>
                        <button style={{ marginLeft: "5px" }} className="btn btn-primary" >Hủy</button>
                    </div>

                </>
            },
            center: true
        }
    ];

    const customStyles = {// css datatable
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

            <div style={{width:"90%", margin:"auto"}}>
                <h4>Lịch sử đơn hàng</h4>
                <DataTable 
                    //title="Lịch sử đơn hàng"
                    columns={colunmns}
                    data={orderList}
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
                            <input type="text" placeholder="Tìm kiếm" className="w-25 form-control"
                            //value={intiText} 
                            //onChange={(e) => setText(e.target.value)} 
                            />
                            <Button style={{ marginLeft: "10px" }} variant="outline-dark"
                                onClick={() => {

                                }}>Tất cả</Button>
                            <Button style={{ marginLeft: "10px" }} variant="outline-dark"
                                onClick={() => {

                                }}>Đang chờ duyệt</Button>
                            <Button style={{ marginLeft: "10px" }} variant="outline-dark"
                                onClick={() => {

                                }}>Đang giao</Button>
                            <Button style={{ marginLeft: "10px" }} variant="outline-dark"
                                onClick={() => {

                                }}>Đã nhận</Button>
                        </>
                    }
                    subHeaderAlign="right"
                    customStyles={customStyles}
                />
            </div>
        </>
    )
}

export default HistoryOrder;