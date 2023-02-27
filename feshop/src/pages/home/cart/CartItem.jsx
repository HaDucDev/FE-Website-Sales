import { Link } from "react-router-dom";


const CartItem = (props) => {
    console.log("ok roi chu")
    console.log(props.data)
    return (
        <>
            {
                <tr>
                    <td>{props.data.id.productId}</td>
                    <td style={{ display: "flex" , justifyContent: "center"}}>
                        <div style={{ width: "20%", height: "20%" }}>
                            <img src={props.data.product.productImage} alt="" style={{ width: "40%" }} />
                        </div>
                        <div style={{ width: "40%" }}>
                            <Link to={`/product-detail/${props.data.id.productId}`}>
                                <div>{props.data.product.productName}</div>
                            </Link>
                        </div>
                    </td>
                    <td>{props.data.quantity}</td>
                    <td>{Number(props.data.product.unitPrice) - Number(props.data.product.unitPrice) * Number(props.data.product.discount) / 100}đ
                    <pre/><s>{props.data.product.unitPrice}đ</s></td>    
                </tr>
            }
        </>
    )
}
export default CartItem;