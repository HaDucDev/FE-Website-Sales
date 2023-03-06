import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";
import orderShipperService from "../../services/shipper/shipper.order.service";
import convert_vi_to_en from "../../utils/utils";


const Shipper = () => {


    const [orderList, setOrderList] = useState([]);// state datatable
    const [intiText, setText] = useState("");// state search
    const [initFilter, setFilter] = useState("");// state button loc
    const [isClickedColor, setIsClickedColor] = useState(null);// state hiển thị màu khi click filter dùng many button


    useEffect(() => {
        orderShipperService.getAllOrderByShipper(JSON.parse(localStorage.getItem("currentUser")).userId).then((response) => {
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
            center: true,
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
            center: true,
            style: {
                width: "100px",
            },
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
                    <div style={{ margin: "auto", fontSize: "1%", justifyContent: "center", paddingLeft: "50px" }}>
                        <div style={{ margin: "auto",}}>
                            <Button variant="outline-success" style={{ marginLeft: "5px", transform: "scale(0.8)", width: "100px" }}
                            //onClick={() => handleGetListOrderDetailByOrdersId(row.ordersId)}
                            >Chi tiết</Button>
                            {
                                (row.statusOrder === "Đang giao") && (<Button variant="outline-success" style={{ marginLeft: "5px", transform: "scale(0.8)", width: "100px" }}
                                //onClick={() => cancelOrder(row.ordersId)}
                                >Xác nhận đã giao</Button>)
                            }
                            {
                                (row.statusOrder === "Đang giao") && (<Button variant="outline-success" style={{ marginLeft: "5px", transform: "scale(0.8)", width: "100px" }}
                                //onClick={() => cancelOrder(row.ordersId)}
                                >Không nhận đơn</Button>)
                            }
                        </div>
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
                <h4>Quản lý đơn hàng cho shipper</h4>
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
                                }}
                                >Tất cả</Button>
                            <Button style={{ marginLeft: "10px" }} variant={isClickedColor === "button3" ? "dark" : "outline-dark"}
                                onClick={() => {
                                    setIsClickedColor("button3")
                                    setFilter("Đang giao")
                                }}
                                >Đơn được phân công</Button>
                            <Button style={{ marginLeft: "10px" }} 
                            variant={isClickedColor === "button4" ? "dark" : "outline-dark"}
                                onClick={() => {
                                    setIsClickedColor("button4")
                                    setFilter("Đã giao")
                                }}
                                >Đơn đã giao</Button>
                        </>
                    }
                    subHeaderAlign="right"
                    customStyles={customStylesOrder}
                />
            </div>
        </>
    )
}

export default Shipper;