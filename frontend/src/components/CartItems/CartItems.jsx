import './CartItems.css';
import { useContext } from "react";
import { AppContext } from "../../context/AppContext.jsx";

const CartItems = () => {
    const { cartItems, removeFromCart, updateQuantity } = useContext(AppContext);

    if (cartItems.length === 0) {
        return (
            <div className="cart-empty">
                <i className="bi bi-bag-x"></i>
                <p>Cart is empty</p>
                <p style={{ fontSize: '0.72rem', color: '#2d3748' }}>Add items to get started</p>
            </div>
        );
    }

    return (
        <div className="cart-list">
            {cartItems.map((item) => (
                <div key={item.itemId} className="cart-item-row">
                    <div className="cart-item-top">
                        {/* Item image */}
                        {item.imgUrl && (
                            <img
                                src={item.imgUrl}
                                alt={item.name}
                                className="cart-item-image"
                            />
                        )}
                        <div className="cart-item-info">
                            <span className="cart-item-name">{item.name}</span>
                            <span className="cart-item-unit-price">₹{item.price} × {item.quantity}</span>
                        </div>
                        <span className="cart-item-total">₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                    <div className="cart-item-bottom">
                        <div className="qty-controls">
                            <button
                                className="qty-btn minus"
                                onClick={() => updateQuantity(item.itemId, item.quantity - 1)}
                                disabled={item.quantity === 1}
                            >
                                <i className="bi bi-dash"></i>
                            </button>
                            <span className="qty-value">{item.quantity}</span>
                            <button
                                className="qty-btn plus"
                                onClick={() => updateQuantity(item.itemId, item.quantity + 1)}
                            >
                                <i className="bi bi-plus"></i>
                            </button>
                        </div>
                        <button
                            className="delete-btn"
                            onClick={() => removeFromCart(item.itemId)}
                        >
                            <i className="bi bi-trash3"></i>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};
export default CartItems;