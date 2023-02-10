import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import DataTable from "react-data-table-component";
import 'bootstrap/dist/css/bootstrap.css';
import convert_vi_to_en from "../../../utils/utils";
import productService from "../../../services/admin/admin.product.service";
import categoryService from "../../../services/admin/admin.category.service";
import supplierService from "../../../services/admin/admin.supplier.service";
import { CKEditor } from 'ckeditor4-react';
const AdminProduct = () => {

    const [productList, setProductList] = useState([]);// state datatable
    const [intiText, setText] = useState("");// state search

    const [showAddModal, setShowAddModal] = useState(false);// state bat/tat modal create
    const [load, setLoadTable] = useState(false);// state load khi them thanh cong

    const [value, setValue] = useState({
        productName: "",
        quantity: -1,
        discount: -1,
        unitPrice: -1,
        descriptionProduct: "",
        categoryId: 0,
        supplierId: 0

    });// state supplier ban dau khi modal add

    const [descriptionProductOk,setDescriptionProduct] = useState("");

    const [isSubmitting, setIsSubmitting] = useState(false);// state nut chi nhan dc mot lan
    const [isLoading, setIsLoading] = useState(false);// tao spiner quay de biet data dang gui, cham 1 ti
    const [selectedFile, setSelectedFile] = useState(null);


    const [selectCategoryList, setSelectCategoryList] = useState([]);// luu de map du lieu
    const [selectSupplierList, setSelectSupplierList] = useState([]);// luu de map du lieu

    const search = (data) => {
        return data.filter(row => convert_vi_to_en(row.productName.toLowerCase()).indexOf(convert_vi_to_en(intiText.toLowerCase())) > -1
            || row.productId.toString().includes(intiText)
            || convert_vi_to_en(row.category.categoryName.toLowerCase()).indexOf(convert_vi_to_en(intiText.toLowerCase())) > -1
            || convert_vi_to_en(row.supplier.supplierName.toLowerCase()).indexOf(convert_vi_to_en(intiText.toLowerCase())) > -1
            || row.unitPrice.toString().includes(intiText));
    }


    const getAllCategoryAndSupplier = () => {
        categoryService
            .getAllCategoryService()
            .then(dataResponse => {
                setSelectCategoryList(dataResponse.data);
            })
            .catch(error => alert("Lỗi " + error + ". Bạn hãy quay lại sau."));
        supplierService
            .getAllSupplierService()
            .then(dataResponse => {
                setSelectSupplierList(dataResponse.data);
            })
            .catch(error => alert("Lỗi " + error + ". Bạn hãy quay lại sau."));
    };


    useEffect(() => {
        productService.getAllProductService().then((response) => {
            setProductList(response.data)
        }).catch(error => alert("Lỗi " + error + ". Bạn hãy quay lại sau."));
    }, [intiText, load])

    //them san pham
    const handleAddProduct = () => {
        let dataRequest = value;
        dataRequest.descriptionProduct=descriptionProductOk;
        let fileRequest = selectedFile;
        productService.createCProductService(dataRequest, fileRequest).then((dataResponse) => {
            let dataShow = dataResponse.data;
            setValue({
                productName: "",
                quantity: -1,
                discount: -1,
                unitPrice: -1,
                descriptionProduct: "",
                categoryId: 0,
                supplierId: 0

            })
            setSelectedFile(null)
            alert(dataShow["message"]);
            setLoadTable(!load);
            setIsLoading(false);//tat spiner
            setIsSubmitting(false);// mo nut
            setShowAddModal(false);
        })
            .catch((err) => {
                console.log(err)
                let errorShow = err.response.data;
                console.log(errorShow);
                setIsLoading(false);// tat spinner
                //setErrorResponse(errorShow);
            })
    }

    const colunmns = [
        {
            name: "Product id",
            selector: row => row.productId,
            sortable: true, // nha ten cot thi sort
            center: true
        },
        {
            name: "Product name",
            selector: (row) => (<div title={row.productName}>{row.productName}</div>),
            center: true,
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
        , {
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
        headRow: {
            style: {

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
                                getAllCategoryAndSupplier();
                                setShowAddModal(true)
                            }}>THÊM</Button>
                    </>
                }
                subHeaderAlign="right"
                customStyles={customStyles}
            />

            {/* Modal them product*/}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
                <Modal.Header closeButton style={{ width: "100%" }}>
                    <Modal.Title>Thêm product</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Tên sản phẩm</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập tên sản phẩm"
                            onChange={(e) => {
                                setValue({ ...value, productName: e.target.value });
                                // setErrorResponse({
                                //     supplierName: ""
                                // })
                                setIsSubmitting(false);// mo nut
                            }}
                        />
                        {/* <ValidationMessage
                            errorResponse={errorResponse}
                            field="supplierName" /> */}
                    </Form.Group>
                    <div style={{ display: "flex" }}>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                            <Form.Label>Số lượng</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Nhập số lượng"
                                onChange={(e) => {
                                    setValue({ ...value, quantity: e.target.value });
                                    // setErrorResponse({
                                    //     supplierName: ""
                                    // })
                                    setIsSubmitting(false);// mo nut
                                }}
                            />
                            {/* <ValidationMessage
                            errorResponse={errorResponse}
                            field="supplierName" /> */}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3" style={{ marginLeft: "10px", }}>
                            <Form.Label>Giảm giá</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Giảm giá"
                                onChange={(e) => {
                                    setValue({ ...value, discount: e.target.value });
                                    // setErrorResponse({
                                    //     supplierName: ""
                                    // })
                                    setIsSubmitting(false);// mo nut
                                }}
                            />
                            {/* <ValidationMessage
                            errorResponse={errorResponse}
                            field="supplierName" /> */}
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput4" style={{ marginLeft: "10px", }} >
                            <Form.Label>Giá gốc</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên hãng"
                                onChange={(e) => {
                                    setValue({ ...value, unitPrice: e.target.value });
                                    // setErrorResponse({
                                    //     supplierName: ""
                                    // })
                                    setIsSubmitting(false);// mo nut
                                }}
                            />
                            {/* <ValidationMessage
                            errorResponse={errorResponse}
                            field="supplierName" /> */}
                        </Form.Group>
                    </div>

                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                        <Form.Label>Đặc tả</Form.Label>
                        <CKEditor
                            onChange={(e) => {
                                setDescriptionProduct(e.editor.getData());
                            }}
                        />
                        {/* <ValidationMessage
                            errorResponse={errorResponse}
                            field="supplierName" /> */}
                    </Form.Group>
                    <div style={{ display: "flex" }}>

                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                            <Form.Label>Chọn loại hàng</Form.Label>
                            <Form.Control
                                as="select"
                                name="categoryId"
                                value={value.categoryId}
                                onChange={(e) => {
                                    setValue({ ...value, categoryId: e.target.value });
                                    // setErrorResponse({
                                    //     supplierName: ""
                                    // })
                                    setIsSubmitting(false);// mo nut
                                }}>
                                <option value={0}>Chọn category...</option>
                                {
                                    selectCategoryList.map((category) => (
                                        <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                                    ))
                                }

                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput7" style={{ marginLeft: "10px" }}>
                            <Form.Label>Tên hãng</Form.Label>
                            <Form.Control
                                as="select"
                                name="categoryId"
                                value={value.supplierId}
                                onChange={(e) => {
                                    setValue({...value, supplierId: e.target.value});
                                    // setErrorResponse({
                                    //     supplierName: ""
                                    // })
                                    setIsSubmitting(false);// mo nut
                                }}>
                                <option value={0}>Chọn supplier...</option>
                                {
                                    selectSupplierList.map((supplier) => (
                                        <option key={supplier.supplierId} value={supplier.supplierId}>{supplier.supplierName}</option>
                                    ))
                                }
                            </Form.Control>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput8" style={{ marginLeft: "10px" }}>
                            <Form.Label>Chọn ảnh cho sản phẩm</Form.Label>
                            <Form.Control
                                type="file"
                                onChange={(e) => {
                                    (setSelectedFile(e.target.files[0]));
                                }}
                            />
                        </Form.Group>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Đóng
                    </Button>

                    <Button variant="outline-primary" disabled={isSubmitting}
                        style={{ zIndex: "1" }}
                        onClick={() => handleAddProduct()}>
                        {/* {isLoading && (
                            <Spinner
                                style={{ margin: "auto", zIndex: "9" }}
                                animation="border"
                                variant="primary"
                            />
                        )} */}
                        Lưu
                    </Button>


                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AdminProduct;