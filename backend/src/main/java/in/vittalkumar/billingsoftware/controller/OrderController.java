package in.vittalkumar.billingsoftware.controller;

import in.vittalkumar.billingsoftware.io.OrderRequest;
import in.vittalkumar.billingsoftware.io.OrderResponse;
import in.vittalkumar.billingsoftware.io.PaymentVerificationRequest;
import in.vittalkumar.billingsoftware.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/orders")
@RequiredArgsConstructor
public class OrderController {

    private final OrderService orderService;

    /** Extracts the logged-in user's email from the JWT token */
    private String currentUserEmail() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        return (auth != null) ? auth.getName() : null;
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public OrderResponse createOrder(@RequestBody OrderRequest request) {
        // Save order tagged to the user who is placing it
        return orderService.createOrder(request, currentUserEmail());
    }

    @ResponseStatus(HttpStatus.NO_CONTENT)
    @DeleteMapping("/{orderId}")
    public void deleteOrder(@PathVariable String orderId) {
        orderService.deleteOrder(orderId);
    }

    @GetMapping("/latest")
    public List<OrderResponse> getLatestOrders() {
        // Return ONLY orders belonging to the currently logged-in user
        return orderService.getLatestOrders(currentUserEmail());
    }

    /** Admin-only: returns ALL orders across all users with user names */
    @GetMapping("/admin/all")
    public List<OrderResponse> getAllOrders() {
        return orderService.getAllOrders();
    }

    @PostMapping("/verify")
    public OrderResponse verifyPayment(@RequestBody PaymentVerificationRequest request) {
        return orderService.verifyPayment(request);
    }
}
