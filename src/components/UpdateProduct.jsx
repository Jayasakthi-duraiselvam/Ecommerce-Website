import React, { useEffect, useState } from "react";
import { Grid2, Paper, Typography, TextField, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";


const UpdateProduct = () => {
  let paperStyle = {
    width: 400,
    margin: "20px auto",
    padding: "20px",
  };

  let [updateProduct, setupdateProduct] = useState(null);

  let {id}=useParams();
  let navigate=useNavigate();

  useEffect(()=>{
    axios.get(`http://localhost:4000/products/${id}`)
    .then((res)=>{
      setupdateProduct(res.data)
    })
  },[])

  
  let handlechange = (e) => {
    let { value, name } = e.target;
    let fieldName = name.split("rating.")[1];

    if (name.includes("rating.")) {
      setupdateProduct({
        ...updateProduct,
        rating: {
          ...updateProduct.rating,
          [fieldName]: value,
        },
      });
    } else {
      setupdateProduct({
        ...updateProduct,
        [name]: value,
      });
    }
  };

  let handleUpdate = (e) => {
    e.preventDefault();

    fetch(`http://localhost:4000/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateProduct),
    }).then(() => {
      Swal.fire({
                  title: "Sent Data!",
                  text: "Data Updated Successfully. ",
                  icon: "success",
                });
      navigate("/products")
    });
  };
if(updateProduct!==null){
  return (
    <Paper elevation={20} style={paperStyle}>
      <Typography
        varient="h5"
        textAlign={"center"}
        style={{ margin: "10px 0", color: "green" }}
      >
        Update Product
      </Typography>
      <Grid2
        component="form"
        style={{ display: "grid", gap: "20px" }}
        onSubmit={handleUpdate}
      >
        <TextField
          value={updateProduct.title}
          name="title"
          label="Title"
          variant="outlined"
          fullWidth
          onChange={handlechange}
        />
        <TextField
          value={updateProduct.category}
          name="category"
          label="Category"
          variant="outlined"
          fullWidth
          onChange={handlechange}
        />
        <Grid2 container spacing={2}>
          <Grid2 size={6}>
            <TextField
              value={updateProduct.rating.rate}
              name="rating.rate"
              type="number"
              label="Rate"
              variant="outlined"
              onChange={handlechange}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              value={updateProduct.rating.count}
              name="rating.count"
              type="number"
              label="Count"
              variant="outlined"
              onChange={handlechange}
            />
          </Grid2>
          <Button type="submit" variant="contained" color="success" fullWidth>
            Save
          </Button>
        </Grid2>
      </Grid2>
    </Paper>
  );
}else{
  <div>Loading...</div>
}
};

export default UpdateProduct;
