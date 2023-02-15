import React, { useEffect, useState } from 'react';
import { Card, Button, Image } from 'react-bootstrap';
import './css/home.css';
import productServiceUser from "../services/user/user.product.service";
import Pagination from 'react-pagination-library';
import 'react-pagination-library/build/css/index.css';
const Home = () => {


    const [listProductHome, setListProductHome] = useState([])

    useEffect(() => {
        productServiceUser.getAllHomeProductService().then((responseData) => {
            setListProductHome(responseData.data.content)
        }).catch(error => alert("Lỗi " + error + ". Bạn hãy quay lại sau."));
    }, [])

    const handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
      };


    return (
        <>
            <div className="card-list-container" >
                {listProductHome.map((item) => (
                    <Card className="card-container">
                        <Image src={item.productImage} fluid className="card-image" style={{ borderBottom: '2px solid #ddd' }} />
                        <Card.Body>
                            <Card.Title className="card-title">{item.productName}</Card.Title>
                            <Card.Text className="card-text">{item.unitPrice} VND</Card.Text>
                            <Button variant="primary" className="card-button">Thêm sản phẩm vào giỏ hàng</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            <Pagination
                currentPage={3}
                totalPages={10}
                showFirstLastPages
                size="md"
                changeCurrentPage={handlePageChange}         
            />
        </>
    );// ngoac tong
}

export default Home;