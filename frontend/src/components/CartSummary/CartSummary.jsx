import './CartSummary.css';
import {useContext, useState} from "react";
import {AppContext} from "../../context/AppContext.jsx";
import ReceiptPopup from "../ReceiptPopup/ReceiptPopup.jsx";
import {createOrder, deleteOrder} from "../../Service/OrderService.js";
import toast from "react-hot-toast";
import {createRazorpayOrder, verifyPayment} from "../../Service/PaymentService.js";
import {AppConstants} from "../../util/constants.js";

const CartSummary = ({customerName, mobileNumber, setMobileNumber, setCustomerName, state, setState, district, setDistrict, place, setPlace}) => {

    const {cartItems, clearCart} = useContext(AppContext);

    const [isProcessing, setIsProcessing] = useState(false);

    const [orderDetail, setOrderDetail] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

    const tax = totalAmount * 0.01;

    const grandTotal = totalAmount + tax;

    const clearAll = () => {
        setCustomerName("");
        setMobileNumber("");
        setState("");
        setDistrict("");
        setPlace("");
        clearCart();
    }


    const placeOrder = () => {
        setShowPopup(true);
        clearAll();
    }

    const handlePrintReceipt = () => {
        window.print();
    }

    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    }

    const deleteOrderOnFailure = async (orderId) => {
        try{
            await deleteOrder(orderId);
        }catch(error){
            console.error(error);
            toast.error("something went wrong!");
        }
    }

    const completePayment = async (paymentMode) => {
        if (!customerName || !mobileNumber) {
            toast.error("Please fill out the customer!");
            return;
        }
        if(cartItems.length == 0){
            toast.error("Your cart is empty!");
            return;
        }
        // Deduplicate by itemId and send only the fields the backend expects
        const deduplicatedItems = Object.values(
            cartItems.reduce((acc, item) => {
                if (acc[item.itemId]) {
                    acc[item.itemId].quantity += item.quantity;
                } else {
                    acc[item.itemId] = {
                        itemId: item.itemId,
                        name: item.name,
                        price: item.price,
                        quantity: item.quantity
                    };
                }
                return acc;
            }, {})
        );

        const orderData = {
            customerName,
            phoneNumber: mobileNumber,
            state,
            district,
            place,
            cartItems: deduplicatedItems,
            subtotal: totalAmount,
            tax,
            grandTotal,
            paymentMethod: paymentMode.toUpperCase()
        }
        setIsProcessing(true);
        try{

            const response = await createOrder(orderData);
            const savedData = response.data;
            if((response.status === 200 || response.status === 201) && paymentMode === "cash"){
                toast.success("Cash received");
                setOrderDetail(savedData);
            }else if((response.status === 200 || response.status === 201) && paymentMode === "upi"){
                const razorpayLoaded = await loadRazorpayScript();
                if(!razorpayLoaded){
                    toast.error("Unable to load Razorpay");
                    await deleteOrderOnFailure(savedData.orderId);
                    return;
                }

               const razorpayResponse = await createRazorpayOrder({amount:grandTotal,currency:'INR'})
                const options = {
                        key: AppConstants.RAZORPAY_KEY_ID,
                        amount: razorpayResponse.data.amount,
                        currency: razorpayResponse.data.currency,
                        order_id: razorpayResponse.data.id,
                    name:"My Retail Shop",
                    description:"Order payment",
                    handler: async function(response){
                       await verifyPaymentHandler(response, savedData);
                    },
                    prefill:{
                            name:customerName,
                        contact:mobileNumber
                    },
                    theme: {
                            color: "#3399cc"
                    },
                    modal:{
                            ondismiss: async () => {
                                deleteOrderOnFailure(savedData.order_id);
                                toast.error("Payment cancelled");
                            }
                    },
                };

                const rzp = new window.Razorpay(options);
                rzp.on("payment.failed",async (response) => {
                    deleteOrderOnFailure(savedData.order_id);
                    toast.error("Payment failed");
                    console.error(response.error.description);
                });
                rzp.open();
            }


        }catch (error){
            console.error(error);
            const message = error?.response?.data?.message
                || error?.response?.data?.error
                || error?.message
                || "Payment process failed";
            toast.error(message);
        }finally {
            setIsProcessing(false);
        }
    }
    const verifyPaymentHandler = async (response, savedOrder) => {
        const paymentData = {
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            orderId: savedOrder.order_id,
        };
        try{
            const paymentResponse = await verifyPayment(paymentData);
            if(paymentResponse.status === 200){
                toast.success("Payment successful");
                setOrderDetail({
                    ...savedOrder,
                    paymentDetails:{
                        razorpayOrderId: response.razorpay_order_id,
                        razorpayPaymentId: response.razorpay_payment_id,
                        razorpaySignature: response.razorpay_signature,
                    },
                });
            }else{
                toast.error("Payment process failed");
            }
        }catch(error){
            toast.error("Payment process failed");
        }
    };



    return (
        <div className="cart-summary">
            {/* Line items */}
            <div className="summary-row">
                <span className="summary-label">Subtotal</span>
                <span className="summary-value">₹{totalAmount.toFixed(2)}</span>
            </div>
            <div className="summary-row">
                <span className="summary-label">Tax (1%)</span>
                <span className="summary-value">₹{tax.toFixed(2)}</span>
            </div>

            {/* Grand total */}
            <div className="summary-total-row">
                <span className="summary-total-label">Total</span>
                <span className="summary-total-value">₹{grandTotal.toFixed(2)}</span>
            </div>

            {/* Payment buttons */}
            <div className="payment-buttons">
                <button
                    className="pay-btn cash"
                    onClick={() => completePayment("cash")}
                    disabled={isProcessing}
                >
                    {isProcessing ? (
                        <span className="processing-spinner"></span>
                    ) : (
                        <i className="bi bi-cash-coin"></i>
                    )}
                    Cash
                </button>
                <button
                    className="pay-btn upi"
                    onClick={() => completePayment("upi")}
                    disabled={isProcessing}
                >
                    {isProcessing ? (
                        <span className="processing-spinner"></span>
                    ) : (
                        <i className="bi bi-phone"></i>
                    )}
                    UPI
                </button>
            </div>

            {/* Place order */}
            <button
                className="place-order-btn"
                onClick={placeOrder}
                disabled={isProcessing || !orderDetail}
            >
                <i className="bi bi-bag-check"></i>
                Place Order
            </button>

            {showPopup && orderDetail && (
                <ReceiptPopup
                    orderDetails={{
                        ...orderDetail,
                        razorpayOrderId: orderDetail.paymentDetails?.razorpayOrderId,
                        razorpayPaymentId: orderDetail.paymentDetails?.razorpayPaymentId,
                    }}
                    onClose={() => setShowPopup(false)}
                    onPrint={handlePrintReceipt}
                />
            )}
        </div>
    );
}
export default CartSummary;