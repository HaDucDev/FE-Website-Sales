

const UserItem = ({ data }) => {
    return (
        <tr key={(data.userId).toString()}>
            <td>{data.userId}</td>
            <td>
                <img src={(data.avatar) ? data.avatar : "https://res.cloudinary.com/dkdyl2pcy/image/upload/v1676872862/avatar-default-9_rv6k1c.png"} alt='lỗi'
                    style={{ height: "40px", width: "40px", objectFit: "cover", borderRadius: "50%" }} />
            </td>
            <td>{data.email}</td>
            <td>{data.fullName}</td>
            <td>{data.username}</td>
            <td>{data.address}</td>
            <td>{data.phone}</td>
            <td>{data.roleName}</td>
        </tr>

    )
}

export default UserItem