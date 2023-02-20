import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminCategory from './components/admin/category/AdminCategory';
import AdminProduct from './components/admin/product/AdminProduct';
import AdminSupplier from './components/admin/supplier/AdminSupplier';
import Admin from './pages/admin/Admin';
import Login from './pages/common/Login';
import Home from './pages/home/Home';
import HeaderApp from './pages/common/HeaderApp';
import { createContext } from 'react';
import { useState } from 'react';
import ProductDetail from './components/user/product-detail/ProductDetail';



export const LoginContext = createContext();

function App() {

  const [loadPage, setLoadPage] = useState(0);

  const state = {
    loadPage,
    setLoadPage
  }
  return (
    <>
      {
        console.log("test12345")
      }
      <LoginContext.Provider value={state}>
        <HeaderApp />

        <BrowserRouter>
          <Routes>
            {/* common */}

            <Route path="/" element={<Home />}>
              {/* <Route path="/product-detail/:id" element={<ProductDetail />} /> */}
            </Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/product-detail/:id" element={<ProductDetail />} />

            {/* admin */}
            <Route path="/admin" element={<Admin />} exact>
              <Route path="category" element={<AdminCategory />}></Route>
              <Route path="supplier" element={<AdminSupplier />}></Route>
              <Route path="product" element={<AdminProduct />}></Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </LoginContext.Provider>
    </>

  );
}

export default App;
