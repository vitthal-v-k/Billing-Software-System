import './CustomerForm.css';

const CustomerForm = ({
    customerName, mobileNumber, setMobileNumber, setCustomerName,
    state, setState, district, setDistrict, place, setPlace
}) => {
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

            <div className="form-field">
                <label htmlFor="state">State</label>
                <i className="bi bi-geo-alt field-icon"></i>
                <input
                    type="text"
                    id="state"
                    placeholder="Enter state..."
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                />
            </div>

            <div className="form-field">
                <label htmlFor="district">District</label>
                <i className="bi bi-map field-icon"></i>
                <input
                    type="text"
                    id="district"
                    placeholder="Enter district..."
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                />
            </div>

            <div className="form-field">
                <label htmlFor="place">Place</label>
                <i className="bi bi-pin-map field-icon"></i>
                <input
                    type="text"
                    id="place"
                    placeholder="Enter place..."
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                />
            </div>
        </div>
    );
};
export default CustomerForm;