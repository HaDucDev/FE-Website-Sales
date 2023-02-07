import React, { Fragment, useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Form, Modal } from "react-bootstrap";
import convert_vi_to_en from "./../../../utils/utils";
import categoryService from "../../../services/admin/admin.category.service";
import ValidationMessage from "../../common-component/ValidationMessage";

const AdminCategory = () => {


    const [categoryList, setCategoryList] = useState([]);// state datatable

    const [intiText, setText] = useState("");// state search

    const [show, setShow] = useState(false);// state bat/tat modal create

    const [value, setValue] = useState("");// state category

    const [load, setLoadTable] = useState(false);// state load khi them thanh cong

    const [errorResponse, setErrorResponse] = useState({
        "categoryName": ""
    });//state

    const search = (data) => {
        return data.filter(row => convert_vi_to_en(row.categoryName.toLowerCase()).indexOf(convert_vi_to_en(intiText.toLowerCase())) > -1
            || row.categoryId.toString().includes(intiText));
    }

    const colunmns = [
        {
            name: "Category id",
            selector: row => row.categoryId,
            sortable: true, // nha ten cot thi sort
            center: true
        },
        {
            name: "Category name",
            selector: row => row.categoryName,
            center: true
        }
        // ,{
        //     name: "image",
        //     selector: (row) => <img width={50} height={50} src={row.imagr}/>
        // }
        , {
            name: "Action",
            cell: (row) => {
                return <>
                    <div style={{ margin: "auto" }}>
                        <Button variant="outline-dark" onClick={() => setShow(true)}>SỬA</Button>
                        <button style={{ marginLeft: "5px" }} className="btn btn-primary" >XÓA</button>
                    </div>

                </>
            },
            // style: {
            //     backgroundColor: 'rgba(187, 204, 221, 1)',
            // },
            center: true
        }
    ]

    // useEffect(() => {
    //     getCategory();
    // }, [])

    useEffect(() => {
        categoryService.getAllCategoryService().then((response) => {
            setCategoryList(response.data)
        }).catch(error => alert("Lỗi " + error + ". Bạn hãy quay lại sau."));
    }, [intiText, load])

    // them category
    const handleAddCategory = () => {
        let dataRequest = {
            categoryName: ""
        }
        dataRequest.categoryName = value;// hoac dataRequest['...']=...
        categoryService.createCategoryService(dataRequest).then((dataResponse) => {
            let dataShow = dataResponse.data;
            setValue("")
            alert(dataShow["message"]);
            setLoadTable(!load);
            setShow(false);
        }).catch((err) => {
            let errorShow = err.response.data;
            setErrorResponse(errorShow);
        })
    }


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
                title="Admin category list"
                columns={colunmns}
                data={search(categoryList)}
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
                        <Button style={{ marginLeft: "10px" }} variant="outline-dark" onClick={() => setShow(true)}>THÊM</Button>
                    </>

                }
                subHeaderAlign="right"
                customStyles={customStyles}
            />



            {/* Modal them category*/}

            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Label>Tên danh mục</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Nhập tên danh mục"
                        onChange={(e) => {
                                            (setValue(e.target.value));
                                            setErrorResponse({
                                                "categoryName": ""
                                             })

                                        }}
                    />
                    <ValidationMessage
                        errorResponse={errorResponse}
                        field="categoryName" />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={() => handleAddCategory()}>
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AdminCategory;
