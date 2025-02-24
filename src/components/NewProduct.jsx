import React, { useState } from "react";
import { Grid2, Paper, Typography, TextField, Button } from "@mui/material";
import Swal from "sweetalert2";


const NewProduct = () => {
  let paperStyle = {
    width: 400,
    margin: "20px auto",
    padding: "20px",
  };

  let [newProduct, setnewProduct] = useState({
    title: "",
    price: 500,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
    rating: {
      rate: 0,
      count: 0,
    },
  });

  let handlechange = (e) => {
    let { value, name } = e.target;
    let fieldName = name.split("rating.")[1];

    if (name.includes("rating.")) {
      setnewProduct({
        ...newProduct,
        rating: {
          ...newProduct.rating,
          [fieldName]: value,
        },
      });
    } else {
      setnewProduct({
        ...newProduct,
        [name]: value,
      });
    }
  };

  let handleAdd = (e) => {
    e.preventDefault();

    fetch("http://localhost:4000/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    }).then(() => {
      Swal.fire({
                  title: "Success",
                  text: "Data Created Successfully",
                  icon: "success",
                });
      setnewProduct({
        title: "",
        price: 500,
        description:
          "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
        category: "",
        image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
        rating: {
          rate: 0,
          count: 0,
        },
      });
    });
  };

  return (
    <Paper elevation={20} style={paperStyle}>
      <Typography
        varient="h5"
        textAlign={"center"}
        style={{ margin: "10px 0", color: "#1976d2" }}
      >
        Create New Product
      </Typography>
      <Grid2
        component="form"
        style={{ display: "grid", gap: "20px" }}
        onSubmit={handleAdd}
      >
        <TextField
          value={newProduct.title}
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
          onChange={handlechange}
        />
        <TextField
          value={newProduct.category}
          name="category"
          label="Category"
          variant="outlined"
          fullWidth
          onChange={handlechange}
        />
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <TextField
              value={newProduct.rating.rate}
              name="rating.rate"
              type="number"
              label="Rate"
              variant="outlined"
              onChange={handlechange}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              value={newProduct.rating.count}
              name="rating.count"
              type="number"
              label="Count"
              variant="outlined"
              onChange={handlechange}
            />
          </Grid2>
          <Button type="submit" variant="contained" fullWidth>
            Add
          </Button>
          
        </Grid2>
      </Grid2>
    </Paper>
  );
};

export default NewProduct;
