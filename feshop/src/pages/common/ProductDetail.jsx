import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import productServiceUser from '../../services/user/user.product.service';

const ProductDetail = () => {

    const { id } = useParams();// bien phai trung vs ten cua bien tren link

    const [productDetail, setProductDetail] = useState({})

    useEffect(() => {
        productServiceUser.getDetailProductService(id).then((dataResponse) => {
            setProductDetail(dataResponse.data);
        }).catch(error => alert("Lỗi " + error + ". Bạn hãy quay lại sau."));
    }, [id]);

    return (
        <>
            <Container>
                <Row>
                    <Col md={6}>
                        <img src={productDetail.productImage} alt={"ok"} className="img-fluid"
                            style={{ width: "100%", height: "70%", objectFit: "contain" }} />
                    </Col>
                    <Col md={6}>
                        <h2>{productDetail.productName}</h2>
                        <p className="lead">Giá: {productDetail.unitPrice} VND
                                - Giảm: {productDetail.discount}%
                        </p>
                        <p className="lead">Loại sản phẩm: {productDetail.isCategory}</p>
                        <p className="lead">Nhà sản xuất: {productDetail.isSupplier}</p>
                        <p className="lead">Số lượng: Còn {productDetail.quantity} sản phẩm</p>
                        <p >Mô tả:
                            <div dangerouslySetInnerHTML={{__html: productDetail.descriptionProduct}}/>
                        </p>
                        <Button variant="primary">Add to Cart</Button>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default ProductDetail;