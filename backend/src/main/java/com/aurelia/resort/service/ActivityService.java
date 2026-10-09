package com.aurelia.resort.service;

import com.aurelia.resort.entity.Activity;
import com.aurelia.resort.exception.ResourceNotFoundException;
import com.aurelia.resort.repository.ActivityRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class ActivityService {

    @Autowired
    private ActivityRepository activityRepository;

    public List<Activity> getAllActivities() {
        return activityRepository.findAll();
    }

    public Activity getActivityById(UUID id) {
        return activityRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Activity not found with ID: " + id));
    }

    @Transactional
    public Activity createActivity(Activity activity) {
        return activityRepository.save(activity);
    }

    @Transactional
    public Activity updateActivity(UUID id, Activity details) {
        Activity act = getActivityById(id);
        act.setName(details.getName());
        act.setDescription(details.getDescription());
        act.setPrice(details.getPrice());
        act.setDuration(details.getDuration());
        act.setCategory(details.getCategory());
        act.setImageUrl(details.getImageUrl());
        return activityRepository.save(act);
    }

    @Transactional
    public void deleteActivity(UUID id) {
        Activity act = getActivityById(id);
        activityRepository.delete(act);
    }
}
