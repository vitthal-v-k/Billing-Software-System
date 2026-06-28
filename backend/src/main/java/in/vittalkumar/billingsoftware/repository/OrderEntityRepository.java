package in.vittalkumar.billingsoftware.repository;

import in.vittalkumar.billingsoftware.entity.OrderEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface OrderEntityRepository extends JpaRepository<OrderEntity, Long> {

    Optional<OrderEntity> findByOrderId(String orderId);

    List<OrderEntity> findAllByOrderByCreatedAtDesc();

    /**
     * Returns all orders belonging to the given user.
     * Legacy orders (userId IS NULL, created before the multi-user fix) are
     * intentionally excluded — they belonged to no specific user.
     */
    @Query("SELECT o FROM OrderEntity o WHERE o.userId = :userId ORDER BY o.createdAt DESC")
    List<OrderEntity> findAllByUserIdOrderByCreatedAtDesc(@Param("userId") String userId);
}
