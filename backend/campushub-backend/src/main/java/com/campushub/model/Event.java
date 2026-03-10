package com.campushub.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Data;

@Data
@Document(collection = "events")

public class Event {

    @Id
    private String id;

    private String title;
    private String category;
    private String date;
    private String venue;
    private String description;
    private String image;

    private String status;
    private int registrations;

}