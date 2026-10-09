package com.aurelia.resort.controller;

import com.aurelia.resort.dto.ApiResponse;
import com.aurelia.resort.entity.Activity;
import com.aurelia.resort.service.ActivityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/activities")
public class ActivityController {

    @Autowired
    private ActivityService activityService;

    @GetMapping
    public ResponseEntity<ApiResponse<List<Activity>>> getAllActivities() {
        List<Activity> activities = activityService.getAllActivities();
        return ResponseEntity.ok(ApiResponse.success(activities));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<Activity>> getActivityById(@PathVariable UUID id) {
        Activity activity = activityService.getActivityById(id);
        return ResponseEntity.ok(ApiResponse.success(activity));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Activity>> createActivity(@RequestBody Activity activity) {
        Activity created = activityService.createActivity(activity);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Experience activity added successfully", created));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Activity>> updateActivity(@PathVariable UUID id, @RequestBody Activity activity) {
        Activity updated = activityService.updateActivity(id, activity);
        return ResponseEntity.ok(ApiResponse.success("Experience activity updated", updated));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> deleteActivity(@PathVariable UUID id) {
        activityService.deleteActivity(id);
        return ResponseEntity.ok(ApiResponse.success("Experience activity removed", null));
    }
}
