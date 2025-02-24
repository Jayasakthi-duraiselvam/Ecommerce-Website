import { useEffect, useState } from "react";


function useFetch(url) {
  let [products, setproducts] = useState([]);
  let [error, seterror] = useState("");
  let [isLoading, setLoading] = useState(true);

  useEffect(() => {
    let fetchApi = async () => {
      try {
        let response = await fetch(url);
        if (response.ok) {
          let data = await response.json();
          setproducts(data);
        } else {
          throw new Error("Data Not Found");
        }
      } catch (error) {
        seterror(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);

  return{products,error,isLoading,setproducts}
}

export default useFetch;
