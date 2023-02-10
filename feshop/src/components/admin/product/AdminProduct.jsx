import React, { useEffect, useState } from "react";
import { Button} from "react-bootstrap";
import DataTable from "react-data-table-component";
import 'bootstrap/dist/css/bootstrap.css';
import convert_vi_to_en from "../../../utils/utils";
import productService from "../../../services/admin/admin.product.service";

const AdminProduct = () => {

    const [productList, setProductList] = useState([]);// state datatable
    const [intiText, setText] = useState("");// state search

    const [load, setLoadTable] = useState(false);// state load khi them thanh cong

    const search = (data) => {
        return data.filter(row => convert_vi_to_en(row.productName.toLowerCase()).indexOf(convert_vi_to_en(intiText.toLowerCase())) > -1
            || row.productId.toString().includes(intiText)
            || convert_vi_to_en(row.category.categoryName.toLowerCase()).indexOf(convert_vi_to_en(intiText.toLowerCase())) > -1
            || convert_vi_to_en(row.supplier.supplierName.toLowerCase()).indexOf(convert_vi_to_en(intiText.toLowerCase())) > -1
            || row.unitPrice.toString().includes(intiText)
            );
    }

    useEffect(() => {
        productService.getAllProductService().then((response) => {
            setProductList(response.data)
        }).catch(error => alert("Lỗi " + error + ". Bạn hãy quay lại sau."));
    }, [intiText, load])

    const colunmns = [
        {
            name: "Product id",
            selector: row => row.productId,
            sortable: true, // nha ten cot thi sort
            center: true
        },
        {
            name: "Product name",
            selector: row => row.productName,
            center: true
        }
        ,
        {
            name: "Số lượng",
            selector: row => row.quantity,
            center: true
        }
        ,
        {
            name: "produc Image",
            selector: (row) => <img width={50} height={50} src={row.productImage} alt="lỗi ảnh" />,
            center: true
        }
        , 
        {
            name: "Loại hàng",
            selector: row => row.category.categoryName,
            center: true
        }
        ,{
            name: "Hãng",
            selector: row => row.supplier.supplierName,
            center: true
        },
        {
            name: "Action",
            cell: (row) => {
                return <>
                    <div style={{ margin: "auto" }}>
                        {/* <Button variant="outline-dark" onClick={() => { setErrorResponse({ supplierName: "" }); handleGetById(row.supplierId) }}>SỬA</Button>
                        <button style={{ marginLeft: "5px" }} className="btn btn-primary" onClick={() => comfirmDeleteSupplier(row.supplierId)}>XÓA</button>  */}
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
    };

    return (
        <>
            <DataTable
                title="Admin product list"
                columns={colunmns}
                data={search(productList)}
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
                        <input type="text" placeholder="search here" className="w-25 form-control"
                            value={intiText} onChange={(e) => setText(e.target.value)} />
                        <Button style={{ marginLeft: "10px" }} variant="outline-dark"
                            onClick={() => {
                                // setErrorResponse({ supplierName: "" });
                                // setShowAddModal(true)
                            }}>THÊM</Button>
                    </>
                }
                subHeaderAlign="right"
                customStyles={customStyles}
            />
        </>
    )
}

export default AdminProduct;