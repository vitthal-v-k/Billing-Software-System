package in.vittalkumar.billingsoftware.service;

import in.vittalkumar.billingsoftware.io.ItemRequest;
import in.vittalkumar.billingsoftware.io.ItemResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface ItemService {

   ItemResponse add(ItemRequest request, MultipartFile file);

   List<ItemResponse> fetchItems();

   void deleteItem(String itemId);
}
