package com.campushub.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.campushub.model.Registration;

public interface RegistrationRepository extends MongoRepository<Registration, String> {

}