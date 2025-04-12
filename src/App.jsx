import React from 'react'
import AdminLayout from './layout/adminLayout'
import { Route, Routes } from 'react-router'
import Dashboard from './pages/Dashboard/Dashboard'
import Banner from './pages/Banner/Banner'
import Category from './pages/Category/Category'
import SubCategory from './pages/SubCategory/SubCategory'
import Vendor from './pages/Vendor/Vendor'
import VendorDetails from './pages/Vendor/components/VendorDetails'
import VendorProducts from './pages/Vendor/components/VendorProducts'
import User from './pages/User/User'
import Settings from './pages/Settings/Settings'
import FoodProduct from './pages/Food-Product/FoodProduct'
import GroceryProduct from './pages/Grocery-Product/GroceryProduct'
import Login from './pages/Auth/Login'
import PrivateRoute from './components/PrivateRoute'
import ProductDetails from './pages/Products/ProductDetails'

function App() {
  return (
    <>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/' element={<PrivateRoute> <AdminLayout /> </PrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path='/banner' element={<Banner />} />
          <Route path='/product/:serviceName' element={<FoodProduct />} />
          <Route path='/grocery-product' element={<GroceryProduct />} />
          <Route path='/category' element={<Category />} />
          <Route path='/sub-category' element={<SubCategory />} />
          <Route path='/vendor' element={<Vendor />} />
          <Route path='/vendor/:id' element={<VendorDetails />} />
          <Route path='/vendor/:vendorSlug/products' element={<VendorProducts />} />
          <Route path='/products/:produtSlug' element={<ProductDetails />} />
          <Route path='/user' element={<User />} />
          <Route path='/settings' element={<Settings />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
