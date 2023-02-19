import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminCategory from './components/admin/category/AdminCategory';
import AdminProduct from './components/admin/product/AdminProduct';
import AdminSupplier from './components/admin/supplier/AdminSupplier';
import Admin from './pages/admin/Admin';
import Login from './pages/account/Login';
import Home from './pages/home/Home';
import HeaderApp from './pages/account/HeaderApp';
import { createContext } from 'react';
import { useState } from 'react';



export const LoginContext = createContext();
function App() {

  const [loadPage, setLoadPage] = useState(0);

  const state= {
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
            <Route path="/" element={<Home />}></Route>
            <Route path="/admin" element={<Admin />} exact>
              <Route path="category" element={<AdminCategory />}></Route>
              <Route path="supplier" element={<AdminSupplier />}></Route>
              <Route path="product" element={<AdminProduct />}></Route>
            </Route>
            <Route path="/login" element={<Login/>}></Route>
          </Routes>
        </BrowserRouter>
      </LoginContext.Provider>
    </>

  );
}

export default App;
