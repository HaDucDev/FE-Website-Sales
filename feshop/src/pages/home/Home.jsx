import React, { useEffect, useState } from 'react';
import { Card, Button, Image } from 'react-bootstrap';
import './css/home.css';
import productServiceUser from "../../services/user/user.product.service";
import Pagination from 'react-pagination-library';
import 'react-pagination-library/build/css/index.css';
const Home = () => {


    const [listProductHome, setListProductHome] = useState([])//state san pham trang home
    const [page, setPage] = useState(1);// number be +1
    const [totalPages, setTotalPages] = useState(1);//tong so trang san pham
    const sizes = [4, 8, 16];// so luong san pham 1 trang
    const [size, setSize] = useState(8);


    useEffect(() => {
        productServiceUser.getAllHomeProductService(page - 1, size).then((responseData) => {
            setListProductHome(responseData.data.content);//data    
            setTotalPages(responseData.data.totalPages);//so trang   
        }).catch(error => alert("Lỗi " + error + ". Bạn hãy quay lại sau."));
    }, [page, size])


    return (
        <>
            <div className="card-list-container" >
                {listProductHome.map((item,index) => (
                    <Card key={index} className="card-container">
                        <Image src={item.productImage} fluid className="card-image" style={{ borderBottom: '2px solid #ddd' }} />
                        <Card.Body>
                            <Card.Title className="card-title">{item.productName}</Card.Title>
                            <Card.Text className="card-text">{item.unitPrice} VND</Card.Text>
                            <Button variant="primary" className="card-button">Thêm vào giỏ hàng</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            <div style={{display:"flex", justifyContent:"center",alignItems:"center", height:"50px"}}>
            <select onChange={(e) => { setSize(e.target.value); }} value={size} style={{display:"flex", justifyContent:"center",alignItems:"center", width:"12%"}}>
                    {sizes.map((size) => (
                        <option key={size} value={size}>
                            {size} sản phẩm trang này
                        </option>
                    ))}
                </select>
                <Pagination style={{display:"flex", justifyContent:"center",alignItems:"center",marginLeft:"10px"}}
                    currentPage={page}
                    totalPages={totalPages}
                    showFirstLastPages
                    size="md"
                    changeCurrentPage={(pageNumber) => { setPage(pageNumber); }} />
            </div>
        </>
    );// ngoac tong
}

export default Home;