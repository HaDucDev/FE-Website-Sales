import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Admin from './pages/admin/Admin';
import Home from './pages/home/Home';

function App() {
  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>}></Route>
            <Route path="/admin" element={<Admin/>}></Route>
          </Routes>
      </BrowserRouter>
      
    </>

  );
}

export default App;
