package com.aurelia.resort.controller;

import com.aurelia.resort.dto.ApiResponse;
import com.aurelia.resort.entity.Review;
import com.aurelia.resort.security.UserPrincipal;
import com.aurelia.resort.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Review>>> getAllReviews() {
        List<Review> reviews = reviewService.getAllReviews();
        return ResponseEntity.ok(ApiResponse.success(reviews));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<Review>> createReview(
            @AuthenticationPrincipal UserPrincipal userPrincipal,
            @RequestBody Review review) {
        UUID userId = userPrincipal != null ? userPrincipal.getId() : null;
        Review created = reviewService.createReview(userId, review);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Thank you for sharing your experience at Aurelia.", created));
    }
}
