package com.campushub.repository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.campushub.model.Event;

public interface EventRepository extends MongoRepository<Event, String> {

}