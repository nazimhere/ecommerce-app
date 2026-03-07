import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_charge = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [orders, setOrders] = useState([]);
    const [token, setToken] = useState('');
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

    const getCartAmount = () => {
        let totalAmount = 0;
        for(const items in cartItems){
            let itemInfo = products.find((product) => product._id === items);
            for(const item in cartItems[items]){
                try{
                    if(cartItems[items][item] > 0){
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch(error){}
            }
        }
        return totalAmount;
    };

    const getProductsData = async () => {
        try{
            const response = await axios.get(backendUrl + '/api/product/list')
            if(response.data.success){
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch(error){
            toast.error(error.message)
        }
    }

    const placeOrder = async (orderDetails) => {
        const newOrder = {
            id: 'ORD' + Date.now(),
            date: new Date().toLocaleDateString(),
            items: [],
            total: getCartAmount() + delivery_charge,
            status: 'Delivered',
            ...orderDetails
        };
        setOrders(prev => [...prev, newOrder]);
        setCartItems({});
        localStorage.setItem('orders', JSON.stringify([...orders, newOrder]));
        toast.success('Order placed successfully!');
        navigate('/orders');
    };

    const logout = () => {
        setToken('')
        localStorage.removeItem('token')
        setCartItems({})
        navigate('/login')
    }

    // ── Effects ──────────────────────────────────────────────

    useEffect(() => {
        getProductsData()
    }, [])

    // ✅ Load token from localStorage on app start
    useEffect(() => {
        if(!token && localStorage.getItem('token')){
            setToken(localStorage.getItem('token'))  // ✅ fixed typo: was 'item'
        }
    }, [])

    // ✅ Save token to localStorage whenever it changes
    useEffect(() => {
        if(token){
            localStorage.setItem('token', token)
        }
    }, [token])

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
        getCartAmount,
        orders, setOrders,
        placeOrder,
        navigate,
        backendUrl,
        token, setToken,
        logout
    };

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    );
};

export default ShopContextProvider;