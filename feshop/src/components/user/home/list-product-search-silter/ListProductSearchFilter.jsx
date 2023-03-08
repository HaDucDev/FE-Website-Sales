import React, { useEffect, useState } from 'react';
import { Card, Button, Image } from 'react-bootstrap';
import './list-product-search-filter.css'
import { Link } from 'react-router-dom';
import productServiceUser from '../../../../services/user/user.product.service';
import ReactPaginate from 'react-paginate';
const ListProductSearchFilter = () => {

    const [listProductSearchFilter, setListProductSearchFilter] = useState([])//state san pham trang home
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);//tong so trang san pham
    const sizes = [4, 8, 16];// so luong san pham 1 trang
    const [size, setSize] = useState(8);


    useEffect(() => {
        productServiceUser.getAllHomeProductService(page, size).then((responseData) => {
            setListProductSearchFilter(responseData.data.content);//data    
            setTotalPages(responseData.data.totalPages);//so trang   
        }).catch(error => alert("Lỗi " + error + ". Bạn hãy quay lại sau."));
    }, [page, size])


    const onPageChange =({selected})=>{
            setPage(selected);
    }

    return (
        <>
            <div className="card-list-container" >
                {listProductSearchFilter.map((item, index) => (
                    <Card key={index} className="card-container">
                        <Image src={item.productImage} fluid className="card-image" style={{ borderBottom: '2px solid #ddd' }} />
                        <Card.Body>
                            <Card.Title className="card-title" style={{ height: "28%" }}>{item.productName}</Card.Title>
                            <Card.Text className="card-text">{item.unitPrice} VND</Card.Text>
                            <Button variant="primary" className="card-button">Thêm vào giỏ hàng</Button>
                            <Link to={`/product-detail/${item.productId}`} className="btn-click">
                                <Button variant="primary" className="card-button">Chi tiết sản phẩm</Button>
                            </Link>
                        </Card.Body>
                    </Card>
                ))}
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50px" }}>
                <select onChange={(e) => { setSize(e.target.value); }} value={size} style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "12%" }}>
                    {sizes.map((size) => (
                        <option key={size} value={size}>
                            {size} sản phẩm trang này
                        </option>
                    ))}
                </select>
                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    pageCount={totalPages}
                    onPageChange={onPageChange}
                    containerClassName={'pagination'}
                    previousLinkClassName={'pagination__link'}
                    nextLinkClassName={'pagination__link'}
                    disabledClassName={'pagination__link--disabled'}
                    activeClassName={'pagination__link--active'} // mau cua phan trang
                />
            </div>
        </>
    );

}

export default ListProductSearchFilter;