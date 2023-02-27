

const CartItem = (props) => {

    return (
        <>
            {
                props.data.length > 0 ? (
                    props.data.map((item) => (
                        <tr key={item.id.producId}>
                            <td>{item.product.productName}</td>
                            <td>{item.product.productName}</td>
                            <td>{item.quantity}</td>
                            <td>${item.quantity}</td>
                        </tr>
                    ))
                ) : "Không có sản phẩm nào"
            }
        </>
    )
}
export default CartItem;