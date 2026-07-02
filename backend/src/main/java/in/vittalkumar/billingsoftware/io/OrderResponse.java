package in.vittalkumar.billingsoftware.io;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderResponse {


    private String orderId;
    private String customerName;
    private String phoneNumber;
    private String state;
    private String district;
    private String place;
    private List<OrderResponse.OrderItemResponse> items;
    private Double subtotal;
    private Double tax;
    private Double grandTotal;
    private PaymentMethod paymentMethod;
    private LocalDateTime createdAt;
    private PaymentDetails paymentDetails;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    @Builder
    public static class OrderItemResponse{

        private String itemId;
        private String name;
        private Double price;
        private Integer quantity;

    }
}
