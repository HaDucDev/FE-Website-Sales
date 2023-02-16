import { Form, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
const Login = () => {

    return (
        <>
          <div
      style={{ height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div style={{ width: 500, border:"1px solid #2522ca", padding:"40px", borderRadius: "5%"}}>
        <h1 className="text-center">Đăng nhập</h1>
        <Form onSubmit={{}}>
          <Form.Group>
            <Form.Label>Tên đăng nhập</Form.Label>
            <Form.Control
              type="text"
              placeholder="Nhập tên đăng nhập"
              onChange={e => {
                //setEmail(e.target.value);
              }}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Mật khẩu</Form.Label>
            <Form.Control
              type="password"
              placeholder="Mật khẩu"
              onChange={e => {
                //setPassword(e.target.value);
              }}
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100 mt-3"> Đăng nhập</Button>
          <div>
            <Link to="/" style={{float:"left"}}>Đăng kí tài khoản</Link>
            <Link to="/" style={{float:"right"}}>Quên mật khẩu</Link>
          </div>
        </Form>
      </div>
    </div>
        </>
    );
}

export default Login;