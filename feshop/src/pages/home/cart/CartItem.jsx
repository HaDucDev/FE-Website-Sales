

const CartItem = (props) => {
    console.log("ok roi chu")
    console.log(props.data)
    return (
        <>
            {
                <tr>
                    <td>{props.data.quantity}</td>
                    <td>{props.data.quantity}</td>
                    <td>{props.data.quantity}</td>
                    <td>${props.data.quantity}</td>
                </tr>
            }
        </>
    )
}
export default CartItem;