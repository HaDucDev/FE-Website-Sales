import { Button } from "react-bootstrap";
import DataTable from "react-data-table-component";


const HistoryOrder = () => {


    const colunmns = [
        {
            name: "Order id",
            selector: row => row.ordersId,
            sortable: true, // nha ten cot thi sort
            center: true
        },
        {
            name: "Người nhận",
            selector: (row) => (<div title={row.receiptUser}>{row.receiptUser}</div>),
            center: true,
        },
        {
            name: "Số điện thoại",
            selector: row => row.phoneNumber,
            center: true
        },
        {
            name: "Địa chỉ",
            selector: row => row.address,
            center: true
        },
        {
            name: "Tổng tiền",
            selector: (row) => row.totalAmount,
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
        , {
            name: "Ngày tạo đơn hàng",
            selector: row => row.createdDate,
            center: true
        },
        , {
            name: "Ngày nhận",
            selector: row => row.receivedDate,
            center: true
        },
        {
            name: "Người giao hàng",
            selector: row => row.shipperId,
            center: true
        },
        {
            name: "Action",
            cell: (row) => {
                return <>
                    <div style={{ margin: "auto" }}>
                        <Button variant="outline-dark" onClick={
                            () => {
                                // setErrorResponse({
                                //     productName: "",
                                //     quantity: "",
                                //     discount: "",
                                //     unitPrice: "",
                                //     descriptionProduct: "",
                                //     productImage: "",
                                //     categoryId: "",
                                //     supplierId: ""
                                // });
                                // getAllCategoryAndSupplier();//goi de them vo modal them
                                // handleGetById(row.productId)
                            }
                        }>Chi tiết</Button>
                        <button style={{ marginLeft: "5px" }} className="btn btn-primary" >Hủy đơn hàng</button>
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

            <DataTable
                title="User order list"
                columns={colunmns}
                //data={search(productList)}
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
        </>
    )
}

export default HistoryOrder;