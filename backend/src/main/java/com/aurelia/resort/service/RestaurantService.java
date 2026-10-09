package com.aurelia.resort.service;

import com.aurelia.resort.entity.Restaurant;
import com.aurelia.resort.exception.ResourceNotFoundException;
import com.aurelia.resort.repository.RestaurantRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class RestaurantService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public Restaurant getRestaurantById(UUID id) {
        return restaurantRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Restaurant venue not found with ID: " + id));
    }

    @Transactional
    public Restaurant createRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    @Transactional
    public Restaurant updateRestaurant(UUID id, Restaurant details) {
        Restaurant rest = getRestaurantById(id);
        rest.setName(details.getName());
        rest.setDescription(details.getDescription());
        rest.setCuisine(details.getCuisine());
        rest.setTimings(details.getTimings());
        rest.setDressCode(details.getDressCode());
        rest.setFeaturedDish(details.getFeaturedDish());
        rest.setImageUrl(details.getImageUrl());
        return restaurantRepository.save(rest);
    }

    @Transactional
    public void deleteRestaurant(UUID id) {
        Restaurant rest = getRestaurantById(id);
        restaurantRepository.delete(rest);
    }
}
