import './Item.css';
import { useContext } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { deleteItem } from "../../Service/ItemService.js";
import toast from "react-hot-toast";

const Item = ({ itemName, itemPrice, itemImage, itemId, itemQuantity }) => {
    const { addToCart, userRole, setItemsData, itemsData } = useContext(AppContext);
    const isAdmin = userRole === "ROLE_ADMIN";

    const isOutOfStock = itemQuantity !== null && itemQuantity !== undefined && itemQuantity <= 0;
    const isLowStock  = !isOutOfStock && itemQuantity !== null && itemQuantity !== undefined && itemQuantity <= 5;

    const handleAddToCart = () => {
        if (isAdmin || isOutOfStock) return;
        addToCart({
            name: itemName,
            price: itemPrice,
            quantity: 1,
            itemId: itemId,
            imgUrl: itemImage
        });
    };

    const handleDelete = async (e) => {
        e.stopPropagation();
        if (!window.confirm(`Delete "${itemName}"?`)) return;
        try {
            const response = await deleteItem(itemId);
            if (response.status === 204) {
                setItemsData(itemsData.filter(i => i.itemId !== itemId));
                toast.success(`"${itemName}" deleted`);
            }
        } catch (err) {
            toast.error("Failed to delete item");
        }
    };

    return (
        <div
            className={`item-card ${isOutOfStock ? 'out-of-stock' : ''} ${isAdmin ? 'admin-item-card' : ''}`}
            onClick={handleAddToCart}
        >
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
                {isAdmin ? (
                    /* Admin: delete button */
                    <>
                        <i className="bi bi-shield-check cart-icon" style={{color:'#6366f1'}}></i>
                        <button
                            className="add-btn delete-btn-explore"
                            onClick={handleDelete}
                            title="Delete item"
                        >
                            <i className="bi bi-trash3"></i>
                        </button>
                    </>
                ) : (
                    /* User: add to cart button */
                    <>
                        <i className="bi bi-cart3 cart-icon"></i>
                        <button
                            className="add-btn"
                            onClick={(e) => { e.stopPropagation(); handleAddToCart(); }}
                            disabled={isOutOfStock}
                            title={isOutOfStock ? "Out of Stock" : "Add to cart"}
                        >
                            <i className={`bi ${isOutOfStock ? 'bi-x' : 'bi-plus'}`}></i>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};
export default Item;