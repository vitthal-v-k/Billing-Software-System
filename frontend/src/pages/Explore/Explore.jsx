import './Explore.css';
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext.jsx";
import DisplayCategory from "../../components/DisplayCategory/DisplayCategory.jsx";
import DisplayItems from "../../components/DisplayItems/DisplayItems.jsx";
import CustomerForm from "../../components/CustomerForm/CustomerForm.jsx";
import CartItems from "../../components/CartItems/CartItems.jsx";
import CartSummary from "../../components/CartSummary/CartSummary.jsx";
import ErrorBoundary from "../../components/ErrorBoundary/ErrorBoundary.jsx";

const Explore = () => {
    const { categories, userRole } = useContext(AppContext);
    const isAdmin = userRole === "ROLE_ADMIN";

    const [selectedCategory, setSelectedCategory] = useState("");
    const [customerName, setCustomerName] = useState("");
    const [mobileNumber, setMobileNumber] = useState("");
    const [state, setState] = useState("");
    const [district, setDistrict] = useState("");
    const [place, setPlace] = useState("");

    return (
        <ErrorBoundary>
            <div className={`explore-container ${isAdmin ? 'explore-admin-view' : ''}`}>

                {/* ── LEFT: Categories + Items ── */}
                <div className="left-column">
                    {isAdmin && (
                        <div className="admin-explore-banner">
                            <i className="bi bi-shield-check"></i>
                            <span>Admin View — Click <i className="bi bi-trash3"></i> on any item to delete it</span>
                        </div>
                    )}
                    <div className="first-row">
                        <DisplayCategory
                            selectedCategory={selectedCategory}
                            setSelectedCategory={setSelectedCategory}
                            categories={categories}
                        />
                    </div>

                    <hr className="horizontal-line" />

                    <div className="second-row">
                        <DisplayItems selectedCategory={selectedCategory} />
                    </div>
                </div>

                {/* ── RIGHT: Cart Panel — hidden for admin ── */}
                {!isAdmin && (
                    <div className="right-column">
                        <div className="right-scroll-area">
                            <div className="customer-form-container">
                                <CustomerForm
                                    customerName={customerName}
                                    mobileNumber={mobileNumber}
                                    setMobileNumber={setMobileNumber}
                                    setCustomerName={setCustomerName}
                                    state={state}
                                    setState={setState}
                                    district={district}
                                    setDistrict={setDistrict}
                                    place={place}
                                    setPlace={setPlace}
                                />
                            </div>

                            <div className="cart-items-container">
                                <CartItems />
                            </div>
                        </div>

                        {/* Pinned at bottom: totals + payment */}
                        <div className="cart-summary-container">
                            <CartSummary
                                customerName={customerName}
                                mobileNumber={mobileNumber}
                                setMobileNumber={setMobileNumber}
                                setCustomerName={setCustomerName}
                                state={state}
                                setState={setState}
                                district={district}
                                setDistrict={setDistrict}
                                place={place}
                                setPlace={setPlace}
                            />
                        </div>
                    </div>
                )}

            </div>
        </ErrorBoundary>
    );
};
export default Explore;