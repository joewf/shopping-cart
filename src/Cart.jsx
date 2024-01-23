import React, { useEffect, useState } from "react";
import { Link, useLocation } from 'react-router-dom';
import NavigationBar from "./Navigation";
import SocialMedia from "./SocialMedia";

export default function ShoppingCart() {
    const [products, setProducts] = useState([]);
    const [quantity, setQuantity] = useState(0);
    const [cart, setCart] = useState({});
    const [total, setTotal] = useState(0);
    const location = useLocation();
    const shoppingList = location.state.shoppingList || {};
    const cartQuantity = location.state.cartQuantity || 0;
    // console.log("CART ", shoppingList);
    // console.log("CART ", cartQuantity);


    /* Get all the products in the cart */
    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedProducts = [];
                for (let id in shoppingList) {
                    // console.log('ID', id);
                    const response = await fetch(`https://fakestoreapi.com/products/${id}`)
                    const productData = await response.json();
                    // console.log('DATA', productData);
                    const modifiedProduct = { ...productData, quantity: shoppingList[id] }
                    fetchedProducts.push(modifiedProduct);
                }
                setProducts(fetchedProducts);
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    /* Update the total number of items after clicking plus/minus */
    useEffect(() => {
        // console.log("P ", products);
        let updateTotalProducts = 0;
        for (let p of products) {
            updateTotalProducts += p.quantity;
        }
        setQuantity(updateTotalProducts);
    }, [products]);

    useEffect(() => {
        for (let p of products) {
            // console.log('TESTING', p);
            setCart((prevCart) => ({
                ...prevCart,
                [p.id]: p.quantity
            }));
        }
        // console.log('UPDATED CART ', cart);
    }, [products]);

    // Updates the quantity of each product and calls calculateTotal
    useEffect(() => {
        let updateTotalProducts = 0;
        for (let p of products) {
            updateTotalProducts += p.quantity;
        }
        setQuantity(updateTotalProducts);
        setTotal(calculateTotal());
    }, [products]);

    // Calculate total cost of all items
    const calculateTotal = () => {
        return products.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2);
    };

    /* Get the quantity of a product */
    const handleEachProductQuantity = (id) => {
        if (products[id]) {
            return products[id].quantity
        }
    }

    const handleMinus = (id) => {
        const updateQuantity = [...products];
        if (updateQuantity[id].quantity > 1) {
            updateQuantity[id].quantity -= 1
            setProducts(updateQuantity);
        }
    }

    const handlePlus = (id) => {
        const updateQuantity = [...products];
        updateQuantity[id].quantity += 1;
        setProducts(updateQuantity);
    }

    const removeItem = (id, ID) => {
        // console.log('ID ', id);
        const updateProducts = [...products];
        const filteredProducts = updateProducts.filter((product, index) => index != id);
        // console.log('UPDATED ', filteredProducts);
        setProducts(filteredProducts);
        const updateCart = { ...cart };
        delete updateCart[ID];
        // console.log('FILTERED CART ', updateCart);
        setCart(updateCart);
    }


    if (products.length === 0) {
        return (
            <>
                <NavigationBar cartQuantity={quantity} shoppingList={cart} />
                <div className="w-full h-full flex justify-center items-center">
                    <div className="w-1/4 h-1/2 bg-white p-10 text-center mx-auto my-auto rounded-md">
                        <h1 className="text-black bg-white mb-8 font-bold">Your cart is empty</h1>
                        <Link to={"/products"} className="bg-white">
                            <button className=" bg-blue-600 p-2 font-bold text-xs w-36 rounded-2xl">SHOP NOW</button>
                        </Link>
                    </div>
                </div>
            </>
        )
    }

    // console.log('PRODUCTS ', products);
    return (
        <div className="main-content">
            <NavigationBar cartQuantity={quantity} shoppingList={cart} />
            <div className="w-full h-full flex justify-center items-center">
                <div className="w-1/3 bg-white p-10 rounded-md">
                    {products.map((product, productID) => (
                        <div key={productID} className="w-full h-full mb-4 bg-white">
                            <div className="bg-white flex">
                                <img
                                    className="max-w-16 max-h-20 object-contain bg-white"
                                    src={product.image} alt={product.title}
                                />
                                <div className="bg-white flex w-full h-full">
                                    <p className="bg-white text-black px-4 my-auto w-full ">
                                        {product.title}
                                        <p className="bg-white text-red-500 font-bold">${product.price}</p>
                                    </p>
                                </div>
                                <div className=" flex flex-col w-full h-16 bg-white items-end justify-around">
                                    <div>
                                        <p className="bg-white w-full text-lg text-blue-600 font-bold">${(product.price * product.quantity).toFixed(2)}</p>
                                    </div>
                                    <div className="flex justify-end w-52 bg-white">
                                        <p onClick={() => removeItem(productID, product.id)} className="bg-white text-black mr-8 underline text-xs mt-auto hover:cursor-pointer">Remove</p>
                                        <div className="border-2 border-gray-200 bg-white w-24 max-h-8 p-1 flex justify-between">
                                            <button onClick={() => handleMinus(productID)} className="bg-white text-gray-300 w-6 font-bold border-r-2 text-center">-</button>
                                            <span className="bg-white text-black font-bold">{handleEachProductQuantity(productID)}</span>
                                            <button onClick={() => handlePlus(productID)} className="bg-white text-gray-300 w-6 font-bold border-l-2 text-center ">+</button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <hr className=" h-px bg-gray-200 border-0 my-8" />
                        </div>
                    ))}
                    <div className=" bg-white">
                        <div className="flex font-bold w-full bg-white text-lg justify-between mb-10">
                            <p className="bg-white text-black mr-8">Estimated total</p>
                            <p className="bg-white text-blue-500"> ${total}</p>
                        </div>
                        <div className=" flex justify-center bg-white">
                            <Link to={{ pathname: "/home" }} className="bg-white">
                                <button className=" bg-blue-600 p-2 font-bold text-xs w-72 rounded-2xl">CONTINUE TO CHECKOUT</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <SocialMedia />
        </div>
    );
}
