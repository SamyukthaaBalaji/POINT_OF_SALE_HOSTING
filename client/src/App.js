import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import { AuthProvider } from "./AuthContext";

import Login from "./Component/Login/Login";
import SignUp from "./Component/SignUp/SignUp";
import DashBoard from "./Component/Dash/DashBoard";
import Home from "./Component/Home/Home";
import Cart from "./Component/Cart/Cart";
import Products from "./Component/Products/Products";
import "./App.css";
import SideBar from "./Component/Sidebar/Sidebar";
import FileUpload from "./Component/FileUpload/FileUpload";
import { ProductsProvider } from "./ProductContext";

import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <AuthProvider>
      <ProductsProvider>
        <Router>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route element={<LayoutWithSidebar />}>
              <Route path="/dashboard" element={<DashBoard />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/shop" element={<Products />} />
              <Route path="/file" element={<FileUpload />} />
            </Route>
          </Routes>
        </Router>
      </ProductsProvider>
    </AuthProvider>
  );
}

function LayoutWithSidebar() {
  return (
    <div className="app-container">
      <SideBar className="sidebar-container" />
      <div className="main-container">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
