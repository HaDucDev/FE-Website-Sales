import { useNavigate } from "react-router-dom";
import "./home-header.css";

const HomeHeader = () => {

    const nav = useNavigate();

    let ok=1

    return (
        <>
            <nav class="navbar">
                <ul class="navbar-menu">
                    <li class="navbar-item">
                        <a href="/" class="navbar-link navbar-logo">Trang chủ</a>
                    </li>
                    <li class="navbar-item">
                        <a href="/" class="navbar-link">Danh mục</a>
                        <ul class="navbar-submenu">
                            <li class="navbar-submenu-item" style={{ width: "100px" }}>
                                Danh mục 1
                                <ul class="navbar-submenu-item-submenu">
                                    <li class="navbar-submenu-item" style={{ width: "200px" }} onClick={()=>{nav(`/login?ma=${ok}`)}}>
                                        Danh mục 1 Nhà 
                                    </li>
                                    <li class="navbar-submenu-item" style={{ width: "200px" }}>
                                        Danh mục 1 Nhà cung cấp
                                    </li>
                                    <li class="navbar-submenu-item" style={{ width: "200px" }}>
                                        Danh mục 1 Nhà cung cấp
                                    </li>
                                    <li class="navbar-submenu-item" style={{ width: "200px" }}>
                                        Danh mục 1 Nhà cung cấp
                                    </li>
                                </ul>
                            </li>
                            <li class="navbar-submenu-item" style={{ width: "100px" }}>
                                Danh mục 2
                                <ul class="navbar-submenu-item-submenu">
                                    <li class="navbar-submenu-item" style={{ width: "200px" }}>
                                        Danh Nhà cung cấp
                                    </li>
                                    <li class="navbar-submenu-item" style={{ width: "200px" }}>
                                        Danh mục 2 Nhà cung cấp
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li class="navbar-item">
                        <a href="/policy" class="navbar-link">Chính sách bán hàng</a>
                    </li>
                    <li class="navbar-item">
                        <a href="/contact" class="navbar-link">Liên hệ</a>
                    </li>
                </ul>
            </nav>

        </>
    );
};

export default HomeHeader;
