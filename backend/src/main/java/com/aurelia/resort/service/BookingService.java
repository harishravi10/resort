package com.aurelia.resort.service;

import com.aurelia.resort.dto.BookingDto;
import com.aurelia.resort.entity.Booking;
import com.aurelia.resort.entity.Room;
import com.aurelia.resort.entity.User;
import com.aurelia.resort.exception.BadRequestException;
import com.aurelia.resort.exception.ResourceNotFoundException;
import com.aurelia.resort.repository.BookingRepository;
import com.aurelia.resort.repository.RoomRepository;
import com.aurelia.resort.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
public class BookingService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    public List<BookingDto> getAllBookings() {
        return bookingRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public List<BookingDto> getBookingsByUserId(UUID userId) {
        return bookingRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(this::mapToDto)
                .collect(Collectors.toList());
    }

    public BookingDto getBookingById(UUID id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking reservation not found with ID: " + id));
        return mapToDto(booking);
    }

    @Transactional
    public BookingDto createBooking(UUID userId, BookingDto dto) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        Room room = roomRepository.findById(dto.getRoomId())
                .orElseThrow(() -> new ResourceNotFoundException("Villa not found with ID: " + dto.getRoomId()));

        if (!room.getAvailable()) {
            throw new BadRequestException("This villa has already been reserved for those dates.");
        }

        if (dto.getCheckIn().isAfter(dto.getCheckOut()) || dto.getCheckIn().isEqual(dto.getCheckOut())) {
            throw new BadRequestException("Check-out date must be strictly after the check-in date.");
        }

        long nights = ChronoUnit.DAYS.between(dto.getCheckIn(), dto.getCheckOut());
        if (nights < 1) nights = 1;

        BigDecimal totalPrice = room.getPricePerNight().multiply(BigDecimal.valueOf(nights));

        Booking booking = new Booking();
        booking.setUser(user);
        booking.setRoom(room);
        booking.setCheckIn(dto.getCheckIn());
        booking.setCheckOut(dto.getCheckOut());
        booking.setGuests(dto.getGuests() != null ? dto.getGuests() : 2);
        booking.setTotalPrice(totalPrice);
        booking.setStatus("CONFIRMED");
        booking.setSpecialRequests(dto.getSpecialRequests());

        Booking saved = bookingRepository.save(booking);
        return mapToDto(saved);
    }

    @Transactional
    public BookingDto cancelBooking(UUID bookingId, UUID currentUserId, boolean isAdmin) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking reservation not found with ID: " + bookingId));

        if (!isAdmin && !booking.getUser().getId().equals(currentUserId)) {
            throw new BadRequestException("You are not authorized to cancel this reservation.");
        }

        booking.setStatus("CANCELLED");
        Booking updated = bookingRepository.save(booking);
        return mapToDto(updated);
    }

    @Transactional
    public BookingDto updateBookingStatus(UUID bookingId, String newStatus) {
        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResourceNotFoundException("Booking reservation not found with ID: " + bookingId));

        booking.setStatus(newStatus.toUpperCase());
        Booking updated = bookingRepository.save(booking);
        return mapToDto(updated);
    }

    @Transactional
    public void deleteBooking(UUID id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking reservation not found with ID: " + id));
        bookingRepository.delete(booking);
    }

    public BookingDto mapToDto(Booking b) {
        BookingDto dto = new BookingDto();
        dto.setId(b.getId());
        if (b.getUser() != null) {
            dto.setUserId(b.getUser().getId());
            dto.setUserName(b.getUser().getName());
            dto.setUserEmail(b.getUser().getEmail());
        }
        if (b.getRoom() != null) {
            dto.setRoomId(b.getRoom().getId());
            dto.setRoomName(b.getRoom().getName());
            dto.setRoomType(b.getRoom().getRoomType());
            dto.setRoomImage(b.getRoom().getImageUrl());
        }
        dto.setCheckIn(b.getCheckIn());
        dto.setCheckOut(b.getCheckOut());
        dto.setGuests(b.getGuests());
        dto.setTotalPrice(b.getTotalPrice());
        dto.setStatus(b.getStatus());
        dto.setSpecialRequests(b.getSpecialRequests());
        return dto;
    }
}
