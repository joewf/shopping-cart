import { Link, useLocation, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import StarRating from "./StarRating";
import NavigationBar from "./Navigation";
import SocialMedia from "./SocialMedia";

export default function ProductDetails() {

    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [cartQuantity, setCartQuantity] = useState(0);
    // console.log(id);
    const [cart, setCart] = useState({});
    const [addedToCart, setAddedToCart] = useState(false);
    const location = useLocation();
    const totalItems = location.state.quantity || 0;
    const shoppingList = location.state.shoppingList || {};
    console.log("PRODUCT DETAIL ", shoppingList);
    console.log("PRODUCT DETAIL Q", totalItems);

    // Fetch and display a specific product
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                const data = await response.json();
                setProduct(data);
                // console.log("P ", product);
            } catch (error) {
                console.error("Error: ", error);
            }
        };
        fetchProduct();
    }, [id])

    useEffect(() => {
        // Initialize cart with values from shoppingList once on component mount
        setCart(shoppingList);
    }, [shoppingList]);

    // Get the total items in from the cart
    useEffect(() => {
        let t = 0;
        for (let id in cart) {
            if (typeof cart[id] === 'number') {
                t += cart[id];
            }
        }
        setCartQuantity(t)
        // console.log("TOTAL ", cartQuantity)
    }, [cart])

    if (!product) {
        return <p>Loading...</p>;
    }

    const handlePlus = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    }

    const handleMinus = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    }

    const addToCart = (id, quantity) => {
        setCart(prevCart => ({
            ...prevCart,
            [id]: quantity
        }));
        // console.log("ALL CART ", cart);
        setAddedToCart(true);
    }

    // Allow the user to add more items to the cart
    const handleCart = () => {
        setAddedToCart(false);
    }

    return (
        <div className="main-content">
            <NavigationBar
                shoppingList={cart}
                cartQuantity={cartQuantity}
            />
            <div>
                <div className="w-full h-full flex justify-center items-center ">
                    <div className="w-1/2 h-full bg-white px-2 py-1 rounded-t-md">
                        <Link
                            to={{ pathname: "/home" }} state={{ cart, cartQuantity }}
                            className="bg-white text-black underline">Home</Link>
                        <span className="bg-white text-black ">{" / "}</span>
                        <Link
                            to={{ pathname: "/products" }} state={{ cart, cartQuantity }}
                            className="bg-white text-black underline">Products</Link>
                        <span className="bg-white text-black">{" / "}</span>
                        <span className="bg-white text-black">{product.title}</span>
                    </div>
                </div>
                <div className="w-full h-full flex justify-center items-center">
                    <div className="py-36 p-80 w-1/2 h-full bg-white flex justify-around gap-16 rounded-b-md">
                        <img src={product.image} alt={product.title} className="w-full h-full max-w-screen-lg max-h-screen" />
                        <div className="bg-white w-full min-w-80 p-2 space-y-4">
                            <p className="text-black bg-inherit font-bold text-xl">{product.title}</p>
                            <StarRating initialRating={product.rating} />
                            <p className="text-red-500 bg-inherit font-bold ml-0.5 text-2xl">${product.price}</p>
                            {addedToCart ? (
                                <button onClick={() => handleCart()} className=" bg-blue-600 p-2 font-bold text-xs w-36 rounded-2xl">{quantity} ADDED</button>
                            ) : (
                                <p className="bg-white w- flex gap-2">
                                    <div className="border-2 border-gray-200 bg-white w-24 p-1 flex justify-between">
                                        <button onClick={() => handleMinus()} className="bg-white text-gray-300 w-6 font-bold border-r-2 text-center">-</button>
                                        <span className="bg-white text-black font-bold">{quantity}</span>
                                        <button onClick={() => handlePlus()} className="bg-white text-gray-300 w-6 font-bold border-l-2 text-center ">+</button>
                                    </div>
                                    <button onClick={() => addToCart(product.id, quantity)} className=" bg-blue-600 p-2 font-bold text-xs w-36 rounded-2xl">ADD TO CART</button>
                                </p>
                            )}
                            <p className="bg-white text-black font-bold">Product detail</p>
                            <p className="bg-white text-black ">{product.description}</p>
                        </div>
                    </div>
                </div>

            </div>
            <SocialMedia />
        </div>

    )
}

