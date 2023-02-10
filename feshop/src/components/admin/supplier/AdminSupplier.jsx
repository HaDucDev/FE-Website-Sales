import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import 'bootstrap/dist/css/bootstrap.css';
import convert_vi_to_en from "./../../../utils/utils";
import ValidationMessage from "../../acommon-component/ValidationMessage";
import supplierService from "../../../services/admin/admin.supplier.service";
const AdminSupplier = () => {

    const [supplierList, setSupplierList] = useState([]);// state datatable

    const [intiText, setText] = useState("");// state search

    const [showAddModal, setShowAddModal] = useState(false);// state bat/tat modal create

    const [value, setValue] = useState("");// state category ban dau khi modal add
    const [load, setLoadTable] = useState(false);// state load khi them thanh cong
    const [errorResponse, setErrorResponse] = useState({
        supplierName: ""
    });//state error

    const [selectedFile, setSelectedFile] = useState(null);

    // const [categoryById, setCategoryById] = useState({
    //     categoryId: -1,
    //     categoryName: ""
    // })// state getbyId

    // const [showUpdateModal, setShowUpdateModal] = useState(false);// state bat/tat modal update
    // const [confirmModal, setComfirmModal] = useState(false);//state bat/tat modal comfirm
    const search = (data) => {
        return data.filter(row => convert_vi_to_en(row.supplierName.toLowerCase()).indexOf(convert_vi_to_en(intiText.toLowerCase())) > -1
            || row.supplierId.toString().includes(intiText));
    }

    useEffect(() => {
        supplierService.getAllSupplierService().then((response) => {
            setSupplierList(response.data)
        }).catch(error => alert("Lỗi " + error + ". Bạn hãy quay lại sau."));
    }, [intiText, load])

    // them supplier
    const handleAddSupplier = () => {
        let dataRequest = {
            supplierName: ""
        }
        dataRequest.supplierName = value;// hoac dataRequest['...']=...

        const json = JSON.stringify(dataRequest);
        const blob = new Blob([json], {
            type: 'application/json'
          });

        const formData = new FormData();
        formData.append('createSupplierRequest',blob);
        formData.append('supplierFile',selectedFile)
        supplierService.createCSupplierService(formData).then((dataResponse) => {
            let dataShow = dataResponse.data;
            setValue("")
            alert(dataShow["message"]);
            setLoadTable(!load);
            setSelectedFile(null)
            setShowAddModal(false);
        })
        .catch((err) => {
            console.log(err)
            let errorShow = err.response.data;
            console.log(errorShow)
            setErrorResponse(errorShow);
        })
    }

    const colunmns = [
        {
            name: "Supplier id",
            selector: row => row.supplierId,
            sortable: true, // nha ten cot thi sort
            center: true
        },
        {
            name: "Supplier name",
            selector: row => row.supplierName,
            center: true
        }
        ,
        {
            name: "Supplier Image",
            selector: (row) => <img width={50} height={50} src={row.supplierImage} alt="lỗi ảnh" />
        }
        , {
            name: "Action",
            cell: (row) => {
                return <>
                    <div style={{ margin: "auto" }}>
                        {/* <Button variant="outline-dark" onClick={() => { setErrorResponse({ categoryName: "" }); handleGetById(row.categoryId) }}>SỬA</Button>
                        <button style={{ marginLeft: "5px" }} className="btn btn-primary" onClick={() => comfirmDeleteCategory(row.categoryId)}>XÓA</button> */}
                    </div>

                </>
            },
            // style: {
            //     backgroundColor: 'rgba(187, 204, 221, 1)',
            // },
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
                title="Admin supplier list"
                columns={colunmns}
                data={search(supplierList)}
                pagination
                fixedHeader // thanh keo cua bang
                fixedHeaderScrollHeight="400px" // cho cai thanh keo 400px va sat thanh keo cua page luon
                highlightOnHover // dua chuot vo dong doi mau
                paginationIconFirstPage
                // actions={
                //     <button className="btn btn-sm">Export</button>
                // }
                responsive
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 15, 23, 50]}
                subHeader
                subHeaderComponent={
                    <>
                        <input type="text" placeholder="search here" className="w-25 form-control"
                            value={intiText} onChange={(e) => setText(e.target.value)} />
                        <Button style={{ marginLeft: "10px" }} variant="outline-dark"
                            onClick={() => { //setErrorResponse({ supplierName: "" }); 
                                setShowAddModal(true)
                            }}>THÊM</Button>
                    </>
                }
                subHeaderAlign="right"
                customStyles={customStyles}
            />

            {/* Modal them supplier*/}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm supplier</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Tên hãng</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tên hãng"
                            onChange={(e) => {
                                (setValue(e.target.value));
                                setErrorResponse({
                                    supplierName: ""
                                })

                            }}
                        />

                         <ValidationMessage
                        errorResponse={errorResponse}
                        field="supplierName" />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                    <Form.Label>Chọn ảnh cho hãng</Form.Label>
                        <Form.Control
                            type="file"
                            placeholder="Chọn ảnh"
                            onChange={(e) => {
                                (setSelectedFile(e.target.files[0]));
                            }}
                        />
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => handleAddSupplier()}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>


        </>
    )

}

export default AdminSupplier