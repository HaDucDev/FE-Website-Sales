import axios from "axios";
import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import 'bootstrap/dist/css/bootstrap.css';
import { Button } from "react-bootstrap";

const AdminCategory = () => {


    const [categoryList, setCategoryList] = useState([]);
    const getCategory = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/admin/category")
            setCategoryList(response.data)
        }
        catch (error) {
            console.log(error)
        }
    }

    const colunmns = [
        {
            name: "Category id",
            selector: row => row.categoryId
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
                    <Button variant="outline-dark">EDIT</Button>
                    <button className="btn btn-success">DELETE</button>
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
                data={categoryList}
                pagination
                fixedHeader // thanh keo cua bang
                fixedHeaderScrollHeight="400px" // cho cai thanh keo 400px va sat thanh keo cua page luon
                highlightOnHover // dua chuot vo dong doi mau
            />
        </>
    )
}

export default AdminCategory;