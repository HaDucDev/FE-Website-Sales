

const CartItem = (data) => {

    console.log(data.length)
    return (
        <>
            {
                data.length > 0 ? (
                    data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.name}</td>
                            <td>${item.price}</td>
                            <td>{item.quantity}</td>
                            <td>${item.price * item.quantity}</td>
                        </tr>
                    ))
                ) : ("Không có sản phẩm nào")
            }
        </>
    )
}
export default CartItem;