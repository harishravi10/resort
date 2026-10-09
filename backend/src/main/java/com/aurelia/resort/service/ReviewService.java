package com.aurelia.resort.service;

import com.aurelia.resort.entity.Review;
import com.aurelia.resort.entity.User;
import com.aurelia.resort.repository.ReviewRepository;
import com.aurelia.resort.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;

    @Autowired
    private UserRepository userRepository;

    public List<Review> getAllReviews() {
        return reviewRepository.findAllByOrderByCreatedAtDesc();
    }

    @Transactional
    public Review createReview(UUID userId, Review review) {
        if (userId != null) {
            User user = userRepository.findById(userId).orElse(null);
            if (user != null) {
                review.setUser(user);
                if (review.getUserName() == null || review.getUserName().isBlank()) {
                    review.setUserName(user.getName());
                }
            }
        }
        return reviewRepository.save(review);
    }
}
