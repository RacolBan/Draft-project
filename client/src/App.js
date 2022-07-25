import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DataProvider, GlobalState } from "./GlobalState";
import defaultLayout from "./Layout/DefaultLayout/DefaultLayout";
import Admin from "./pages/Admin/Admin";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import DetailProduct from "./pages/DetailProduct/DetailProduct";
import Cart from "./pages/Cart/Cart";
import Profile from "./pages/Profile/Profile";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Reset from "./pages/Reset/Reset";
import New from "./pages/Admin/Conponents/New/New";
import {
  userInputs,
  productInputs,
  categoryInputs,
  manufactureInputs,
} from "./pages/Admin/formInput";
import AdminLayout from "./Layout/Admin/AdminLayout";
import List from "./pages/Admin/Conponents/List/List";
import {
  columnsUsers,
  columnsProducts,
  columnsCategory,
  columnsManufacture,
} from "./pages/Admin/Conponents/Table/Columns";
import { useEffect, useState } from "react";
import axios from "axios";
import NewCategory from "./pages/Admin/Conponents/New/NewCategory";
import Category from "./pages/Category/Category";

function App() {
  const [rowsUsers, setRowsUsers] = useState([]);
  const [rowsProducts, setRowsProducts] = useState([]);
  const [rowsManufacture, setRowsManufacture] = useState([]);
  const [categoryAPI, setCategoryAPI] = useState([]);

  useEffect(() => {
    const getCategory = async () => {
      const {data} = await axios.get("http://localhost:8000/api/categories");
      setCategoryAPI(data)
    };
    getCategory();
  }, []);

  useEffect(() => {
    const getAllUsers = async () => {
      const {data} = await axios.get("http://localhost:8000/user/getAll");
      setRowsUsers(data);
    };
    getAllUsers()
    const getAllProducts = async () => {
      const {data} = await axios.get("http://localhost:8000/api/products");
      setRowsProducts( data);
    };
    getAllProducts()
    const getAllManufacture = async () => {
      const {data} = await axios.get("http://localhost:8000/api/manufacture");
      setRowsManufacture(data);
    };
    getAllManufacture()
  }, []);
  const Layout = defaultLayout;
  const LayoutAdmin = AdminLayout;
  return (
    <DataProvider>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home categoryList={categoryAPI} />
              </Layout>
            }
          />
          <Route
            path="/register"
            element={
              <Layout>
                <Register />
              </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <Login />
              </Layout>
            }
          />
          <Route
            path="/detail/:id"
            element={
              <Layout>
                <DetailProduct products = {rowsProducts}/>
              </Layout>
            }
          />
          <Route
            path="/category/:id"
            element={
              <Layout>
                <Category />
              </Layout>
            }
          />
          <Route
            path="/cart"
            element={
              <Layout>
                <Cart />
              </Layout>
            }
          />
          <Route
            path="/profile"
            element={
              <Layout>
                <Profile />
              </Layout>
            }
          />
          <Route
            path="/changepass"
            element={
              <Layout>
                <ChangePassword />
              </Layout>
            }
          />
          <Route
            path="/forgot"
            element={
              <Layout>
                <ForgotPassword />
              </Layout>
            }
          />
          <Route
            path="/reset/:tempToken"
            element={
              <Layout>
                <Reset />
              </Layout>
            }
          />
          <Route
            path="/admin"
            element={
              <LayoutAdmin>
                <Admin />
              </LayoutAdmin>
            }
          />
          <Route path="admin/users">
            <Route
              index
              element={
                <LayoutAdmin>
                  <List columns={columnsUsers} rows={rowsUsers} title="Users" />
                </LayoutAdmin>
              }
            />
            <Route
              path="new"
              element={
                <LayoutAdmin>
                  <New inputs={userInputs} title="Add New User" isFile={true} />
                </LayoutAdmin>
              }
            />
          </Route>
          <Route path="admin/products">
            <Route
              index
              element={
                <LayoutAdmin>
                  <List
                    columns={columnsProducts}
                    rows={rowsProducts}
                    title="Products"
                  />
                </LayoutAdmin>
              }
            />
            <Route
              path="new"
              element={
                <LayoutAdmin>
                  <New
                    inputs={productInputs}
                    title="Add New Product"
                    isFile={true}
                  />
                </LayoutAdmin>
              }
            />
          </Route>
          <Route path="admin/category">
            <Route
              index
              element={
                <LayoutAdmin>
                  <List
                    columns={columnsCategory}
                    rows={categoryAPI}
                    title="Category"
                  />
                </LayoutAdmin>
              }
            />
            <Route
              path="new"
              element={
                <LayoutAdmin>
                  <NewCategory
                    inputs={categoryInputs}
                    title="Add New Category"
                    isFile={false}
                  />
                </LayoutAdmin>
              }
            />
          </Route>
          <Route path="admin/manufacture">
            <Route
              index
              element={
                <LayoutAdmin>
                  <List
                    columns={columnsManufacture}
                    rows={rowsManufacture}
                    title="Manufacture"
                  />
                </LayoutAdmin>
              }
            />
            <Route
              path="new"
              element={
                <LayoutAdmin>
                  <New
                    inputs={manufactureInputs}
                    title="Add New Manufacture"
                    isFile={false}
                  />
                </LayoutAdmin>
              }
            />
          </Route>
        </Routes>
      </Router>
    </DataProvider>
  );
}

export default App;
