import './ManageCategory.css';
import CategoryForm from "../../components/CategoryForm/CategoryForm.jsx";
import CategoryList from "../../components/CategoryList/CategoryList.jsx";

const ManageCategory = () => {
    return (
        <div className="category-container">
            <div className="left-column">
                <CategoryForm />
            </div>
            <div className="right-column">
                <CategoryList />
            </div>
        </div>
    );
};
export default ManageCategory;