import { useState } from "react";
import { Link } from "react-router-dom";
import cartServiceUser from "../../../services/user/user.cart.service";


const CartItem = (props) => {
    console.log("ok roi chu")
    console.log(props.data)

    const [quantityBuy, setQuantityBuy] = useState(props.data.quantity);

    const handleIncrease = ()=>{
        let data= {
            "userId": JSON.parse(localStorage.getItem("currentUser")).userId,
            "productId":props.data.id.productId,
            "quantity": 1
        }
        cartServiceUser.addProductToCartService(data).then((dataResponse)=>{
            console.log(dataResponse.data);
            setQuantityBuy(quantityBuy+1);
        }).catch((err)=>{
            console.log(err.response.data);
        })
       
    }
    return (
        <>
            {
                <tr>
                    <td>{props.data.id.productId}</td>
                    <td style={{ display: "flex", justifyContent: "center", height:"100%", padding:"3%"}}>
                        <div style={{ width: "20%", height: "20%" }}>
                            <img src={props.data.product.productImage} alt="" style={{ width: "30%" }} />
                        </div>
                        <div style={{ width: "40%" }}>
                            <Link to={`/product-detail/${props.data.id.productId}`}>
                                <div>{props.data.product.productName}</div>
                            </Link>
                        </div>
                    </td>
                    <td style={{ padding:"2%"}}>
                        <div style={{ display: "flex",justifyContent: "center",  alignItems: "center"}}>
                            <button >-</button>
                            <input type="number" value={quantityBuy} min={1} max={props.data.product.quantity}
                                onChange={(e) => {
                                    setQuantityBuy(e.target.value);
                                }}
                                style={{ width: "50%", textAlign:'center'}} />
                            <button onClick={handleIncrease}>+</button>
                        </div>
                    </td>
                    <td>{Number(props.data.product.unitPrice) - Number(props.data.product.unitPrice) * Number(props.data.product.discount) / 100}đ
                        <pre /><s>{props.data.product.unitPrice}đ</s></td>
                </tr>
            }
        </>
    )
}
export default CartItem;