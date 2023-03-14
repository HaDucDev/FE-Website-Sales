import React, {  useContext, useEffect,  useMemo,  useState } from 'react';
import { Card, Button, Image, Form } from 'react-bootstrap';
import './list-product-search-filter.css'
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import productServiceUser from '../../../../services/user/user.product.service';
import ReactPaginate from 'react-paginate';
import categoryService from '../../../../services/admin/admin.category.service';
import supplierService from '../../../../services/admin/admin.supplier.service';
import cartServiceUser from '../../../../services/user/user.cart.service';
import { LoginContext } from '../../../../App';
const ListProductSearchFilter = () => {

    const nav = useNavigate();


    const [listProductSearchFilter, setListProductSearchFilter] = useState([])//state san pham trang home
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);//tong so trang san pham
    const sizes = [4, 8, 16];// so luong san pham 1 trang
    const [size, setSize] = useState(8);

    const [params] = useSearchParams();
    const textSearch = (params.get('textSearch') ? params.get('textSearch') : "");
    console.log(textSearch)

    const categoryId = (params.get('categoryId')) ? params.get('categoryId') : "";
    const supplierId = (params.get('supplierId')) ? params.get('supplierId') : "";

    const priceList = useMemo(() => {
        const prices = params.getAll('price');
        return prices.length > 0 ? prices : [];
      }, [params]);

    //const priceList =  params.getAll('price') ? params.getAll('price') : ["0_0"];
    //const [priceList1, setpriceList1] = useState([])

    const [categorySelect, setCategorySelect] = useState([]);
    const [supplierSelect, setSupplierSelect] = useState([]);

    useEffect(() => {
        console.log(Math.random())
        console.log(priceList)
        categoryService.getAllCategoryService().then((responseData) => {
            setCategorySelect(responseData.data);
        }).catch(error => alert("Lỗi load category list " + error + ". Bạn hãy quay lại sau."));
        supplierService.getAllSupplierService().then((responseData) => {
            setSupplierSelect(responseData.data);
        }).catch(error => alert("Lỗi load supplier list" + error + ". Bạn hãy quay lại sau."));
        // console.log(params.get('categoryId'))
        productServiceUser.getAllSearchFilterProductService(page, size, categoryId, supplierId, textSearch,priceList).then((responseData) => {
            console.log(responseData.data.content);
            setListProductSearchFilter(responseData.data.content);//data    
            setTotalPages(responseData.data.totalPages);//so trang   
        }).catch(error => alert("Lỗi " + error + ". Bạn hãy quay lại sau."));
    }, [page, size, textSearch, categoryId, supplierId,priceList,params])


    const onPageChange = ({ selected }) => {
        setPage(selected);
    }
    const textLogin = useContext(LoginContext);
    const addProductToCart = (id) => {
        let data = {
            "userId": JSON.parse(localStorage.getItem("currentUser")).userId,
            "productId": Number(id),
            "quantity": 1,
            "operator": "add"
        }
        cartServiceUser.addProductToCartService(data).then((dataResponse) => {
            let dataShow = dataResponse.data;
            textLogin.setLoadPage(Math.floor(Math.random() * 10) + 1);
            alert(dataShow["message"]);
        }).catch((err) => {
            console.log(err)
            let errorShow = err.response.data;
            alert(errorShow["message"]);
        })
    }

    return (
        <>
            <div style={{ float: "left", marginLeft: "5%" }}>
                <div style={{ backgroundColor: "green", color: "white", textAlign: "center" }}>Lọc sản phẩm</div>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                    <Form.Label>Chọn loại hàng</Form.Label>
                    {
                        (<>
                            <Form.Control
                                as="select"
                                name="categoryId"
                                value={categoryId}
                                onChange={(e) => {
                                    e.preventDefault();
                                    nav(`/search-filter?categoryId=${e.target.value}&supplierId=${supplierId}`)
                                }}
                            >
                                <option value={0}>Chọn category...</option>
                                {
                                    categorySelect.map((category) => (
                                        <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
                                    ))
                                }
                            </Form.Control>
                        </>)
                    }

                </Form.Group>
                <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                    <Form.Label>Chọn nhà sản xuất</Form.Label>
                    {
                        (<>
                            <Form.Control
                                as="select"
                                name="supplierId"
                                value={supplierId}
                                onChange={(e) => {
                                    e.preventDefault();
                                    nav(`/search-filter?categoryId=${categoryId}&supplierId=${e.target.value}`)
                                }}
                            >
                                <option value={0}>Chọn supplier...</option>
                                {
                                    supplierSelect.map((suppliser) => (
                                        <option key={suppliser.supplierId} value={suppliser.supplierId}>{suppliser.supplierName}</option>
                                    ))
                                }
                            </Form.Control>
                        </>)
                    }

                </Form.Group>
                <div style={{ padding: "2%" }}>
                    <div>Chọn khoảng giá</div>
                    <div>
                        <input type="checkbox"
                            name="checkbox1"
                            //checked={checkboxValues.checkbox1}
                            //checked=
                            value="10000_100000"
                            onChange={(e)=>{
                                e.preventDefault();
                                if(Array.isArray(priceList) &&!priceList.includes(e.target.value)){
                                    priceList.push(e.target.value)
                                    
                                    let urlPrice = "";
                                    priceList.forEach((value) => {
                                        urlPrice = urlPrice +`&price=${value}`;
                                    });
                                    console.log(urlPrice);
                                    nav(`/search-filter?categoryId=${categoryId}&supplierId=${supplierId}`+urlPrice)
                                }
                                //else
                            }}
                            style={{ transform: "scale(2)", marginRight: "10px", boxSizing: "border-box" }} />10.000đ -100.000đ
                    </div>
                    <div>
                        <input type="checkbox"
                            name="checkbox2"
                            //checked={checkboxValues.checkbox2}
                            //onChange={handleCheckboxChange}
                            style={{ transform: "scale(2)", marginRight: "10px", boxSizing: "border-box" }} />1.000.000đ -10.000.000đ
                    </div>
                    <div>
                        <input type="checkbox"
                            name="checkbox3"
                            //checked={checkboxValues.checkbox2}
                            //onChange={handleCheckboxChange}
                            style={{ transform: "scale(2)", marginRight: "10px", boxSizing: "border-box" }} />10.000.000đ -20.000.000đ
                    </div>
                    <div>
                        <input type="checkbox"
                            name="checkbox4"
                            //checked={checkboxValues.checkbox2}
                            //onChange={handleCheckboxChange}
                            style={{ transform: "scale(2)", marginRight: "10px", boxSizing: "border-box" }} />Trên 20.000.000đ
                    </div>



                </div>
            </div>

            <div className="card-list-container" >
                {listProductSearchFilter.map((item, index) => (
                    <Card key={("navbar-item" + 1 + index).toString()} className="card-container">
                        <Image src={item.productImage} fluid className="card-image" style={{ borderBottom: '2px solid #ddd' }} />
                        <Card.Body>
                            <Card.Title className="card-title" style={{ height: "28%", fontSize: "90%" }}>{item.productName}</Card.Title>
                            <Card.Text className="card-text">{item.unitPrice} VND</Card.Text>
                            <Button variant="primary" className="card-button"
                                onClick={() => addProductToCart(item.productId)}>Thêm vào giỏ hàng</Button>
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