package in.vittalkumar.billingsoftware.service;

import org.springframework.web.multipart.MultipartFile;

public interface FileUploadService {

    String uploadFile(MultipartFile file);

    boolean deleteFile(String imgUrl);

    String getSignedUrl(String imgUrl);

}
