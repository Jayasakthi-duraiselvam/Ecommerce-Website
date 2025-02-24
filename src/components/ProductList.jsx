import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { LifeLine, ThreeDot } from "react-loading-indicators";
import useFetch from "./custom-hook/useFetch";
import axios from "axios";
import useAxios from "./custom-hook/useAxios";
import { TiShoppingCart } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { MdCreateNewFolder } from "react-icons/md";
import { useDispatch,useSelector } from "react-redux";
import { addItem } from "../components/store/cartSlice";

const ProductList = () => {
  // let [products, setproducts] = useState([]);
  // let [error, seterror] = useState("");
  // let [isLoading, setLoading] = useState(true);

  // useEffect(() => {
  //   fetch("http://localhost:4000/products", { method: "GET" })
  //     .then((response) => {
  //       if(response.ok){
  //       return response.json();

  //       }else{
  //         throw new Error("Search Proper Data !")
  //       }

  //     })
  //     .then((data) => {
  //       setproducts(data);
  //     })
  //     .catch((error) => {
  //       seterror(error.message);
  //     })
  //     .finally(()=>{
  //       setLoading(false);
  //     })
  // }, []);

  // let {products,error,isLoading} = useAxios("http://localhost:4000/products")

  let navigate = useNavigate();
  let { products, error, isLoading, setproducts } = useFetch(
    "https://fakestoreapi.com/products"
  );

  let handleDelete = (id) => {
    axios.delete(`https://fakestoreapi.com/products/${id}`).then(() => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success",
          });
        }
      });
      let newProductList = products.filter((product) => product.id !== id);
      setproducts(newProductList);
    });
  };
  let dispatch = useDispatch();
  let CartState=useSelector((state)=>{return state.cart})
  let addItemCart = (product) => {
    let checkProduct=CartState.some(CartProduct=>CartProduct.id===product.id)
    if(!checkProduct){
      dispatch(addItem(product));
      Swal.fire({
        title: "Success",
        text: "Product Added Successfully",
        icon: "success",
      });
    }else{
      Swal.fire({
        title: "Oops!",
        text: "Product Already Added",
        icon: "error",
        footer:"<p>Add Some Other Product</p>"
      });
    }
  };

  if (isLoading) {
    return (
      <div>
        <center>
          <ThreeDot
            color="grey"
            size="large"
            text="Loading"
            textColor="black"
          />
        </center>
      </div>
    );
  } else {
    return (
      <div>
        <article>
          <span>To create New Product</span>
          <Button
            onClick={() => {
              navigate("/newProduct");
            }}
          >
            Click me
          </Button>
        </article>
        <h1>ProductList</h1>
        {products.length !== 0 && (
          <section className="products">
            {products.map((product) => (
              <Card
                key={product.id}
                style={{ width: "18rem" }}
                className="product"
              >
                <center>
                  <Card.Img
                    variant="top"
                    src={product.image}
                    style={{ width: "9rem", height: "12rem" }}
                  />
                </center>
                <Card.Body>
                  <Card.Title>{product.title}</Card.Title>
                  {/* <Card.Text style={{ overflow: "scroll", height: "200px" }}>
                  {product.description}
                </Card.Text> */}
                  <Card.Text>${product.price}</Card.Text>
                </Card.Body>
                <Card.Footer
                  style={{
                    display: "flex",
                    justifyContent: "space-evenly",
                    alignItems: "center",
                  }}
                >
                  <Button
                    variant="primary"
                    onClick={() => addItemCart(product)}
                  >
                    <TiShoppingCart />
                    Cart
                  </Button>
                  <Button
                    variant="secondary"
                    onClick={() => {
                      navigate(`/update/${product.id}`);
                    }}
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      handleDelete(product.id);
                    }}
                  >
                    <MdDelete />
                  </Button>
                </Card.Footer>
              </Card>
            ))}
          </section>
        )}
        {error && <p>{error}</p>}
      </div>
    );
  }
};

export default ProductList;
