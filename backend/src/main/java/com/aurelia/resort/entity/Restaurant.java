package com.aurelia.resort.entity;

import jakarta.persistence.*;
import java.util.UUID;

@Entity
@Table(name = "restaurants")
public class Restaurant {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @Column(nullable = false)
    private String cuisine;

    @Column(nullable = false)
    private String timings;

    @Column(name = "dress_code")
    private String dressCode = "Resort Elegant";

    @Column(name = "featured_dish")
    private String featuredDish;

    @Column(name = "image_url", nullable = false)
    private String imageUrl;

    public Restaurant() {}

    public UUID getId() { return id; }
    public void setId(UUID id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getCuisine() { return cuisine; }
    public void setCuisine(String cuisine) { this.cuisine = cuisine; }

    public String getTimings() { return timings; }
    public void setTimings(String timings) { this.timings = timings; }

    public String getDressCode() { return dressCode; }
    public void setDressCode(String dressCode) { this.dressCode = dressCode; }

    public String getFeaturedDish() { return featuredDish; }
    public void setFeaturedDish(String featuredDish) { this.featuredDish = featuredDish; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
}
