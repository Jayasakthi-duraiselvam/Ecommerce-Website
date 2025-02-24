import { useEffect, useState } from "react";
import axios from "axios";

function useAxios(url) {
  let [products, setproducts] = useState([]);
  let [error, seterror] = useState("");
  let [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let fetchApi = async () => {
      try {
        // let response = await fetch(url);
        let response = await axios.get(url)
       setproducts(response.data);
        
        
      } catch (error) {
        seterror(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);

  return{products,error,isLoading}
}

export default useAxios;
