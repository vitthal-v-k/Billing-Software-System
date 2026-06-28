package in.vittalkumar.billingsoftware.service;

import in.vittalkumar.billingsoftware.io.OrderRequest;
import in.vittalkumar.billingsoftware.io.OrderResponse;
import in.vittalkumar.billingsoftware.io.PaymentVerificationRequest;

import java.util.List;

public interface OrderService {

    OrderResponse createOrder(OrderRequest request, String userId);

    void deleteOrder(String orderId);

    List<OrderResponse> getLatestOrders(String userId);

    OrderResponse verifyPayment(PaymentVerificationRequest request);
}
