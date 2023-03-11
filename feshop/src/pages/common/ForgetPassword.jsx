import { useState } from "react";
import { Button, Form } from "react-bootstrap";


const ForgetPassword = () => {

    const [openInputUpdate, setopenInputUpdate] = useState(false);// do thuoc tinh readOnly true ms khoa input

    return (
        <>
            <div style={{ height: "60vh" }} className="d-flex justify-content-center align-items-center">
                <div style={{ border: "1px solid #2522ca", padding: "10px", borderRadius: "5%", width:"30%"}}>
                    <h3 className="text-center">Quên mật khẩu</h3>
                    <Form>
                        <Form.Group style={{ clear: "both" }}>
                            <Form.Label>Email:</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Nhập email để lấy mã xác nhận"
                                // defaultValue={accountById.email}
                                // readOnly={openInputUpdate}
                                // onChange={e => {
                                //     setAccountById({ ...accountById, email: e.target.value })
                                // }}
                            />
                        </Form.Group>
                        {
                            openInputUpdate ? (<Button variant="outline-primary" className="w-100 mt-3"
                                style={{ zIndex: "1" }}
                                // onClick={(e) => {
                                //     e.preventDefault();// lay quyen dieu khine form
                                //     setopenInputUpdate(!openInputUpdate)
                                // }}
                                >
                                Sửa thông tin người dùng
                            </Button>) : (
                                <>
                                    <Button variant="primary" type="submit" className="w-100 mt-3"
                                        //onClick={handleSaveInfor} disabled={isSubmitting}
                                    >
                                        {/* {isLoading && (
                                            <Spinner
                                                style={{ margin: "auto", zIndex: "9" }}
                                                animation="border"
                                                variant="warning"
                                            />
                                        )} */}
                                        Gửi mã xác nhận</Button>
                                </>
                            )
                        }
                    </Form>
                </div>
            </div>
        </>
    )
}

export default ForgetPassword;