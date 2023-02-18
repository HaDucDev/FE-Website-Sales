import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AdminCategory from './components/admin/category/AdminCategory';
import AdminProduct from './components/admin/product/AdminProduct';
import AdminSupplier from './components/admin/supplier/AdminSupplier';
import Admin from './pages/admin/Admin';
import Login from './pages/account/Login';
import Home from './pages/home/Home';

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/admin" element={<Admin/>}>
                <Route path="category" element={<AdminCategory/>}></Route>
                <Route path="supplier" element={<AdminSupplier/>}></Route>
                <Route path="product" element={<AdminProduct/>}></Route>
            </Route>
            <Route path="/login" element={<Login/>}></Route>
          </Routes>
      </BrowserRouter>
      
    </>

  );
}

export default App;
