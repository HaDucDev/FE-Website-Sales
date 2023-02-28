import { useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import cartServiceUser from "../../../services/user/user.cart.service";


const CartItem = (props) => {
    console.log("ok roi chu")
    console.log(props.data)

    const [quantityBuy, setQuantityBuy] = useState(props.data.quantity);

    const handleQuantity = (operator) => {
        let data = {
            "userId": JSON.parse(localStorage.getItem("currentUser")).userId,
            "productId": props.data.id.productId,
            "quantity": 1,
            "operator": operator
        }
        cartServiceUser.addProductToCartService(data).then((dataResponse) => {
            console.log(dataResponse.data);
            if (operator === "add") {
                setQuantityBuy(quantityBuy + 1);
            }
            if (operator === "sub") {
                setQuantityBuy(quantityBuy - 1);
            }
        }).catch((err) => {
            console.log(err.response.data);
        })

    }

    const handleDelete = () => {
        let dataRequest = {
            "userId": JSON.parse(localStorage.getItem("currentUser")).userId,
            "productId": props.data.id.productId
        }
        console.log(dataRequest);
        cartServiceUser.deleteCartService(dataRequest).then((dataResponse) => {
            console.log(dataResponse.data);
            alert(dataResponse.data.message);
        }).catch((err) => {
            console.log(err.response.data);
            alert(err.response.data)
        })
    }
    return (
        <>
            {
                <tr>
                    <td>{props.data.id.productId}</td>
                    <td style={{ display: "flex", justifyContent: "center", height: "100%", padding: "3%" }}>
                        <div style={{ width: "20%", height: "20%" }}>
                            <img src={props.data.product.productImage} alt="" style={{ width: "30%" }} />
                        </div>
                        <div style={{ width: "40%" }}>
                            <Link to={`/product-detail/${props.data.id.productId}`}>
                                <div>{props.data.product.productName}</div>
                            </Link>
                        </div>
                    </td>
                    <td style={{ padding: "2%" }}>
                        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <button onClick={(e) => { e.preventDefault(); handleQuantity("sub"); }}>-</button>
                            <input type="number" value={quantityBuy} min={1} max={props.data.product.quantity}
                                onChange={(e) => {
                                    setQuantityBuy(e.target.value);
                                }}
                                style={{ width: "50%", textAlign: 'center' }} />
                            <button onClick={(e) => { e.preventDefault(); handleQuantity("add"); }}>+</button>
                        </div>
                    </td>
                    <td>{Number(props.data.product.unitPrice) - Number(props.data.product.unitPrice) * Number(props.data.product.discount) / 100}đ
                        <pre /><s>{props.data.product.unitPrice}đ</s>
                    </td>
                    <td style={{ justifyContent: "center", alignItems: "center" }}>
                        <Button onClick={handleDelete} style={{ marginTop: "10%" }}> Xóa </Button>
                    </td>
                </tr>
            }
        </>
    )
}
export default CartItem;