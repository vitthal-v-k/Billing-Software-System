package in.vittalkumar.billingsoftware.service;

import in.vittalkumar.billingsoftware.io.UserRequest;
import in.vittalkumar.billingsoftware.io.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse createUser(UserRequest request);
    String getUserRole(String email);
    List<UserResponse> readUser();
    void deleteUser(String id);
}
