import './CategoryList.css';
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { deleteCategories } from "../../Service/CategoryService.js";
import toast from "react-hot-toast";

const CategoryList = () => {
    const { categories, setCategories } = useContext(AppContext);
    const [searchTerm, setSearchTerm] = useState('');
    const [deletingId, setDeletingId] = useState(null);

    const filteredCategories = categories.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const deleteByCategoryId = async (categoryId) => {
        setDeletingId(categoryId);
        try {
            const response = await deleteCategories(categoryId);
            if (response.status === 200 || response.status === 204) {
                setCategories(categories.filter(c => c.categoryId !== categoryId));
                toast.success('Category deleted');
            } else {
                toast.error('Unable to delete category');
            }
        } catch (error) {
            console.error(error);
            toast.error('Unable to delete category');
        } finally {
            setDeletingId(null);
        }
    };

    return (
        <div className="cat-list-panel">
            {/* Header */}
            <div className="cat-list-header">
                <div className="cat-list-title-row">
                    <span className="cat-list-title">
                        <i className="bi bi-grid-3x3-gap"></i>
                        All Categories
                    </span>
                    <span className="cat-count-badge">{filteredCategories.length}</span>
                </div>
                <div className="cat-list-search-wrapper">
                    <i className="bi bi-search cat-search-icon"></i>
                    <input
                        type="text"
                        className="cat-list-search"
                        placeholder="Search categories..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                    {searchTerm && (
                        <button className="cat-search-clear" onClick={() => setSearchTerm("")}>
                            <i className="bi bi-x"></i>
                        </button>
                    )}
                </div>
            </div>

            {/* List */}
            <div className="cat-list-body">
                {filteredCategories.length === 0 ? (
                    <div className="cat-list-empty">
                        <i className="bi bi-inbox"></i>
                        <p>{searchTerm ? "No categories match" : "No categories yet"}</p>
                        <span>Add one using the form</span>
                    </div>
                ) : (
                    filteredCategories.map((category) => (
                        <div key={category.categoryId} className="cat-list-row">
                            {/* Colored accent strip */}
                            <div className="cat-color-strip" style={{ backgroundColor: category.bgColor }}></div>
                            <div className="cat-list-img-wrap">
                                <img 
                                    src={category.imgUrl} 
                                    alt={category.name} 
                                    className="cat-list-img" 
                                    onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/100x100/1e293b/94a3b8?text=" + (category.name?.charAt(0) || "C"); }}
                                />
                            </div>
                            <div className="cat-list-info">
                                <p className="cat-list-name">{category.name}</p>
                                <p className="cat-list-count">
                                    <i className="bi bi-box-seam"></i>
                                    {category.items} items
                                </p>
                            </div>
                            <button
                                className={`cat-delete-btn ${deletingId === category.categoryId ? 'deleting' : ''}`}
                                onClick={() => deleteByCategoryId(category.categoryId)}
                                disabled={deletingId === category.categoryId}
                            >
                                {deletingId === category.categoryId
                                    ? <span className="cat-del-spinner"></span>
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
export default CategoryList;