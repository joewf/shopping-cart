import NavigationBar from "./Navigation"
import SocialMedia from "./SocialMedia"
import { useLocation } from "react-router-dom"

const About = () => {

    const location = useLocation();
    const shoppingList = (location.state && location.state.shoppingList) || {};
    const quantity = (location.state && location.state.cartQuantity) || 0;
    // console.log("ABOUT Q", quantity);
    // console.log("ABOUT ", shoppingList);

    return (
        <>
            <div className="main-content">
                <NavigationBar cartQuantity={quantity} shoppingList={shoppingList} />
                <div className="about text-left mx-auto w-1/3">
                    <div className="div-in-about">
                        <h1 className="title-in-about">Welcome to FictionalStore - Your Ultimate Shopping Destination!</h1>
                        <p>At FictionalStore, we've got all your shopping needs covered with a wide array of products: </p>
                    </div>
                    <div className="div-in-about">
                        <h2 className="title-in-about">Discover the Latest Gadgets</h2>
                        <p>Explore our Electronics Section for the latest gadgets, from smartphones to smart home devices. Stay connected and entertained with our cutting-edge tech collection.</p>
                    </div>
                    <div className="div-in-about">
                        <h2 className="title-in-about">Elegant Jewelry for Every Occasion</h2>
                        <p>Step into our Jewelry Corner and find the perfect piece for any outfit. From timeless classics to trendy accessories, our collection has something for every style.</p>
                    </div>
                    <div className="div-in-about">
                        <h2 className="title-in-about">Fashion Finds for Him</h2>
                        <p>Explore our Men's Fashion Boulevard for a variety of styles, from everyday essentials to sharp suits. Dressing well has never been easier!</p>
                    </div>
                    <div className="div-in-about">
                        <h2 className="title-in-about">Trendy Women's Fashion</h2>
                        <p>Indulge in the latest fashion trends in our Women's Fashion Wonderland. From chic dresses to comfortable activewear, we have something to suit every taste.</p>
                    </div>
                    <div className="div-in-about">
                        <h2 className="title-in-about">Shopping Assurance</h2>
                        <p>Shop with confidence at FictionalStore. We prioritize reliability and offer a seamless shopping experience, making us your go-to online marketplace.</p>
                    </div >
                </div>
                <SocialMedia />
            </div>

        </>
    )
}

export default About