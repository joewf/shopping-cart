import '@fortawesome/fontawesome-free/css/all.css';
import { Link } from 'react-router-dom';
import React, { createContext, useEffect, useState } from 'react';


const NavigationBar = ({ cartQuantity, shoppingList }) => {

    // console.log("NAVIGATION: ", shoppingList);
    // console.log("NAVIGATION QUANTITY ", cartQuantity);
    return (
        <>
            <nav className='navbar' >
                <div className='navigation-bar flex mx-40 my-10 items-center' >
                    <h1 className='homepage-title text-3xl font-bold '>FictionalStore</h1>
                    <div className='w-full flex items-center justify-between font-semibold'>
                        <ul className='nav-list flex w-1/6 justify-evenly'>
                            <li>
                                <Link to={{ pathname: "/home" }} state={{ shoppingList, cartQuantity }} className='hover:text-hover-blue'>Home</Link>
                            </li>
                            <li>
                                <Link to={{ pathname: "/products" }} state={{ shoppingList, cartQuantity }} className='hover:text-hover-blue'>Products</Link>
                            </li>
                            <li>
                                <Link to={{ pathname: "/about" }} state={{ shoppingList, cartQuantity }} className='hover:text-hover-blue' >About</Link>
                            </li>
                        </ul>
                        <div>
                            <Link to={{ pathname: "/cart" }} state={{ shoppingList, cartQuantity }}>
                                <i className="fa-solid fa-cart-shopping text-lg mr-1 hover:text-hover-blue"></i>
                            </Link>
                            {cartQuantity > 0 && <span>{cartQuantity}</span>}
                        </div>

                    </div>
                </div>
            </nav>
        </>


    )
}

export default NavigationBar