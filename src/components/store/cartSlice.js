import {createSlice} from  "@reduxjs/toolkit";

let datafromweb=JSON.parse(localStorage.getItem("cart"));
// console.log(datafromweb);


const cartSlice =createSlice({
    name:"cart",
    initialState:datafromweb,
    reducers:{
        addItem(state,action){
            state.push(action.payload)
            localStorage.setItem("cart",JSON.stringify([...state]))
        },
        removeItem(state,action){
            let itemId=action.payload;
            let newProducts=state.filter(cartProduct=>cartProduct.id!==itemId)
            localStorage.setItem("cart",JSON.stringify([...newProducts]))
            return newProducts
        }
    }
})

export default cartSlice.reducer

export let {addItem,removeItem}=cartSlice.actions