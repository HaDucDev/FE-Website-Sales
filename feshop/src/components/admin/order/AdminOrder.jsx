import { useEffect } from "react";
import { useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import orderService from "../../../services/admin/admin.order.jservice";
import convert_vi_to_en from "../../../utils/utils";


const AdminOrder = () => {

    const [orderList, setOrderList] = useState([]);// state datatable
    const [intiText, setText] = useState("");// state search
    const [initFilter, setFilter] = useState("");// state button loc
    const [isClickedColor, setIsClickedColor] = useState(null);// state hiển thị màu khi click filter dùng many button
    const [showOrderDetailModal, setShowOrderDetailMOdal] = useState(false);//state bat/tat modal chi tiet don hang


    useEffect(() => {
        orderService.getAllOrder().then((response) => {
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
            selector: row => (<div title={row.note}>{row.note}</div>),
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
                        <Button variant="outline-dark"
                        //onClick={() => handleGetListOrderDetailByOrdersId(row.ordersId)}
                        >Chi tiết</Button>
                        <button style={{ marginLeft: "5px" }} className="btn btn-success"
                            //onClick={() => cancelOrder(row.ordersId)}
                            disabled={(row.statusOrder !== "Đang chờ") ? true : false}>Hủy đơn</button>
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

    return (
        <>
            <div style={{ width: "90%", margin: "auto" }}>
                <h4>Quản lý đơn hàng</h4>
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
                                }}>Đơn đang chờ duyệt</Button>
                            <Button style={{ marginLeft: "10px" }} variant={isClickedColor === "button3" ? "dark" : "outline-dark"}
                                onClick={() => {
                                    setIsClickedColor("button3")
                                    setFilter("Đang giao")
                                }}>Đơn đang giao</Button>
                            <Button style={{ marginLeft: "10px" }} variant={isClickedColor === "button4" ? "dark" : "outline-dark"}
                                onClick={() => {
                                    setIsClickedColor("button4")
                                    setFilter("Đã giao")
                                }}>Đơn đã nhận</Button>
                            <Button style={{ marginLeft: "10px" }} variant={isClickedColor === "button5" ? "dark" : "outline-dark"}
                                onClick={() => {
                                    setIsClickedColor("button5")
                                    setFilter("Đã hủy")
                                }}>Đơn đã hủy</Button>
                        </>
                    }
                    subHeaderAlign="right"
                    customStyles={customStylesOrder}
                />
            </div>
        </>
    )

}

export default AdminOrder;