import './Item.css';
import { useContext } from "react";
import { AppContext } from "../../context/AppContext.jsx";

const Item = ({ itemName, itemPrice, itemImage, itemId, itemQuantity }) => {
    const { addToCart } = useContext(AppContext);

    const isOutOfStock = itemQuantity !== null && itemQuantity !== undefined && itemQuantity <= 0;
    const isLowStock  = !isOutOfStock && itemQuantity !== null && itemQuantity !== undefined && itemQuantity <= 5;

    const handleAddToCart = () => {
        if (isOutOfStock) return;
        addToCart({
            name: itemName,
            price: itemPrice,
            quantity: 1,
            itemId: itemId,
            imgUrl: itemImage
        });
    };

    return (
        <div className={`item-card ${isOutOfStock ? 'out-of-stock' : ''}`} onClick={handleAddToCart}>
            <img src={itemImage} alt={itemName} className="item-image" />
            <div className="item-details">
                <p className="item-name">{itemName}</p>
                <p className="item-price">₹{itemPrice}</p>

                {/* Stock badge */}
                {isOutOfStock ? (
                    <span className="stock-badge out-of-stock-badge">Out of Stock</span>
                ) : isLowStock ? (
                    <span className="stock-badge low-stock-badge">Only {itemQuantity} left</span>
                ) : itemQuantity != null ? (
                    <span className="stock-badge in-stock-badge">{itemQuantity} in stock</span>
                ) : null}
            </div>
            <div className="item-actions">
                <i className="bi bi-cart3 cart-icon"></i>
                <button
                    className="add-btn"
                    onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
                    disabled={isOutOfStock}
                    title={isOutOfStock ? "Out of Stock" : "Add to cart"}
                >
                    <i className={`bi ${isOutOfStock ? 'bi-x' : 'bi-plus'}`}></i>
                </button>
            </div>
        </div>
    );
};
export default Item;