import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import { assets } from "../../assets/assets.js";
import toast from "react-hot-toast";
import { addItem } from "../../Service/ItemService.js";
import './ItemForm.css';

const ItemForm = () => {
    const { categories, setItemsData, itemsData, setCategories } = useContext(AppContext);
    const [image, setImage] = useState(false);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState({
        name: "",
        categoryId: "",
        price: "",
        description: "",
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!image) {
            toast.error("Select an image");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("item", JSON.stringify(data));
        formData.append("file", image);
        try {
            const response = await addItem(formData);
            if (response.status === 201) {
                setItemsData([...itemsData, response.data]);
                setCategories((prevCategories) =>
                    prevCategories.map((category) =>
                        category.categoryId === data.categoryId
                            ? { ...category, items: category.items + 1 }
                            : category
                    )
                );
                toast.success("Item added successfully!");
                setData({ name: "", description: "", price: "", categoryId: "" });
                setImage(false);
            } else {
                toast.error("Unable to add item");
            }
        } catch (error) {
            console.error(error);
            toast.error("Unable to add item");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="item-form-card">

            {/* Header */}
            <div className="item-form-header">
                <div className="item-form-header-icon">
                    <i className="bi bi-box-seam"></i>
                </div>
                <div>
                    <h2 className="item-form-title">Add New Item</h2>
                    <p className="item-form-subtitle">Fill in the details to add a product</p>
                </div>
            </div>

            <form onSubmit={onSubmitHandler} className="item-form-body">

                {/* Image Upload */}
                <div className="upload-zone-wrapper">
                    <label htmlFor="image" className={`upload-zone ${image ? 'has-image' : ''}`}>
                        {image ? (
                            <>
                                <img src={URL.createObjectURL(image)} alt="Preview" className="upload-preview" />
                                <div className="upload-overlay">
                                    <i className="bi bi-pencil-fill"></i>
                                    <span>Change</span>
                                </div>
                            </>
                        ) : (
                            <div className="upload-placeholder">
                                <div className="upload-icon-ring">
                                    <i className="bi bi-cloud-arrow-up"></i>
                                </div>
                                <p className="upload-text">Click to upload image</p>
                                <p className="upload-hint">PNG, JPG up to 5MB</p>
                            </div>
                        )}
                    </label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        hidden
                        onChange={(e) => setImage(e.target.files[0])}
                    />
                </div>

                {/* Name */}
                <div className="form-group">
                    <label className="form-label-styled" htmlFor="name">
                        <i className="bi bi-tag"></i> Item Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        className="form-input-styled"
                        placeholder="e.g. Wireless Mouse"
                        value={data.name}
                        onChange={onChangeHandler}
                        required
                    />
                </div>

                {/* Category */}
                <div className="form-group">
                    <label className="form-label-styled" htmlFor="category">
                        <i className="bi bi-grid"></i> Category
                    </label>
                    <div className="select-wrapper">
                        <select
                            id="category"
                            name="categoryId"
                            className="form-input-styled form-select-styled"
                            value={data.categoryId}
                            onChange={onChangeHandler}
                            required
                        >
                            <option value="">— Select a category —</option>
                            {categories.map((cat, i) => (
                                <option key={i} value={cat.categoryId}>{cat.name}</option>
                            ))}
                        </select>
                        <i className="bi bi-chevron-down select-arrow"></i>
                    </div>
                </div>

                {/* Price */}
                <div className="form-group">
                    <label className="form-label-styled" htmlFor="price">
                        <i className="bi bi-currency-rupee"></i> Price
                    </label>
                    <div className="price-input-wrapper">
                        <span className="price-prefix">₹</span>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            className="form-input-styled price-input"
                            placeholder="0.00"
                            value={data.price}
                            onChange={onChangeHandler}
                            required
                        />
                    </div>
                </div>

                {/* Description */}
                <div className="form-group">
                    <label className="form-label-styled" htmlFor="description">
                        <i className="bi bi-text-paragraph"></i> Description
                        <span className="optional-tag">Optional</span>
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        className="form-input-styled form-textarea-styled"
                        placeholder="Briefly describe the item..."
                        rows={4}
                        value={data.description}
                        onChange={onChangeHandler}
                    />
                </div>

                {/* Submit */}
                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? (
                        <>
                            <span className="btn-spinner"></span>
                            Saving...
                        </>
                    ) : (
                        <>
                            <i className="bi bi-plus-circle"></i>
                            Add Item
                        </>
                    )}
                </button>

            </form>
        </div>
    );
};
export default ItemForm;