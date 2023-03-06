import { useContext } from 'react';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useParams } from 'react-router';
import { LoginContext } from '../../../App';
import cartServiceUser from '../../../services/user/user.cart.service';
import productServiceUser from '../../../services/user/user.product.service';
import ValidationMessage from '../../acommon-component/ValidationMessage';

const ProductDetail = () => {

    const { id } = useParams();// bien phai trung vs ten cua bien tren link

    const [productDetail, setProductDetail] = useState({})

    useEffect(() => {
        productServiceUser.getDetailProductService(id).then((dataResponse) => {
            setProductDetail(dataResponse.data);
        }).catch(error => alert("Lỗi " + error + ". Bạn hãy quay lại sau."));
    }, [id]);

    const [quantityBuy, setQuantityBuy] = useState(1);
    const [errorResponse, setErrorResponse] = useState({
        quantity: "",
        message: ""
    });//state error

    const textLogin = useContext(LoginContext);// dung de load lai cart o header

    const addToCart = () => {
        let data = {
            "userId": JSON.parse(localStorage.getItem("currentUser")).userId,
            "productId": Number(id),
            "quantity": (quantityBuy === "") ? -1 : quantityBuy,
            "operator": "add"
        }
        cartServiceUser.addProductToCartService(data).then((dataResponse) => {
            let dataShow = dataResponse.data;
            setErrorResponse({
                quantity: "",
                message: ""
            })
            textLogin.setLoadPage(2);
            alert(dataShow["message"]);
        }).catch((err) => {
            console.log(err)
            let errorShow = err.response.data;
            setErrorResponse(errorShow);
        })
    }

    return (
        <>
            <Container>
                <Row style={{ marginTop: "10px", }}>
                    <Col sm={6}>
                        <img src={productDetail.productImage} alt={"ok"} className="img-fluid"
                            style={{ width: "65%", height: "110%", objectFit: "contain", boxSizing: "border-box" }} />
                    </Col>
                    <Col sm={6}>
                        <h2>{productDetail.productName}</h2>
                        <p className="lead">Giá: {productDetail.unitPrice} VND
                            - Giảm: {productDetail.discount}%
                        </p>
                        <p className="lead">Loại sản phẩm: {productDetail.isCategory}</p>
                        <p className="lead">Nhà sản xuất: {productDetail.isSupplier}</p>
                        <p className="lead">Số lượng: Còn {productDetail.quantity} sản phẩm</p>
                        <div style={{ marginBottom: "2px" }}>
                            <p style={{ marginBottom: "0px" }}>Mô tả:</p>
                            <div dangerouslySetInnerHTML={{ __html: productDetail.descriptionProduct }} />
                        </div>
                        <div style={{ display: "flex", justifyContent: "left", paddingBottom: "0px" }}>
                            <input type="number" min={1} max={productDetail.quantity} value={quantityBuy}
                                onChange={(e) => {
                                    setErrorResponse({
                                        quantity: "",
                                        message: ""
                                    })
                                    setQuantityBuy(e.target.value);
                                }} style={{ marginRight: "5px", width: "10%" }} />
                            <Button onClick={() => addToCart()} variant="primary">Add to Cart</Button>
                        </div>
                        <ValidationMessage errorResponse={errorResponse} field="quantity" />
                        <ValidationMessage errorResponse={errorResponse} field="message" />

                    </Col>

                </Row>
                <Row>
                    <div style={{height:"300px", width:"100%", backgroundColor:"blue"}}> </div>
                </Row>
            </Container>
        </>
    )
}

export default ProductDetail;