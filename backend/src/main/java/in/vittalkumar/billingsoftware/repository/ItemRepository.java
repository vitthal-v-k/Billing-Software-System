package in.vittalkumar.billingsoftware.repository;

import in.vittalkumar.billingsoftware.entity.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<ItemEntity, Long> {

    Optional<ItemEntity> findByItemId(String id);

    Integer countByCategoryId(Long id);

    List<ItemEntity> findByCategoryId(Long categoryId);
}
