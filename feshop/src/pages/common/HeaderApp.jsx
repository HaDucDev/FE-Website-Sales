import { useEffect } from 'react';
import { useContext } from 'react';
import { Button } from 'react-bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router';
import { LoginContext } from '../../App';
// ui React bootstrap https://react-bootstrap.github.io/components/navbar/#responsive-behaviors
const HeaderApp = () => {

  const textLogin = useContext(LoginContext);
  useEffect(() => {
    console.log("ok123456")
    console.log(textLogin.loadPage)
  }, [textLogin.loadPage]);

  const doneLogin = localStorage.getItem("currentUser");

  const nav = useNavigate();
  return (
    <>
      {['sm'].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas id={`offcanvasNavbar-expand-${expand}`} aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`} placement="end">
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#action1">Giỏ hàng</Nav.Link>
                  {
                    (doneLogin) ? (
                      <>
                        <img src={JSON.parse(doneLogin).avatar ? JSON.parse(doneLogin).avatar : "https://res.cloudinary.com/dkdyl2pcy/image/upload/v1676872862/avatar-default-9_rv6k1c.png"} alt='lỗi' 
                        style={{height:"40px", width:"40px", objectFit:"cover",borderRadius:"50%"}}/>
                    
                        <NavDropdown title={JSON.parse(doneLogin).username} id={`offcanvasNavbarDropdown-expand-${expand}`}>
                          <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                          <NavDropdown.Item href="#action4">
                            Another action
                          </NavDropdown.Item>
                          <NavDropdown.Divider />
                          <NavDropdown.Item href="#action5">
                            Something else here
                          </NavDropdown.Item>
                        </NavDropdown>
                      </>
                    ) : ("")
                  }
                  {
                    (doneLogin) ? (
                      <Button variant="outline-success" onClick={(e) => { e.preventDefault(); localStorage.removeItem("currentUser"); nav("/") }}>Đăng xuất</Button>
                    ) :
                      (<Button variant="outline-success" onClick={(e) => { e.preventDefault(); nav("/login") }}>Đăng nhập</Button>)
                  }
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}

    </>
  )
}

export default HeaderApp;