import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { deleteItem } from "../../Service/ItemService.js";
import toast from "react-hot-toast";
import './ItemList.css';

const ItemList = () => {
    const { itemsData, setItemsData } = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState("");
    const [deletingId, setDeletingId] = useState(null);

    const filteredItems = itemsData.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const removeItem = async (itemId) => {
        setDeletingId(itemId);
        try {
            const response = await deleteItem(itemId);
            if (response.status === 204) {
                setItemsData(itemsData.filter((item) => item.itemId !== itemId));
                toast.success("Item deleted.");
            } else {
                toast.error("Unable to delete item.");
            }
        } catch (err) {
            console.error(err);
            toast.error("Unable to delete item.");
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="item-list-panel">

            {/* Panel Header */}
            <div className="item-list-header">
                <div className="item-list-title-row">
                    <span className="item-list-title">
                        <i className="bi bi-list-ul"></i>
                        All Items
                    </span>
                    <span className="item-count-badge">{filteredItems.length}</span>
                </div>

                {/* Search */}
                <div className="item-list-search-wrapper">
                    <i className="bi bi-search item-list-search-icon"></i>
                    <input
                        type="text"
                        className="item-list-search"
                        placeholder="Search items..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button
                            className="search-clear-btn"
                            onClick={() => setSearchTerm("")}
                        >
                            <i className="bi bi-x"></i>
                        </button>
                    )}
                </div>
            </div>

            {/* Items list */}
            <div className="item-list-body">
                {filteredItems.length === 0 ? (
                    <div className="item-list-empty">
                        <i className="bi bi-inbox"></i>
                        <p>{searchTerm ? "No items match your search" : "No items yet"}</p>
                        <span>{searchTerm ? "Try a different keyword" : "Add your first item using the form"}</span>
                    </div>
                ) : (
                    filteredItems.map((item) => (
                        <div key={item.itemId} className="item-list-row">
                            <div className="item-list-img-wrap">
                                <img src={item.imgUrl} alt={item.name} className="item-list-img" />
                            </div>
                            <div className="item-list-info">
                                <p className="item-list-name">{item.name}</p>
                                <p className="item-list-category">
                                    <i className="bi bi-grid-3x3-gap"></i>
                                    {item.categoryName}
                                </p>
                                <span className="item-list-price">₹{item.price}</span>
                            </div>
                            <button
                                className={`item-delete-btn ${deletingId === item.itemId ? 'deleting' : ''}`}
                                onClick={() => removeItem(item.itemId)}
                                disabled={deletingId === item.itemId}
                                title="Delete item"
                            >
                                {deletingId === item.itemId
                                    ? <span className="delete-spinner"></span>
                                    : <i className="bi bi-trash3"></i>
                                }
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
export default ItemList;