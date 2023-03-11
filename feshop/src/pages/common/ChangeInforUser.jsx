
import { useEffect, useState } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import accountService from "../../services/account/account.service";

const ChangeInforUser = () => {

    const [openInputUpdate, setopenInputUpdate] = useState(true);// do thuoc tinh readOnly true ms khoa input

    const [accountById, setAccountById] = useState({
        userId: 0,
        email: "",
        username: "",
        fullName: "",
        address: "",
        phone: "",
        avatar: "",
        roleId: 0,
        roleName: ""
    })


    useEffect(() => {
        accountService.inforUserByIdService(JSON.parse(localStorage.getItem("currentUser")).userId).then((dataResponse) => {
            let dataUser = dataResponse.data;
            console.log(dataUser);
            setAccountById({
                userId: dataUser.userId,
                email: dataUser.email,
                username: dataUser.username,
                fullName: dataUser.fullName,
                address: dataUser.address,
                phone: dataUser.phone,
                avatar: dataUser.avatar,
                roleId: dataUser.roleId,
                roleName: dataUser.roleName
            });
        })
    }, [])

    return (
        <>
            <div style={{ height: "85vh" }} className="d-flex justify-content-center align-items-center">
                <div style={{ border: "1px solid #2522ca", padding: "10px", borderRadius: "5%", }}>
                    <h3 className="text-center">Đổi thông tin cá nhân người dùng</h3>
                    <Form>
                        <div >
                            <Form.Group style={{ float: "left", marginRight: "5px" }}>
                                <Form.Label>Mã người dùng</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={JSON.parse(localStorage.getItem("currentUser")).userId}
                                    readOnly
                                />
                            </Form.Group>
                            <Form.Group style={{ float: "right" }}>
                                <Form.Label>Tên đăng nhập</Form.Label>
                                <Form.Control
                                    type="text"
                                    defaultValue={accountById.username}
                                    readOnly
                                />
                            </Form.Group>
                        </div>
                        <Form.Group style={{ clear: "both" }}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập tên email"
                                defaultValue={accountById.email}
                                readOnly={openInputUpdate}
                            // onChange={e => {
                            //     setRegisterAccount({ ...registerAccount, email: e.target.value })
                            // }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Họ và tên</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập họ và tên"
                                defaultValue={accountById.fullName}
                                readOnly={openInputUpdate}
                            // onChange={e => {
                            //     setRegisterAccount({ ...registerAccount, fullName: e.target.value })
                            // }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Địa chỉ</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập địa chỉ"
                                defaultValue={accountById.address}
                                readOnly={openInputUpdate}
                            // onChange={e => {
                            //     setRegisterAccount({ ...registerAccount, address: e.target.value })
                            // }}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Số điện thoại</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Số điện thoại"
                                defaultValue={accountById.phone}
                                readOnly={openInputUpdate}
                            // onChange={e => {
                            //     setRegisterAccount({ ...registerAccount, phone: e.target.value })
                            // }}
                            />
                        </Form.Group>
                        {/* avatar */}
                        <Form.Group>
                            <Form.Label>Avatar</Form.Label>
                            <div style={{ display: "flex" }}>
                                {
                                    openInputUpdate ? (<div>
                                        <img style={{ border: "1px solid black" }}
                                            src={accountById.avatar}
                                            width={100} height={100} alt="lỗi ảnh" />
                                    </div>) : (
                                        <>
                                            <div>
                                                <img style={{ border: "1px solid black" }}
                                                    src={accountById.avatar}
                                                    width={100} height={100} alt="lỗi ảnh" />
                                            </div>
                                            <div style={{ margin: "auto" }}>
                                                <Form.Label >Đổi ảnh</Form.Label>
                                                <Form.Control
                                                    type="file"
                                                // onChange={(e) => {
                                                //     (setSelectedFile(e.target.files[0]));
                                                // }}
                                                />
                                            </div>
                                        </>
                                    )
                                }
                            </div>
                        </Form.Group>
                        {
                            openInputUpdate ? (<Button variant="outline-primary" className="w-100 mt-3"
                                style={{ zIndex: "1" }}
                                onClick={(e) => {
                                    e.preventDefault();// lay quyen dieu khine form
                                    setopenInputUpdate(!openInputUpdate)
                                }}>
                                Sửa thông tin người dùng
                            </Button>) : (
                                <>
                                    <Button variant="primary" type="submit" className="w-100 mt-3"
                                    //onClick={handleRegister} disabled={isSubmitting}
                                    >
                                        {/* {isLoading && (
                                        <Spinner
                                            style={{ margin: "auto", zIndex: "9" }}
                                            animation="border"
                                            variant="warning"
                                        />
                                    )}  */}
                                        Lưu thay đổi</Button>
                                    <Button variant="outline-secondary" className="w-100 mt-3" onClick={(e) => { e.preventDefault(); setopenInputUpdate(true); }}>
                                        Đóng
                                    </Button>
                                </>
                            )
                        }
                    </Form>
                </div>
            </div>
        </>
    )

}

export default ChangeInforUser;