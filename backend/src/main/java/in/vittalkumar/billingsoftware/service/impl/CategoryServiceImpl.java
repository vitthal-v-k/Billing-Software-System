package in.vittalkumar.billingsoftware.service.impl;

import in.vittalkumar.billingsoftware.entity.CategoryEntity;
import in.vittalkumar.billingsoftware.entity.ItemEntity;
import in.vittalkumar.billingsoftware.io.CategoryRequest;
import in.vittalkumar.billingsoftware.io.CategoryResponse;
import in.vittalkumar.billingsoftware.repository.CategoryRepository;
import in.vittalkumar.billingsoftware.repository.ItemRepository;
import in.vittalkumar.billingsoftware.service.CategoryService;
import in.vittalkumar.billingsoftware.service.FileUploadService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;

    private final FileUploadService fileUploadService;

    private final ItemRepository itemRepository;


    @Override
    public CategoryResponse add(CategoryRequest request, MultipartFile file) {
       if (categoryRepository.existsByName(request.getName())) {
           throw new org.springframework.web.server.ResponseStatusException(
                   org.springframework.http.HttpStatus.CONFLICT, "Category name already exists");
       }
       String imgUrl = fileUploadService.uploadFile(file);
       CategoryEntity newCategory = convertToEntity(request);
       newCategory.setImgUrl(imgUrl);
       newCategory = categoryRepository.save(newCategory);
       return convertToResponse(newCategory);
    }

    @Override
    public List<CategoryResponse> read() {
       return categoryRepository.findAll()
                .stream()
                .map(categoryEntity -> convertToResponse(categoryEntity))
                .collect(Collectors.toList());
    }

    @Override
    public void delete(String categoryId) {
        CategoryEntity existingCategory = categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(() -> new RuntimeException("Category not found: " + categoryId));

        // Delete cloud images for every item in this category first
        List<ItemEntity> itemsInCategory = itemRepository.findByCategoryId(existingCategory.getId());
        for (ItemEntity item : itemsInCategory) {
            fileUploadService.deleteFile(item.getImgUrl());
        }

        // Delete the category's own image
        fileUploadService.deleteFile(existingCategory.getImgUrl());

        // Delete the category — DB cascade removes item rows automatically
        categoryRepository.delete(existingCategory);
    }

    private CategoryResponse convertToResponse(CategoryEntity newCategory) {
       Integer itemsCount = itemRepository.countByCategoryId(newCategory.getId());
       return CategoryResponse.builder()
                .categoryId(newCategory.getCategoryId())
                .name(newCategory.getName())
                .description(newCategory.getDescription())
                .bgColor(newCategory.getBgColor())
                .imgUrl(fileUploadService.getSignedUrl(newCategory.getImgUrl()))
                .createdAt(newCategory.getCreatedAt())
                .updatedAt(newCategory.getUpdatedAt())
                .items(itemsCount)
                .build();
    }

    private CategoryEntity convertToEntity(CategoryRequest request) {
         return CategoryEntity.builder()
                .categoryId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .bgColor(request.getBgColor())
                .build();
    }
}

