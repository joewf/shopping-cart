import { useEffect, useState } from "react";
import FetchProducts from "./FetchProducts";
import Error from "./Error";
import NavigationBar from "./Navigation";
import SocialMedia from "./SocialMedia";
import StarRating from "./StarRating";
import ShoppingCart from "./Cart";
import ProductDetails from "./ProductDetails";
import { Link, useLocation } from "react-router-dom";


export default function Products() {

    const { category, error, loading } = FetchProducts();
    const [value, setValue] = useState('all');
    const [filteredCategory, setFilteredCategory] = useState("");
    const [categoryLength, setCategoryLength] = useState(0);
    const location = useLocation();
    const shoppingList =
        (location.state && location.state.shoppingList)
        || (location.state && location.state.cart)
        || {};
    const quantity = (location.state && location.state.cartQuantity) || 0;

    useEffect(() => {
        setFilteredCategory(category);
        // Get the number of items for a single category
        if (category.length) {
            const filteredProductsLength = filteredCategory.filter((product) => product.category === value).length;
            // console.log("TEMP ", filteredProductsLength);
            setCategoryLength(filteredProductsLength);
        }
        // Get the number of items for all category
        if (value === "all") {
            setCategoryLength(category.length);
        }

    }, [category, value])

    useEffect(() => {
        if (error) {
            console.log(error);
        }
    }, [error])

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return (
            <>
                <Error />
                <p>{error}</p>
            </>
        )
    }

    // Set the filter value i.e. men, women, ...
    const handleValue = (e) => {
        setValue(e.target.value)
    }

    // Sort the all displayed products
    const handleSort = (e) => {
        const sortType = e.target.value;

        if (sortType === "low") {
            const lowToHigh = [...category].sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
            // console.log("LOW ", lowToHigh);
            setFilteredCategory(lowToHigh);
        } else if (sortType === "high") {
            const highToLow = [...category].sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
            setFilteredCategory(highToLow);
        } else if (sortType === "rating") {
            const bestRated = [...category].sort((a, b) => parseFloat(b.rating.rate) - parseFloat(a.rating.rate));
            setFilteredCategory(bestRated);
        } else {
            // console.log("CATEGORY ", category);
            setFilteredCategory([...category]);
        }
    }

    console.log(value);
    return (
        <div className="main-content">
            <NavigationBar shoppingList={shoppingList} cartQuantity={quantity} />
            <div className="flex justify-center ">
                <div className="w-3/4">
                    {/* Set value for category */}
                    <div className="bg-white flex py-4 px-4 font-bold justify-between rounded-t-md">
                        <div className="flex bg-white">
                            <select onChange={handleValue} className="bg-white text-black text-lg mr-8 border-2 border-gray-300 hover:border-black">
                                <option value="all">All Products</option>
                                <option value="men's clothing">Men's clothing</option>
                                <option value="women's clothing">Women's clothing</option>
                                <option value="electronics">Electronics</option>
                                <option value="jewelery">Jewelery</option>
                            </select>
                            <p className="bg-white text-black ">{categoryLength} RESULTS</p>
                        </div>
                        <div> {/*Sort all items or single category*/}
                            <select onChange={handleSort} className="bg-white text-black text-lg border-2 border-gray-300 hover:border-black">
                                <option value="best">Best Match</option>
                                <option value="low">Price Low-High</option>
                                <option value="high">Price High-Low</option>
                                <option value="rating">Best Rated</option>
                            </select>
                        </div>
                    </div>

                </div>
            </div>
            {value === "all" ? ( // Shows all products
                <div className="flex justify-center ">
                    <div className="flex flex-wrap w-3/4 bg-white rounded-b-md">
                        {filteredCategory.map((product) => (
                            <div key={product.id} className="w-1/3 p-4 bg-white rounded-b-md">
                                <div className="flex justify-center items-center bg-white">
                                    <img
                                        src={product.image}
                                        alt={product.title}
                                        className="w-48 h-80 object-contain bg-white hover:scale-105 transition-transform cursor-pointer mb-1" />
                                </div>
                                <div className="text-left bg-white ">
                                    <Link
                                        to={{ pathname: `/products/${product.id}` }} state={{ quantity, shoppingList }}
                                        className=" bg-white text-black p-1 hover:underline">{product.title}</Link>
                                    <StarRating initialRating={product.rating} />
                                    <p className="bg-white text-red-500 font-bold p-1 text-lg">${product.price}</p>

                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : value !== "all" ? ( // Filters products by a single category
                <div className="flex justify-center">
                    <div className="flex flex-wrap w-3/4 bg-white rounded-b-md">
                        {filteredCategory.filter((product) => product.category === value).map((filteredProduct) => (
                            <div key={filteredProduct.id} className="w-1/3 p-4 bg-white rounded-b-md">
                                <div className="flex justify-center items-center bg-white">
                                    <img
                                        src={filteredProduct.image}
                                        alt={filteredProduct.title}
                                        className="w-48 h-80 object-contain bg-white hover:scale-105 transition-transform cursor-pointer mb-1" />
                                </div>
                                <div className="text-left bg-white">
                                    <Link
                                        to={{ pathname: `/products/${filteredProduct.id}` }} state={{ quantity, shoppingList }}
                                        className=" bg-white text-black p-1 hover:underline">{filteredProduct.title}</Link>
                                    <StarRating initialRating={filteredProduct.rating} />
                                    <p className="bg-white text-red-500 font-bold p-1 text-lg">${filteredProduct.price}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : null}
            <SocialMedia />
        </div>
    )
}
