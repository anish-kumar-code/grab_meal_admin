import React from 'react'
import AdminLayout from './layout/adminLayout'
import { Route, Routes } from 'react-router'
// landing page
import LandingPage from './pages/web/Home/Home'

// admin
import Dashboard from './pages/admin/Dashboard/Dashboard'
import Banner from './pages/admin/Banner/Banner'
import Category from './pages/admin/Category/Category'
import SubCategory from './pages/admin/SubCategory/SubCategory'
import Vendor from './pages/admin/Vendor/Vendor'
import VendorDetails from './pages/admin/Vendor/components/VendorDetails'
import VendorProducts from './pages/admin/Vendor/components/VendorProducts'
import User from './pages/admin/User/User'
import Settings from './pages/admin/Settings/Settings'
import FoodProduct from './pages/admin/Food-Product/FoodProduct'
import GroceryProduct from './pages/admin/Grocery-Product/GroceryProduct'
import Login from './pages/admin/Auth/Login'
import AdminPrivateRoute from './components/AdminPrivateRoute'
import ProductDetails from './pages/admin/Products/ProductDetails'

// vendor
import VendorPrivateRoute from './components/VendorPrivateRoute';
import VendorLayout from './layout/vendorLayout'
import VendorLogin from './pages/vendor/auth/Login'
import VendorRegister from './pages/vendor/auth/Register'
import VendorDashboard from './pages/vendor/Dashboard/Dashboard'
import Shop from './pages/vendor/Shop/Shop'
import VendorSettings from './pages/vendor/Settings/Settings'
import VendorProfile from './pages/vendor/Profile/Profile'
import VendorAddShop from './pages/vendor/Shop/components/AddShop'

function App() {
  return (
    <>
      <Routes>
        <Route index element={<LandingPage />} />
        {/* admin route */}
        <Route path='/admin/login' element={<Login />} />
        <Route path='/admin' element={<AdminPrivateRoute> <AdminLayout /> </AdminPrivateRoute>}>
          <Route index element={<Dashboard />} />
          <Route path='banner' element={<Banner />} />
          <Route path='product/:serviceName' element={<FoodProduct />} />
          <Route path='grocery-product' element={<GroceryProduct />} />
          <Route path='category' element={<Category />} />
          <Route path='sub-category' element={<SubCategory />} />
          <Route path='vendor' element={<Vendor />} />
          <Route path='vendor/:id' element={<VendorDetails />} />
          <Route path='vendor/:vendorSlug/products' element={<VendorProducts />} />
          <Route path='products/:produtSlug' element={<ProductDetails />} />
          <Route path='user' element={<User />} />
          <Route path='settings' element={<Settings />} />
        </Route>
        {/* vendor route */}
        <Route path='/vendor/login' element={<VendorLogin />} />
        <Route path='/vendor/register' element={<VendorRegister />} />
        <Route path='/vendor/addShop' element={<VendorAddShop />} />
        <Route path='/vendor' element={<VendorPrivateRoute><VendorLayout /></VendorPrivateRoute>}>
          <Route index element={<VendorDashboard />} />
          <Route path='shop' element={<Shop />} />
          <Route path='profile' element={<VendorProfile />} />
          <Route path='settings' element={<VendorSettings />} />
        </Route>
        <Route path='*' element={<LandingPage />} />
      </Routes>
    </>
  )
}

export default App
