import { useContext, useState } from "react";
import { addCategory } from "../../Service/CategoryService.js";
import { AppContext } from "../../context/AppContext.jsx";
import toast from "react-hot-toast";
import './CategoryForm.css';

const CategoryForm = () => {
    const { setCategories, categories } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [image, setImage] = useState(false);
    const [data, setData] = useState({
        name: "",
        description: "",
        bgColor: "#6366f1",
    });

    const onChangeHandler = (e) => {
        const { name, value } = e.target;
        setData(prev => ({ ...prev, [name]: value }));
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!image) {
            toast.error("Select an image for the category");
            return;
        }
        setLoading(true);
        const formData = new FormData();
        formData.append("category", JSON.stringify(data));
        formData.append("file", image);
        try {
            const response = await addCategory(formData);
            if (response.status === 201) {
                setCategories([...categories, response.data]);
                toast.success("Category added!");
                setData({ name: "", description: "", bgColor: "#6366f1" });
                setImage(false);
            }
        } catch (err) {
            const msg = err.response?.data?.message || err.message || "Error adding category";
            toast.error(String(msg));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="cat-form-card">

            {/* Header */}
            <div className="cat-form-header">
                <div className="cat-form-header-icon">
                    <i className="bi bi-grid-3x3-gap"></i>
                </div>
                <div>
                    <h2 className="cat-form-title">Add New Category</h2>
                    <p className="cat-form-subtitle">Organise your items into categories</p>
                </div>
            </div>

            <form onSubmit={onSubmitHandler} className="cat-form-body">

                {/* Image Upload */}
                <div className="cat-upload-wrapper">
                    <label htmlFor="cat-image" className={`cat-upload-zone ${image ? 'has-image' : ''}`}>
                        {image ? (
                            <>
                                <img src={URL.createObjectURL(image)} alt="Preview" className="cat-upload-preview" />
                                <div className="cat-upload-overlay">
                                    <i className="bi bi-pencil-fill"></i>
                                    <span>Change</span>
                                </div>
                            </>
                        ) : (
                            <div className="cat-upload-placeholder">
                                <div className="cat-upload-icon-ring">
                                    <i className="bi bi-cloud-arrow-up"></i>
                                </div>
                                <p className="cat-upload-text">Click to upload image</p>
                            </div>
                        )}
                    </label>
                    <input type="file" id="cat-image" accept="image/*" hidden
                        onChange={(e) => setImage(e.target.files[0])} />
                </div>

                {/* Name */}
                <div className="cat-form-group">
                    <label className="cat-form-label" htmlFor="cat-name">
                        <i className="bi bi-folder2"></i> Category Name
                    </label>
                    <input
                        type="text" id="cat-name" name="name"
                        className="cat-form-input"
                        placeholder="e.g. Electronics"
                        value={data.name} onChange={onChangeHandler} required
                    />
                </div>

                {/* Description */}
                <div className="cat-form-group">
                    <label className="cat-form-label" htmlFor="cat-desc">
                        <i className="bi bi-text-paragraph"></i> Description
                        <span className="cat-optional">Optional</span>
                    </label>
                    <textarea
                        id="cat-desc" name="description" rows={4}
                        className="cat-form-input cat-textarea"
                        placeholder="Briefly describe this category..."
                        value={data.description} onChange={onChangeHandler}
                    />
                </div>

                {/* Background color */}
                <div className="cat-form-group">
                    <label className="cat-form-label">
                        <i className="bi bi-palette"></i> Card Color
                    </label>
                    <div className="cat-color-row">
                        <label htmlFor="cat-bgcolor" className="cat-color-preview-label">
                            <div className="cat-color-preview" style={{ backgroundColor: data.bgColor }}></div>
                            <span className="cat-color-edit-hint">
                                <i className="bi bi-pencil-fill"></i>
                            </span>
                        </label>
                        <input
                            type="color" id="cat-bgcolor" name="bgColor"
                            className="cat-color-input-hidden"
                            value={data.bgColor} onChange={onChangeHandler}
                        />
                        <span className="cat-color-value">{data.bgColor}</span>
                        <div className="cat-color-swatches">
                            {['#6366f1','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4'].map(c => (
                                <button key={c} type="button"
                                    className={`cat-swatch ${data.bgColor === c ? 'active' : ''}`}
                                    style={{ background: c }}
                                    onClick={() => setData(d => ({ ...d, bgColor: c }))}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Submit */}
                <button type="submit" className="cat-submit-btn" disabled={loading}>
                    {loading ? (
                        <><span className="cat-btn-spinner"></span>Saving...</>
                    ) : (
                        <><i className="bi bi-plus-circle"></i>Add Category</>
                    )}
                </button>

            </form>
        </div>
    );
};
export default CategoryForm;