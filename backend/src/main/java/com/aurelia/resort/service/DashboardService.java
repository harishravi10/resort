package com.aurelia.resort.service;

import com.aurelia.resort.dto.BookingDto;
import com.aurelia.resort.dto.DashboardStatsDto;
import com.aurelia.resort.repository.BookingRepository;
import com.aurelia.resort.repository.RoomRepository;
import com.aurelia.resort.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookingService bookingService;

    public DashboardStatsDto getDashboardStats() {
        long totalBookings = bookingRepository.count();
        long activeBookings = bookingRepository.countByStatus("CONFIRMED");
        long totalUsers = userRepository.count();
        long totalRooms = roomRepository.count();
        long availableRooms = roomRepository.findByAvailableTrue().size();

        BigDecimal totalRevenue = bookingRepository.calculateTotalRevenue();

        double occupancyRate = 0.0;
        if (totalRooms > 0) {
            occupancyRate = Math.round(((double) (totalRooms - availableRooms) / totalRooms * 100.0) * 10.0) / 10.0;
        }

        List<BookingDto> recentBookings = bookingService.getAllBookings();
        if (recentBookings.size() > 5) {
            recentBookings = recentBookings.subList(0, 5);
        }

        DashboardStatsDto stats = new DashboardStatsDto();
        stats.setTotalBookings(totalBookings);
        stats.setActiveBookings(activeBookings);
        stats.setTotalUsers(totalUsers);
        stats.setAvailableRooms(availableRooms);
        stats.setTotalRevenue(totalRevenue != null ? totalRevenue : BigDecimal.ZERO);
        stats.setOccupancyRate(occupancyRate);
        stats.setRecentBookings(recentBookings);

        return stats;
    }
}
