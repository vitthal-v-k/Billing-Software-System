package in.vittalkumar.billingsoftware.controller;


import in.vittalkumar.billingsoftware.io.OrderResponse;
import in.vittalkumar.billingsoftware.io.PaymentRequest;
import in.vittalkumar.billingsoftware.io.PaymentVerificationRequest;
import in.vittalkumar.billingsoftware.io.RazorpayOrderResponse;
import in.vittalkumar.billingsoftware.service.OrderService;
import in.vittalkumar.billingsoftware.service.RazorpayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import com.razorpay.RazorpayException;

@RestController
@RequestMapping("/payments")
@RequiredArgsConstructor

public class PaymentController {

    private final RazorpayService razorpayService;
    private final OrderService orderService;

    @PostMapping("/create-order")
    @ResponseStatus(HttpStatus.CREATED)
    public RazorpayOrderResponse createRazorpayOrder(@RequestBody PaymentRequest request) throws RazorpayException {
        return razorpayService.createOrder(request.getAmount(), request.getCurrency());
    }
    @PostMapping("/verify")
    public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest request){
        return orderService.verifyPayment(request);
    }
}
