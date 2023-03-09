import React, { useEffect, useState } from 'react';
import { Card, Button, Image } from 'react-bootstrap';
import './list-product-search-filter.css'
import { Link, useSearchParams } from 'react-router-dom';
import productServiceUser from '../../../../services/user/user.product.service';
import ReactPaginate from 'react-paginate';
const ListProductSearchFilter = () => {

    

    const [listProductSearchFilter, setListProductSearchFilter] = useState([])//state san pham trang home
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);//tong so trang san pham
    const sizes = [4, 8, 16];// so luong san pham 1 trang
    const [size, setSize] = useState(8);

    const [cateId, setCateId] = useState(-1);

    const [params] = useSearchParams();
    const textSearch = (params.get('textSearch') ? params.get('textSearch') : "");
    console.log(textSearch)

    //const categoryId = (params.get('categoryId')) ? params.get('categoryId') : -1;
    const supplierId = (params.get('supplierId')) ? params.get('supplierId') : -1;

    useEffect(() => {
        console.log(params.get('categoryId'))
        if(params.get('categoryId')){
            setCateId(params.get('categoryId'));
        }
        productServiceUser.getAllSearchFilterProductService(page, size,cateId,supplierId,textSearch).then((responseData) => {
            console.log(responseData.data.content);
            setListProductSearchFilter(responseData.data.content);//data    
            setTotalPages(responseData.data.totalPages);//so trang   
        }).catch(error => alert("Lỗi " + error + ". Bạn hãy quay lại sau."));
    }, [page, size,textSearch,cateId,supplierId,params])


    const onPageChange =({selected})=>{
            setPage(selected);
    }

    return (
        <>
            <div className="card-list-container" >
                {listProductSearchFilter.map((item, index) => (
                    <Card key={("navbar-item"+1+index).toString()} className="card-container">
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