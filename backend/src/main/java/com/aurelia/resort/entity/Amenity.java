package com.aurelia.resort.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "amenities")
public class Amenity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT")
    private String description;

    @Column(name = "image_url")
    private String imageUrl;

    private String icon;

    public Amenity() {}

    public Amenity(String name, String description, String imageUrl, String icon) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.icon = icon;
    }

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getIcon() { return icon; }
    public void setIcon(String icon) { this.icon = icon; }
}
