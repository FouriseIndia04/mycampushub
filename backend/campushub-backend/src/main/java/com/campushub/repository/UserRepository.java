package com.campushub.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.campushub.model.User;

public interface UserRepository extends MongoRepository<User, String> {

}