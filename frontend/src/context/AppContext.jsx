import {createContext, useEffect, useState} from "react";
import {fetchCategories} from "../Service/CategoryService.js";
import {fetchItems} from "../Service/ItemService.js";


export  const AppContext = createContext(null);


export const AppContextProvider = ( props ) => {

    const [categories, setCategories] = useState([]);
    const [itemsData, setItemsData] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(
        () => localStorage.getItem('isLoggedIn') === 'true'
    );
    const [cartItems, setCartItems] = useState([]);
    const [token, setToken] = useState(
        () => localStorage.getItem('token') || null
    );
    const [userRole, setUserRole] = useState(
        () => localStorage.getItem('userRole') || null
    );

    const addToCart = (item) => {
        const existingItem = cartItems.find(cartItem => cartItem.itemId === item.itemId);
        if (existingItem) {
            setCartItems(cartItems.map(cartItem =>
                cartItem.itemId === item.itemId
                    ? {...cartItem, quantity: cartItem.quantity + 1}
                    : cartItem
            ));
        } else {
            setCartItems([...cartItems, {...item, quantity: 1}]);
        }
    };

    const updateQuantity = (itemId, newQuantity) => {
        if (newQuantity <= 0) {
            setCartItems(cartItems.filter(cartItem => cartItem.itemId !== itemId));
        } else {
            setCartItems(cartItems.map(cartItem =>
                cartItem.itemId === itemId ? {...cartItem, quantity: newQuantity} : cartItem
            ));
        }
    };

    const removeFromCart = (itemId) => {
        setCartItems(cartItems.filter(cartItem => cartItem.itemId !== itemId));
    };

    // If the user has an old session with no real JWT, clear it so they re-login
    useEffect(() => {
        if (isLoggedIn && !localStorage.getItem('token')) {
            logout();
        }
    }, []);

    // Reload categories and items whenever the token changes (after login)
    useEffect(() => {
        if (!token) return;

        async function loadData() {
            try {
                const [catRes, itemRes] = await Promise.all([
                    fetchCategories(),
                    fetchItems()
                ]);
                setCategories(catRes.data);
                setItemsData(itemRes.data);
            } catch (err) {
                console.error('Failed to load data:', err);
            }
        }
        loadData();
    }, [token]);

    const login = (jwtToken, role) => {
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('token', jwtToken);
        localStorage.setItem('userRole', role);
        setIsLoggedIn(true);
        setToken(jwtToken);
        setUserRole(role);
    };

    const logout = () => {
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('token');
        localStorage.removeItem('userRole');
        setIsLoggedIn(false);
        setToken(null);
        setUserRole(null);
        setCategories([]);
        setItemsData([]);
    };

    const clearCart = () => {
        setCartItems([]);
    }

    const contextValue = {
        categories,
        setCategories,
        itemsData,
        setItemsData,
        isLoggedIn,
        token,
        userRole,
        login,
        logout,
        addToCart,
        updateQuantity,
        removeFromCart,
        cartItems,
        clearCart
    }

    return <AppContext.Provider value={contextValue}>
        {props.children}
    </AppContext.Provider>
}