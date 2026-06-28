package in.vittalkumar.billingsoftware.repository;

import in.vittalkumar.billingsoftware.entity.CategoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

    Optional<CategoryEntity> findByCategoryId(String categoryId);

    boolean existsByName(String name);
}
