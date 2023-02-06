import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from "react-bootstrap";

const AdminCategory = () => {


    const [categoryList, setCategoryList] = useState([]);

    const [intiText, setText] = useState("");


    const getCategory = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/admin/category")
            setCategoryList(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const search = (data) =>{
        return data.filter(row => row.categoryName.toLowerCase().indexOf(intiText.toLowerCase()) > -1 || row.categoryId.toString().includes(intiText));
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
                    <Button variant="outline-dark" onClick={() => alert(row.categoryName)}>EDIT</Button>
                    <button className="btn btn-primary" >DELETE</button>
                </>
            }
        }
    ]


    useEffect(() => {
        getCategory();
    }, [])



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
        </>
    )
}

export default AdminCategory;