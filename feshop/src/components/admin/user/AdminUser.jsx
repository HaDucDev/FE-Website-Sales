import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import userService from '../../../services/admin/admin.user.service';
import ReactPaginate from 'react-paginate';
import { Button, Form, Modal, Spinner } from 'react-bootstrap';
import convert_vi_to_en from '../../../utils/utils';
const AdminUser = () => {

    const [userList, setUserList] = useState([]);

    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);//tong so trang san pham
    const sizes = [4, 8, 16];// so luong san pham 1 trang
    const [size, setSize] = useState(4);


    const [showAddModal, setShowAddModal] = useState(false);// state bat/tat modal create
    const [roleList, setRoleList] = useState([])
    const [load, setLoadTable] = useState(false);// state load khi them thanh cong
    const [userValue, setUserValue] = useState({
        email: "",
        fullName: "",
        username: "",
        address: "",
        phone: "",
        roleId: 0
    });
    const [intiText, setText] = useState("");// state search

    const [isSubmitting, setIsSubmitting] = useState(false);// state nut chi nhan dc mot lan
    const [isLoading, setIsLoading] = useState(false);// tao spiner quay de biet data dang gui, cham 1 ti


    //update
    const [showUpdateModal, setShowUpdateModal] = useState(false);// state bat/tat modal update

    const [userById, setUserById] = useState({
        userId: 0,
        email: "",
        fullName: "",
        address: "",
        phone: "",
        roleId: 0
    })

    useEffect(() => {
        if (intiText !== "") {
            userService.getAllUserService(0, 100).then((dataResponse) => {
                console.log(dataResponse.data);
                setUserList(dataResponse.data.content)
                setTotalPages(dataResponse.data.totalPages)
            })
        }
        else {
            userService.getAllUserService(page, size).then((dataResponse) => {
                console.log(dataResponse.data);
                setUserList(dataResponse.data.content)
                setTotalPages(dataResponse.data.totalPages)
            })
        }
    }, [page, size, load, intiText])


    const onPageChange = ({ selected }) => {
        setPage(selected);
    }

    // them nguoi dung
    const handleAddUser = () => {
        userService.getAllRoleService().then((dataResponse) => {
            setRoleList(dataResponse.data);
        }).catch(error => alert("Lỗi " + error + "Khi lấy tất cả quyền. Bạn hãy quay lại sau."));
        setShowAddModal(true);
    }

    const addUser = () => {
        setIsSubmitting(true);
        setIsLoading(true);// mo quay tron
        userService.createUserService(userValue).then((dataResponse) => {
            let dataShow = dataResponse.data;
            setUserValue({
                email: "",
                fullName: "",
                username: "",
                address: "",
                phone: "",
                roleId: 0,
            });
            setLoadTable(!load);
            alert(dataShow["message"]);
            setShowAddModal(false);
        }).catch(error => alert("Lỗi " + error + "Khi thêm người dùng. Bạn hãy quay lại sau."));
    }


    const search = (data) => {
        return data.filter(row => convert_vi_to_en(row.username.toLowerCase()).indexOf(convert_vi_to_en(intiText.toLowerCase())) > -1
            || row.fullName.toString().includes(intiText)
            || convert_vi_to_en(row.email.toLowerCase()).indexOf(convert_vi_to_en(intiText.toLowerCase())) > -1
            || convert_vi_to_en(row.roleName.toLowerCase()).indexOf(convert_vi_to_en(intiText.toLowerCase())) > -1
            || row.address.toString().includes(intiText));
    }

    const functionUpdate = (id) => {

        userService.getUserByIdService(id).then((dataResponse) => {
            let dataUser = dataResponse.data;
            console.log(dataUser)
            setUserById({
                userId: dataUser.userId,
                email: dataUser.email,
                fullName: dataUser.fullName,
                address: dataUser.address,
                phone: dataUser.phone,
                roleId: dataUser.roleId,
            });

        }).catch(error => alert("Lỗi " + error + "Khi lấy user theo id. Bạn hãy quay lại sau."));
        userService.getAllRoleService().then((dataResponse) => {
            setRoleList(dataResponse.data);
        }).catch(error => alert("Lỗi " + error + "Khi lấy tất cả quyền. Bạn hãy quay lại sau."));
        setShowUpdateModal(true);
    }

    return (
        <>
            <div style={{ margin: "5%", width: "90%" }}>
                <div style={{ display: "flex", justifyContent: "right", alignItems: "center", height: "30px", marginBottom: "10px" }}>
                    <input type="text" placeholder="search here" className="w-25 form-control"
                        value={intiText} onChange={(e) => setText(e.target.value)} />
                    <Button style={{ width: "20%" }} onClick={() => handleAddUser()}>Thêm người dùng</Button>
                </div>
                <Table striped bordered hover size="sm" responsive>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>Avatar</th>
                            <th>Email</th>
                            <th>Họ và tên</th>
                            {/* <th>Tên đăng nhập</th> */}
                            {/* <th>Địa chỉ</th> */}
                            {/* <th>Số điện thoại</th> */}
                            <th>Vai trò</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {(search(userList)).map((data) => (
                            <tr key={(data.userId).toString()}>
                                <td>{data.userId}</td>
                                <td>
                                    <img src={(data.avatar) ? data.avatar : "https://res.cloudinary.com/dkdyl2pcy/image/upload/v1676872862/avatar-default-9_rv6k1c.png"} alt='lỗi'
                                        style={{ height: "40px", width: "40px", objectFit: "cover", borderRadius: "50%" }} />
                                </td>
                                <td>{data.email}</td>
                                <td>{data.fullName}</td>
                                {/* <td>{data.username}</td> */}
                                {/* <td>{data.address}</td> */}
                                {/* <td>{data.phone}</td> */}
                                <td>{data.roleName}</td>
                                <td>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <Button variant="outline-primary" style={{ marginRight: "10px" }} onClick={() => { functionUpdate(data.userId) }}>Xem/Sửa</Button>
                                        <Button variant="outline-primary"> Xóa </Button>
                                    </div>
                                </td>
                            </tr>
                        ))}
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



            {/* Modal them user*/}
            <Modal show={showAddModal} onHide={() => setShowAddModal(false)} >
                <Modal.Header closeButton style={{ width: "100%" }}>
                    <Modal.Title>Thêm người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập email"
                            onChange={(e) => {
                                setUserValue({ ...userValue, email: e.target.value });
                                // setErrorResponse({
                                //     ...errorResponse,
                                //     productName: ""
                                // })
                                // setIsSubmitting(false);// mo nut
                            }}
                        />
                        {/* <ValidationMessage errorResponse={errorResponse} field="productName" /> */}
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Họ và tên:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập fullName"
                            onChange={(e) => {
                                setUserValue({ ...userValue, fullName: e.target.value });
                                // setErrorResponse({
                                //     ...errorResponse,
                                //     quantity: ""
                                // })
                                // setIsSubmitting(false);// mo nut
                            }}
                        />
                        {/* <ValidationMessage errorResponse={errorResponse} field="quantity" /> */}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput3" style={{ marginLeft: "10px", }}>
                        <Form.Label>Tên đăng nhập:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập username"
                            onChange={(e) => {
                                setUserValue({ ...userValue, username: e.target.value });
                                // setErrorResponse({
                                //     ...errorResponse,
                                //     discount: ""
                                // })
                                // setIsSubmitting(false);// mo nut
                            }}
                        />
                        {/* <ValidationMessage errorResponse={errorResponse} field="discount" /> */}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput4" style={{ marginLeft: "10px", }} >
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập địa chỉ:"
                            onChange={(e) => {
                                setUserValue({ ...userValue, address: e.target.value });
                                // setErrorResponse({
                                //     ...errorResponse,
                                //     unitPrice: ""
                                // })
                                // setIsSubmitting(false);// mo nut
                            }}
                        />
                        {/* <ValidationMessage errorResponse={errorResponse} field="unitPrice" /> */}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput4" style={{ marginLeft: "10px", }} >
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập số điện thoại:"
                            onChange={(e) => {
                                setUserValue({ ...userValue, phone: e.target.value });
                                // setErrorResponse({
                                //     ...errorResponse,
                                //     unitPrice: ""
                                // })
                                // setIsSubmitting(false);// mo nut
                            }}
                        />
                        {/* <ValidationMessage errorResponse={errorResponse} field="unitPrice" /> */}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                        <Form.Label>Chọn vai trò</Form.Label>
                        <Form.Control
                            as="select"
                            name="roleId"
                            value={userValue.roleId}
                            onChange={(e) => {
                                setUserValue({ ...userValue, roleId: e.target.value });
                                // setErrorResponse({
                                //     ...errorResponse,
                                //     categoryId: ""
                                // })
                                // setIsSubmitting(false);// mo nut
                            }}
                        >
                            <option value={0}>Chọn role...</option>
                            {
                                roleList.map((role) => (
                                    <option key={role.id} value={role.id}>{role.name}</option>
                                ))
                            }
                        </Form.Control>
                        {/* <ValidationMessage errorResponse={errorResponse} field="categoryId" /> */}
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Đóng
                    </Button>

                    <Button variant="outline-primary"
                        disabled={isSubmitting}
                        style={{ zIndex: "1" }}
                        onClick={() => addUser()}
                    >
                        {isLoading && (
                            <Spinner
                                style={{ margin: "auto", zIndex: "9" }}
                                animation="border"
                                variant="primary"
                            />
                        )}
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>

            {/* Modal sua user*/}
            <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)} >
                <Modal.Header closeButton style={{ width: "100%" }}>
                    <Modal.Title>Sửa người dùng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Id:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập email"
                            defaultValue={userById.userId}
                            readOnly
                            onChange={(e) => {
                                setUserValue({ ...userValue, email: e.target.value });
                                // setErrorResponse({
                                //     ...errorResponse,
                                //     productName: ""
                                // })
                                // setIsSubmitting(false);// mo nut
                            }}
                        />
                        {/* <ValidationMessage errorResponse={errorResponse} field="productName" /> */}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <Form.Label>Email:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập email"
                            defaultValue={userById.email}
                            onChange={(e) => {
                                setUserValue({ ...userValue, email: e.target.value });
                                // setErrorResponse({
                                //     ...errorResponse,
                                //     productName: ""
                                // })
                                // setIsSubmitting(false);// mo nut
                            }}
                        />
                        {/* <ValidationMessage errorResponse={errorResponse} field="productName" /> */}
                    </Form.Group>


                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                        <Form.Label>Họ và tên:</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập fullName"
                            defaultValue={userById.fullName}
                            onChange={(e) => {
                                setUserValue({ ...userValue, fullName: e.target.value });
                                // setErrorResponse({
                                //     ...errorResponse,
                                //     quantity: ""
                                // })
                                // setIsSubmitting(false);// mo nut
                            }}
                        />
                        {/* <ValidationMessage errorResponse={errorResponse} field="quantity" /> */}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput4" style={{ marginLeft: "10px", }} >
                        <Form.Label>Địa chỉ</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập địa chỉ:"
                            defaultValue={userById.address}
                            onChange={(e) => {
                                setUserValue({ ...userValue, address: e.target.value });
                                // setErrorResponse({
                                //     ...errorResponse,
                                //     unitPrice: ""
                                // })
                                // setIsSubmitting(false);// mo nut
                            }}
                        />
                        {/* <ValidationMessage errorResponse={errorResponse} field="unitPrice" /> */}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput4" style={{ marginLeft: "10px", }} >
                        <Form.Label>Số điện thoại</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Nhập số điện thoại:"
                            defaultValue={userById.phone}
                            onChange={(e) => {
                                setUserValue({ ...userValue, phone: e.target.value });
                                // setErrorResponse({
                                //     ...errorResponse,
                                //     unitPrice: ""
                                // })
                                // setIsSubmitting(false);// mo nut
                            }}
                        />
                        {/* <ValidationMessage errorResponse={errorResponse} field="unitPrice" /> */}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                        <Form.Label>Chọn vai trò</Form.Label>
                        <Form.Control
                            as="select"
                            name="roleId"
                            defaultValue={userById.roleId}
                            onChange={(e) => {
                                setUserValue({ ...userValue, roleId: e.target.value });
                                // setErrorResponse({
                                //     ...errorResponse,
                                //     categoryId: ""
                                // })
                                // setIsSubmitting(false);// mo nut
                            }}
                        >
                            <option value={0}>Chọn role...</option>
                            {
                                roleList.map((role) => (
                                    <option key={role.id} value={userById.roleId}>{role.name}</option>
                                ))
                            }
                        </Form.Control>
                        {/* <ValidationMessage errorResponse={errorResponse} field="categoryId" /> */}
                    </Form.Group>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowAddModal(false)}>
                        Đóng
                    </Button>

                    <Button variant="outline-primary"
                        disabled={isSubmitting}
                        style={{ zIndex: "1" }}
                        onClick={() => addUser()}
                    >
                        {isLoading && (
                            <Spinner
                                style={{ margin: "auto", zIndex: "9" }}
                                animation="border"
                                variant="primary"
                            />
                        )}
                        Lưu
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}

export default AdminUser;