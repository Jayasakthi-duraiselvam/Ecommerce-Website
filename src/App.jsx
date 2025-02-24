import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import TodoApp from "./components/TodoApp";
import Products from "./components/Products";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import NotFound from "./components/NotFound";
import NewProduct from "./components/NewProduct";
import UpdateProduct from "./components/UpdateProduct";
import Wishlist from "./components/Wishlist";

if(!localStorage.getItem("cart")){
  localStorage.setItem("cart",JSON.stringify([]))

}

// let datafromweb=JSON.parse(localStorage.getItem("cart"))
// console.log(datafromweb);
// localStorage.removeItem("cart")



function App() {
  let user = "kevin";
  return (
    <div className="app">
      <Router>
        <NavBar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />}>
            <Route index element={<ProductList />}/>
            <Route path="list" element={<ProductList />} />
            <Route path="details" element={<ProductDetails />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/todo" element={<TodoApp />} />
          <Route path="/newProduct" element={<NewProduct/>}/>
          <Route path="/update/:id" element={<UpdateProduct/>}/>
          <Route path="/wishlist" element={<Wishlist/>}/>
          <Route path="*" element={<NotFound/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
