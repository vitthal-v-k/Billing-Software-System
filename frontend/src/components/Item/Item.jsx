import './Item.css';
import { useContext } from "react";
import { AppContext } from "../../context/AppContext.jsx";

const Item = ({ itemName, itemPrice, itemImage, itemId }) => {
    const { addToCart } = useContext(AppContext);

    const handleAddToCart = () => {
        addToCart({
            name: itemName,
            price: itemPrice,
            quantity: 1,
            itemId: itemId,
            imgUrl: itemImage
        });
    };

    return (
        <div className="item-card" onClick={handleAddToCart}>
            <img src={itemImage} alt={itemName} className="item-image" />
            <div className="item-details">
                <p className="item-name">{itemName}</p>
                <p className="item-price">₹{itemPrice}</p>
            </div>
            <div className="item-actions">
                <i className="bi bi-cart3 cart-icon"></i>
                <button className="add-btn" onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}>
                    <i className="bi bi-plus"></i>
                </button>
            </div>
        </div>
    );
};
export default Item;