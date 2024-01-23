import { useState, useEffect } from "react"

const FetchProducts = () => {
    // const [bestRatings, setBestRatings] = useState([]);
    const [category, setCategory] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const fetchProduct = async () => {
        try {
            const response = await fetch('https://fakestoreapi.com/products', { mode: "cors" });
            if (!response.ok) {
                throw new Error('server error');
            }
            const data = await response.json();
            setCategory(data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProduct();
    }, []);

    // console.log(category)

    return { category, error, loading };

}

export default FetchProducts;