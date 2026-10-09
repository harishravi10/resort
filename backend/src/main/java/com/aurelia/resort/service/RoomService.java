package com.aurelia.resort.service;

import com.aurelia.resort.entity.Room;
import com.aurelia.resort.exception.ResourceNotFoundException;
import com.aurelia.resort.repository.RoomRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.UUID;

@Service
public class RoomService {

    @Autowired
    private RoomRepository roomRepository;

    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    public List<Room> getAvailableRooms() {
        return roomRepository.findByAvailableTrue();
    }

    public Room getRoomById(UUID id) {
        return roomRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Villa or room not found with ID: " + id));
    }

    @Transactional
    public Room createRoom(Room room) {
        return roomRepository.save(room);
    }

    @Transactional
    public Room updateRoom(UUID id, Room roomDetails) {
        Room room = getRoomById(id);
        room.setName(roomDetails.getName());
        room.setDescription(roomDetails.getDescription());
        room.setRoomType(roomDetails.getRoomType());
        room.setPricePerNight(roomDetails.getPricePerNight());
        room.setCapacity(roomDetails.getCapacity());
        room.setSizeSqft(roomDetails.getSizeSqft());
        room.setViewType(roomDetails.getViewType());
        room.setImageUrl(roomDetails.getImageUrl());
        room.setGallery(roomDetails.getGallery());
        room.setAmenities(roomDetails.getAmenities());
        room.setAvailable(roomDetails.getAvailable());
        if (roomDetails.getRating() != null) {
            room.setRating(roomDetails.getRating());
        }
        return roomRepository.save(room);
    }

    @Transactional
    public void deleteRoom(UUID id) {
        Room room = getRoomById(id);
        roomRepository.delete(room);
    }
}
