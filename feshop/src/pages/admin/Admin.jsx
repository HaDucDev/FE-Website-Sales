import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./css/admin.css";


const sideBar = [
  {
    id: 0,
    link: "/admin/users",
    section: "users",
    text: "Tài khoản",

  },
  {
    id: 1,
    link: "/admin/category",
    section: "category",
    text: "Danh mục",
  },
  {
    id: 2,
    link: "/admin/supplier",
    section: "supplier",
    text: "Nhà cung cấp",

  },
  {
    id: 3,
    link: "/admin/product",
    section: "products",
    text: "Sản phẩm",
  },
  {
    id: 4,
    link: "/admin/orders",
    section: "orders",
    text: "Đơn hàng",
  },
  {
    id: 5,
    link: "/admin/revenue",
    section: "supplier",
    text: "Thống kê",

  },
  {
    id: 6,
    link: "/admin/reviews",
    section: "reviews",
    text: "Đánh giá",
  },
];

const Admin = () => {

  const nav = useNavigate();
  const user = JSON.parse(localStorage.getItem("currentUser"));

  useEffect(() => {
    console.log("ok")
    if (user == null || user === "" || user.roleName !== "ROLE_ADMIN") {
      alert("Bạn không có quyền vào trang này");
      nav("/")
    }
  })
  const [activeIndex, setActiveIndex] = useState(null);
  return (
    <>
      {
        !user ? "" : (
          <div className="admin" style={{ marginTop: "0px", marginRight: "0px" }}>
            <div className="sidebar" style={{}}>
              <div className="sidebar_menu" >
                <img style={{ margin: "auto", marginBottom: "0px", marginTop: "0px" }}
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQwbGozsS9QP10p16rZiCrQD0koXVkI4c7LwUHab9dkmFRcN0VqCkB37f2y0EnySItwykg&usqp=CAU"
                  alt=""
                  width="200"
                  height="200"
                />
                {sideBar.length > 0 &&
                  sideBar.map((nav, index) => (
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
            <div style={{ zIndex: "100", width: "72%", marginLeft: "25%" }}>
              <Outlet /> {/* Hien thi cac trang con */}
            </div>
          </div>
        )
      }

    </>
  )
}

export default Admin;