import { useNavigate } from "react-router-dom";
import "./home-header.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useState } from "react";
const HomeHeader = () => {

    const [inputValue, setInputValue] = useState("");// value thanh tim kiem
    const nav = useNavigate();

    const handleSendText = (e)=>{
        if(e.key==='Enter'){
            console.log(inputValue);
            nav(`/search-filter?textSearch=${inputValue}`)
        }
    }

    return (
        <>
            <div className="search-container">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Tìm kiếm sản phẩm..."
                    onChange={(e)=>{setInputValue(e.target.value)}}
                    //onKeyPress={handleKeyPress}
                    onKeyDown={handleSendText}
                />
                <button className="search-btn" onClick={(e)=>{
                    e.preventDefault();
                    nav(`/search-filter?textSearch=${inputValue}`)
                }}>
                    <FontAwesomeIcon icon={faSearch} />
                </button>
            </div>
            <nav className="navbar">
                <ul className="navbar-menu">
                    <li className="navbar-item">
                        <a href="/" className="navbar-link navbar-logo">Trang chủ</a>
                    </li>
                    <li className="navbar-item">
                        <a href="/" className="navbar-link">Danh mục</a>
                        <ul className="navbar-submenu">
                            <li className="navbar-submenu-item" style={{ width: "100px" }}>
                                Danh mục 1
                                <ul className="navbar-submenu-item-submenu">
                                    <li className="navbar-submenu-item" style={{ width: "200px" }} onClick={() => { nav(`/login`) }}>
                                        Danh mục 1 Nhà
                                    </li>
                                    <li className="navbar-submenu-item" style={{ width: "200px" }}>
                                        Danh mục 1 Nhà cung cấp
                                    </li>
                                    <li className="navbar-submenu-item" style={{ width: "200px" }}>
                                        Danh mục 1 Nhà cung cấp
                                    </li>
                                    <li className="navbar-submenu-item" style={{ width: "200px" }}>
                                        Danh mục 1 Nhà cung cấp
                                    </li>
                                </ul>
                            </li>
                            <li className="navbar-submenu-item" style={{ width: "100px" }}>
                                Danh mục 2
                                <ul className="navbar-submenu-item-submenu">
                                    <li className="navbar-submenu-item" style={{ width: "200px" }}>
                                        Danh Nhà cung cấp
                                    </li>
                                    <li className="navbar-submenu-item" style={{ width: "200px" }}>
                                        Danh mục 2 Nhà cung cấp
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li className="navbar-item">
                        <a href="/policy" className="navbar-link">Chính sách bán hàng</a>
                    </li>
                    <li className="navbar-item">
                        <a href="/contact" className="navbar-link">Liên hệ</a>
                    </li>
                </ul>
            </nav>

        </>
    );
};

export default HomeHeader;
