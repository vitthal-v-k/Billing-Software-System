import './DisplayCategory.css';
import Category from "../Category/Category.jsx";

const DisplayCategory = ({selectedCategory, setSelectedCategory, categories}) => {
    return (
        <div className="category-strip-wrapper">
            <p className="section-label">Categories</p>
            <div className="category-strip">
                {/* "All" pill */}
                <div
                    className={`category-card${!selectedCategory ? ' is-selected' : ''}`}
                    onClick={() => setSelectedCategory("")}
                    style={{ minWidth: '110px' }}
                >
                    <div className="all-icon">
                        <i className="bi bi-grid-3x3-gap-fill"></i>
                    </div>
                    <div>
                        <p className="category-name">All</p>
                        <p className="category-count">{categories.reduce((s,c) => s + (c.items||0), 0)} Items</p>
                    </div>
                    {!selectedCategory && (
                        <div className="category-check">
                            <i className="bi bi-check"></i>
                        </div>
                    )}
                </div>

                {categories.map(category => (
                    <Category
                        key={category.categoryId}
                        categoryName={category.name}
                        imgUrl={category.imgUrl}
                        numberOfItems={category.items}
                        bgColor={category.bgColor}
                        isSelected={selectedCategory === category.categoryId}
                        onClick={() => setSelectedCategory(category.categoryId)}
                    />
                ))}
            </div>
        </div>
    );
};
export default DisplayCategory;