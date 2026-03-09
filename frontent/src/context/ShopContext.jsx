import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
    const currency       = '$';
    const delivery_charge = 10;
    const backendUrl     = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch]         = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [products, setProducts]     = useState([]);
    const [token, setToken]           = useState('');

    // ── FIX 2: seed cart from localStorage so guest cart survives refresh ──
    const [cartItems, setCartItems]   = useState(
        JSON.parse(localStorage.getItem('cartItems') || '{}')
    );

    const navigate = useNavigate();

    const addToCart = async (itemId, size) => {

          if (!token) {
        toast.error('Please login to add items to cart')
        navigate('/login')
        return
    }

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
         toast.success('Item added to cart ✓') 

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/add', { itemId, size }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    };

    const getCartCount = () => {
        let totalCount = 0;
        for (const itemId in cartItems) {
            for (const size in cartItems[itemId]) {
                try {
                    if (cartItems[itemId][size] > 0) {
                        totalCount += cartItems[itemId][size];
                    }
                } catch (error) {}
            }
        }
        return totalCount;
    };

    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = quantity;
        setCartItems(cartData);

        if (token) {
            try {
                await axios.post(backendUrl + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error)
                toast.error(error.message)
            }
        }
    };

    const getCartAmount = () => {
        let totalAmount = 0;
        for (const items in cartItems) {
            let itemInfo = products.find((product) => product._id === items);
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalAmount += itemInfo.price * cartItems[items][item];
                    }
                } catch (error) {}
            }
        }
        return totalAmount;
    };

    const getProductsData = async () => {
        try {
            const response = await axios.get(backendUrl + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.products)
            } else {
                toast.error(response.data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const getUserCart = async (token) => {
        try {
            const response = await axios.post(backendUrl + '/api/cart/get', {}, { headers: { token } })
            if (response.data.success) {
                setCartItems(response.data.cartData)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const logout = () => {
        navigate('/login')
        localStorage.removeItem('token')
        localStorage.removeItem('cartItems')     // clear cart on logout
        setToken('')
        setCartItems({})
    }

    // ── Effects ──────────────────────────────────────────────────────────────

    useEffect(() => {
        getProductsData()
    }, [])

    // ── FIX 1: single effect — no double getUserCart call ────────────────────
    useEffect(() => {
        const savedToken = localStorage.getItem('token')
        if (savedToken) {
            setToken(savedToken)
        }
    }, [])                               // runs once on mount — only sets token

    useEffect(() => {
        if (token) {
            localStorage.setItem('token', token)
            getUserCart(token)           // only called once when token is ready
        }
    }, [token])

    // ── FIX 2: sync cartItems to localStorage on every change ────────────────
    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems))
    }, [cartItems])

    const value = {
        products,
        currency,
        delivery_charge,
        search, setSearch,
        showSearch, setShowSearch,
        cartItems, setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        getCartAmount,
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