import React, { useEffect, useState } from 'react';
import { Card, Button, Image } from 'react-bootstrap';
import './css/home.css';
import productServiceUser from "../services/user/user.product.service";

const Home = () => {


    const [listProductHome, setListProductHome] = useState([]) 

    useEffect(()=>{
       productServiceUser.getAllHomeProductService().then((responseData)=>{
        setListProductHome(responseData.data.content)
       }).catch(error => alert("Lỗi " + error + ". Bạn hãy quay lại sau."));
    },[])
   

    return (
        <>
            <div className="card-list-container" >
                {listProductHome.map((item) => (
                    <Card className="card-container">
                        <Image src={item.productImage} fluid className="card-image" style={{ borderBottom: '2px solid #ddd' }}/>
                        <Card.Body>
                            <Card.Title className="card-title">{item.productName}</Card.Title>
                            <Card.Text className="card-text">{item.unitPrice} VND</Card.Text>
                            <Button variant="primary" className="card-button">Thêm sản phẩm vào giỏ hàng</Button>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </>
    );// ngoac tong
}

export default Home;