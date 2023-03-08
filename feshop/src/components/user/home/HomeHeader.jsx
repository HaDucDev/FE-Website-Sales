import { useState } from "react";
import "./home-header.css"


const HomeHeader = () => {


    const [hovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
      };
    
      const handleMouseLeave = () => {
        setHovered(false);
      };

    return (
        <>

            <div className="main-menu-navbar">
                <div className="child-div-of-main">Trang chủ</div>
                <div className="child-div-of-main" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
                    <ul>Sản phẩm
                        {
                            hovered && (
                                <>
                                <li className="filler-menu">312312</li>
                        <li className="filler-menu">312312</li>
                        <ul className="filler-menu">132312
                            <li className="filler-menu">dasdasd</li>
                            <li className="filler-menu">asddasdsa</li>
                        </ul>
                                </>
                            )
                        }
                        
                    </ul>
                </div>
                <div className="child-div-of-main">Chính sách</div>
                <div className="child-div-of-main">Liên hệ</div>
            </div>

        </>
    )

}


export default HomeHeader;