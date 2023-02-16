import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./css/sidebar.css";


const sidebarNav = [
  {
    id: 0,
    link: "/admin/reviews",
    section: "reviews",
    text: "Đánh giá",
  },
  {
    id: 1,
    link: "/admin/users",
    section: "users",
    text: "Tài khoản",
  },
  {
    id: 2,
    link: "/admin/products",
    section: "products",
    text: "Sản phẩm",
  },
  {
    id: 3,
    link: "/admin/orders",
    section: "orders",
    text: "Đơn hàng",
  },
  {
    id: 4,
    link: "/admin/category",
    section: "category",
    text: "Danh mục",
  },
  {
    id: 5,
    link: "/admin/supplier",
    section: "supplier",
    text: "Nhà cung cấp",
  },
  {
    id: 6,
    link: "/admin/revenue",
    section: "supplier",
    text: "Thống kê",
  },
];

const Admin = () => {

  const [activeIndex, setActiveIndex] = useState(null);
  return (
    <>
      <div className="admin" style={{ marginTop:"0px",marginRight:"0px"}}>
        <div className="sidebar" style={{}}>
          <div className="sidebar_menu" >
            <img style={{margin:"auto", marginBottom:"0px", marginTop:"0px"}}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwbGozsS9QP10p16rZiCrQD0koXVkI4c7LwUHab9dkmFRcN0VqCkB37f2y0EnySItwykg&usqp=CAU"
              alt=""
              width="200"
              height="200"
            />
            {sidebarNav.length > 0 &&
              sidebarNav.map((nav, index) => (
                <Link
                  to={nav.link}
                  key={index}
                  className={`sidebar_menu_item ${activeIndex === index && "active"
                    } relative`}
                  onClick={() => setActiveIndex(nav.id)}
                >
                  <div className="sidebar_menu_item_txt">{nav.text}</div>
                </Link>
              ))}
          </div>
        </div>
        <div style={{zIndex:"100", width:"72%", marginLeft:"25%"}}>
        <Outlet /> {/* Hien thi cac trang con */}
        </div>
      </div>

    </>
  )
}

export default Admin;