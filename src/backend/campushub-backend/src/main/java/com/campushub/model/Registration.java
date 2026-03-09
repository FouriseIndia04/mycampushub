package com.campushub.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "registrations")

public class Registration {

    @Id
    private String id;

    private String eventId;
    private String studentId;

}