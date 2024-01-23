import { useState } from "react"
import NavigationBar from "./Navigation"
// import BestSellers from "./FetchProducts"
import SocialMedia from "./SocialMedia"
import { useLocation } from "react-router-dom";

export default function Home() {

    const location = useLocation();
    const shoppingList =
        (location.state && location.state.shoppingList)
        || (location.state && location.state.cart)
        || {};
    const quantity = (location.state && location.state.cartQuantity) || 0;
    // console.log("HOME ", shoppingList);
    // console.log("HOME Q", quantity);

    return (
        <>
            <div className="main-content">
                <NavigationBar shoppingList={shoppingList} cartQuantity={quantity} />
                <p className="w-1/3 text-center relative left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <span className="font-semibold">Welcome to our store, </span>
                    explore a wide range of stylish men and women's clothing,
                    elegant jewelry, and cutting-edge electronics.
                    Discover fashion and tech that suit your style and needs.
                    Happy shopping!
                </p>
                <SocialMedia />
            </div>

        </>

    )
}