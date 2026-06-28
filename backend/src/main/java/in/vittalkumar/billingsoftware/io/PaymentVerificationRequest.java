package in.vittalkumar.billingsoftware.io;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentVerificationRequest {

    private  String razorpayOrderId;
    private  String razorpayOrderPaymentId;
    private  String razorpaySignature;
    private  String orderId;
}
