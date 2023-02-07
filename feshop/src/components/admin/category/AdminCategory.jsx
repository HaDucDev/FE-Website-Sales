import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import 'bootstrap/dist/css/bootstrap.css';
import { Button, Modal } from "react-bootstrap";
import convert_vi_to_en from "./../../../utils/utils";
import getAllCategoryService from "../../../services/admin/admin.category.service";

const AdminCategory = () => {


    const [categoryList, setCategoryList] = useState([]);// state datatable

    const [intiText, setText] = useState("");// state search

    const [show, setShow] = useState(false);// state bat/tat modal create
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const search = (data) => {
        return data.filter(row => convert_vi_to_en(row.categoryName.toLowerCase()).indexOf(convert_vi_to_en(intiText.toLowerCase())) > -1
            || row.categoryId.toString().includes(intiText));
    }

    const colunmns = [
        {
            name: "Category id",
            selector: row => row.categoryId,
            sortable: true // nha ten cot thi sort
        },
        {
            name: "Category name",
            selector: row => row.categoryName
        }
        // ,{
        //     name: "image",
        //     selector: (row) => <img width={50} height={50} src={row.imagr}/>
        // }
        , {
            name: "Action",
            cell: (row) => {
                return <>
                    <Button variant="outline-dark" onClick={() => setShow(true)}>EDIT</Button>
                    <button className="btn btn-primary" >DELETE</button>
                </>
            }
        }
    ]

    // useEffect(() => {
    //     getCategory();
    // }, [])

    useEffect(() => {
        getAllCategoryService().then((response) => {
            setCategoryList(response.data)
        }).catch(error => alert("Lỗi " + error + ". Bạn hãy quay lại sau."));
    }, [intiText])

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
                    <input type="text" placeholder="search here" className="w-25 form-control"
                        value={intiText} onChange={(e) => setText(e.target.value)} />
                }
                subHeaderAlign="right"
            />

            {/* Modal them category*/}

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Modal heading</Modal.Title>
                </Modal.Header>
                <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default AdminCategory;
