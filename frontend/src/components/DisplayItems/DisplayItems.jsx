import './DisplayItems.css';
import { useContext, useState } from "react";
import Item from "../Item/Item.jsx";
import { AppContext } from "../../context/AppContext.jsx";

const DisplayItems = ({ selectedCategory }) => {
    const { itemsData } = useContext(AppContext);
    const [searchText, setSearchText] = useState("");

    const filteredItems = itemsData
        .filter(item => {
            if (!selectedCategory) return true;
            return item.categoryId === selectedCategory;
        })
        .filter(item => (item.name || '').toLowerCase().includes(searchText.toLowerCase()));

    return (
        <div>
            <p className="items-section-label">Items</p>

            {/* Premium search bar */}
            <div className="search-wrapper">
                <i className="bi bi-search search-icon"></i>
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search items..."
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                />
            </div>

            {filteredItems.length === 0 ? (
                <div className="items-empty">
                    <i className="bi bi-inbox"></i>
                    <p>No items found</p>
                </div>
            ) : (
                <div className="items-grid">
                    {filteredItems.map((item, index) => (
                        <Item
                            key={item.itemId || index}
                            itemName={item.name}
                            itemPrice={item.price}
                            itemImage={item.imgUrl}
                            itemId={item.itemId}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};
export default DisplayItems;
