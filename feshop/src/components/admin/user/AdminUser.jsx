import {useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import userService from '../../../services/admin/admin.user.service';
import ReactPaginate from 'react-paginate';
import UserItem from './UserItem';
import { Button } from 'react-bootstrap';
const AdminUser = () => {

    const [userList, setUserList] = useState([]);

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);//tong so trang san pham
    const sizes = [4, 8, 16];// so luong san pham 1 trang
    const [size, setSize] = useState(4);

    useEffect(() => {
        userService.getAllUserService(page, size).then((dataResponse) => {
            console.log(dataResponse.data);
            setUserList(dataResponse.data.content)
            setTotalPages(dataResponse.data.totalPages)
        })
    }, [page, size])


    const onPageChange = ({ selected }) => {
        setPage(selected);
    }

    return (
        <>
            <div style={{ margin: "5%", width: "90%" }}>
                <div style={{ display: "flex", justifyContent: "right", alignItems: "center", height: "30px", marginBottom:"10px"}}>
                    <Button style={{ width: "20%" }}>Thêm người dùng</Button>
                </div>
                <Table striped bordered hover size="sm" responsive>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Avatar</th>
                            <th>Email</th>
                            <th>Họ và tên</th>
                            <th>Tên đăng nhập</th>
                            <th>Địa chỉ</th>
                            <th>Số điện thoại</th>
                            <th>Vai trò</th>
                        </tr>
                    </thead>
                    <tbody>
                        { userList.map((item) => <UserItem key={item.userId} data={item}/> )}
                    </tbody>
                </Table>
                <div style={{ display: "flex", justifyContent: "right", alignItems: "center", height: "30px" }}>
                    <select onChange={(e) => { setSize(e.target.value); }} value={size} style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "8%" }}>
                        {sizes.map((size) => (
                            <option key={size} value={size}>
                                {size} dòng
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
            </div>


        </>
    )
}

export default AdminUser;