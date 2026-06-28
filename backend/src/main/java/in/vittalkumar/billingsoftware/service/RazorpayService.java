package in.vittalkumar.billingsoftware.service;

import com.razorpay.RazorpayException;
import in.vittalkumar.billingsoftware.io.RazorpayOrderResponse;

public interface RazorpayService {

    RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException;
}
