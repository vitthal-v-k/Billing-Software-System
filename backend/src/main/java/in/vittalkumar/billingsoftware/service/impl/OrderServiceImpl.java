package in.vittalkumar.billingsoftware.service.impl;

import in.vittalkumar.billingsoftware.entity.OrderEntity;
import in.vittalkumar.billingsoftware.entity.OrderItemEntity;
import in.vittalkumar.billingsoftware.io.*;
import in.vittalkumar.billingsoftware.repository.OrderEntityRepository;
import in.vittalkumar.billingsoftware.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {
    
    private final OrderEntityRepository orderEntityRepository;
    
    @Override
    public OrderResponse createOrder(OrderRequest request, String userId) {
        OrderEntity newOrder = convetToOrderEntity(request);
        newOrder.setUserId(userId);  // tag the order with the creator's email

        PaymentDetails paymentDetails = new PaymentDetails();
        paymentDetails.setStatus(newOrder.getPaymentMethod() == PaymentMethod.CASH ?
                PaymentDetails.PaymentStatus.COMPLETED : PaymentDetails.PaymentStatus.PENDING);
        newOrder.setPaymentDetails(paymentDetails);
        
        List<OrderItemEntity> orderItems = request.getCartItems().stream()
                .map(this::convertToOrderItemEntity)
                .collect(Collectors.toList());
        newOrder.setItems(orderItems);
        
        newOrder = orderEntityRepository.save(newOrder);
        return convertToResponse(newOrder);
    }

    private OrderItemEntity convertToOrderItemEntity(OrderRequest.OrderItemRequest orderItemRequest) {

        return OrderItemEntity.builder()
                .itemId(orderItemRequest.getItemId())
                .name(orderItemRequest.getName())
                .price(orderItemRequest.getPrice())
                .quantity(orderItemRequest.getQuantity())
                .build();
    }

    private OrderResponse convertToResponse(OrderEntity newOrder) {
        return OrderResponse.builder()
                .orderId(newOrder.getOrderId())
                .customerName(newOrder.getCustomerName())
                .phoneNumber(newOrder.getPhoneNumber())
                .subtotal(newOrder.getSubtotal())
                .tax(newOrder.getTax())
                .grandTotal(newOrder.getGrandTotal())
                .paymentMethod(newOrder.getPaymentMethod())
                .items(newOrder.getItems().stream()
                        .map(this::convertToItemResponse)
                        .collect(Collectors.toList()))
                        .paymentDetails(newOrder.getPaymentDetails())
                        .createdAt(newOrder.getCreatedAt())
                        .build();

    }
    private OrderResponse.OrderItemResponse convertToItemResponse(OrderItemEntity orderItemEntity){
         return OrderResponse.OrderItemResponse.builder()
                .itemId(orderItemEntity.getItemId())
                .name(orderItemEntity.getName())
                .price(orderItemEntity.getPrice())
                .quantity(orderItemEntity.getQuantity())
                .build();
    }


    private OrderEntity convetToOrderEntity(OrderRequest request) {

        return OrderEntity.builder()
                .customerName(request.getCustomerName())
                .phoneNumber(request.getPhoneNumber())
                .subtotal(request.getSubtotal())
                .tax(request.getTax())
                .grandTotal(request.getGrandTotal())
                .paymentMethod(PaymentMethod.valueOf(request.getPaymentMethod()))
                .build();
    }

    @Override
    public void deleteOrder(String orderId) {
        OrderEntity existingOrder = orderEntityRepository.findByOrderId(orderId)
                .orElseThrow(() -> new RuntimeException("Order not found"));
        orderEntityRepository.delete(existingOrder);
    }

    @Override
    public List<OrderResponse> getLatestOrders(String userId) {
        return orderEntityRepository.findAllByUserIdOrderByCreatedAtDesc(userId)
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public OrderResponse verifyPayment(PaymentVerificationRequest request) {
        OrderEntity existingOrder = orderEntityRepository.findByOrderId(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found"));

        if (verifyRazorpaySignature(request.getRazorpayOrderId(),
                request.getRazorpayOrderPaymentId(),
                request.getRazorpaySignature())) {
            PaymentDetails paymentDetails = existingOrder.getPaymentDetails();
            paymentDetails.setRazorpayOrderId(request.getRazorpayOrderId());
            paymentDetails.setRazorpayPaymentId(request.getRazorpayOrderPaymentId());
            paymentDetails.setRazorpaySignature(request.getRazorpaySignature());
            paymentDetails.setStatus(PaymentDetails.PaymentStatus.COMPLETED);
            existingOrder = orderEntityRepository.save(existingOrder);
            return convertToResponse(existingOrder);
        }

        throw new RuntimeException("Payment verification failed");
    }
    private boolean verifyRazorpaySignature(String razorpayOrderId, String razorpayPaymentId, String razorpaySignature){
        return true;
    }
}
