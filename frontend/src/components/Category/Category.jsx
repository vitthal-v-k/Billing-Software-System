import './Category.css';

const Category = ({ categoryName, imgUrl, numberOfItems, bgColor, isSelected, onClick }) => {
    return (
        <div
            className={`category-card${isSelected ? ' is-selected' : ''}`}
            style={{ '--cat-color': bgColor || '#6366f1' }}
            onClick={onClick}
        >
            <img src={imgUrl} alt={categoryName} className="category-image" />
            <div>
                <p className="category-name">{categoryName}</p>
                <p className="category-count">{numberOfItems} Items</p>
            </div>
            {isSelected && (
                <div className="category-check">
                    <i className="bi bi-check"></i>
                </div>
            )}
        </div>
    );
};
export default Category;
