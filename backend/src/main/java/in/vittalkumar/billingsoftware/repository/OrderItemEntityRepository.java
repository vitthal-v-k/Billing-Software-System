package in.vittalkumar.billingsoftware.repository;

import in.vittalkumar.billingsoftware.entity.OrderItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemEntityRepository extends JpaRepository<OrderItemEntity, Long> {
}
