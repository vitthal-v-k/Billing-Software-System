import './CustomerForm.css';

const CustomerForm = ({ customerName, mobileNumber, setMobileNumber, setCustomerName }) => {
    return (
        <div className="customer-form">
            <p className="cart-panel-title">
                <i className="bi bi-receipt me-2" style={{ color: '#6366f1' }}></i>
                New Order
            </p>

            <div className="form-field">
                <label htmlFor="customerName">Customer Name</label>
                <i className="bi bi-person field-icon"></i>
                <input
                    type="text"
                    id="customerName"
                    placeholder="Enter name..."
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                />
            </div>

            <div className="form-field">
                <label htmlFor="mobileNumber">Mobile Number</label>
                <i className="bi bi-phone field-icon"></i>
                <input
                    type="text"
                    id="mobileNumber"
                    placeholder="Enter mobile..."
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value)}
                />
            </div>
        </div>
    );
};
export default CustomerForm;