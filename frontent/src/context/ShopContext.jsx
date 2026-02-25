import { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_charge = 10;
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [orders, setOrders] = useState([]); // ✅ ADDED: Orders state
    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('select product size');
            return;
        }
        
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                totalCount += cartItems[itemId][size];
            }
        }
        return totalCount;
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        
        if (cartData[itemId][size] === 0) {
            delete cartData[itemId][size];
        }
        if (Object.keys(cartData[itemId]).length === 0) {
            delete cartData[itemId];
        }
        setCartItems(cartData);
    };

    const removeFromCart = (itemId, size) => {
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]?.[size] > 0) {
            cartData[itemId][size] -= 1;
            if (cartData[itemId][size] === 0) {
                delete cartData[itemId][size];
            }
            if (Object.keys(cartData[itemId]).length === 0) {
                delete cartData[itemId];
            }
        }
        setCartItems(cartData);
    };

    const getCartAmount = () => { // ✅ FIXED: Added return
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product)=>product._id===items);
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item]>0){
                        totalAmount+=itemInfo.price*cartItems[items][item];
                    }
                }catch(error){}
            }
        }
        return totalAmount; // ✅ CRITICAL FIX
    };

    // ✅ NEW: Place order function (for PlaceOrder component)
    const placeOrder = async (orderDetails) => {
        const newOrder = {
            id: 'ORD' + Date.now(),
            date: new Date().toLocaleDateString(),
            items: [],
            total: getCartAmount() + delivery_charge,
            status: 'Delivered',
            ...orderDetails
        };

        // Add to orders history
        setOrders(prev => [...prev, newOrder]);

        // Clear cart
        setCartItems({});
        
        // Save to localStorage
        localStorage.setItem('orders', JSON.stringify([...orders, newOrder]));
        
        toast.success('Order placed successfully!');
        navigate('/orders');
    };

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const value = {
        products, 
        currency, 
        delivery_charge, 
        setSearch, search, 
        showSearch, setShowSearch, 
        cartItems, setCartItems, 
        addToCart, 
        getCartCount, 
        updateQuantity, 
        removeFromCart, 
        getCartAmount,  // ✅ Now works!
        orders, setOrders,  // ✅ Orders support
        placeOrder,  // ✅ For PlaceOrder component
        navigate
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;
