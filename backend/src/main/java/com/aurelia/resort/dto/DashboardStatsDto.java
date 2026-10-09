package com.aurelia.resort.dto;

import java.math.BigDecimal;
import java.util.List;

public class DashboardStatsDto {

    private Long totalBookings;
    private Long activeBookings;
    private Long totalUsers;
    private Long availableRooms;
    private BigDecimal totalRevenue;
    private Double occupancyRate;
    private List<BookingDto> recentBookings;

    public DashboardStatsDto() {}

    public Long getTotalBookings() { return totalBookings; }
    public void setTotalBookings(Long totalBookings) { this.totalBookings = totalBookings; }

    public Long getActiveBookings() { return activeBookings; }
    public void setActiveBookings(Long activeBookings) { this.activeBookings = activeBookings; }

    public Long getTotalUsers() { return totalUsers; }
    public void setTotalUsers(Long totalUsers) { this.totalUsers = totalUsers; }

    public Long getAvailableRooms() { return availableRooms; }
    public void setAvailableRooms(Long availableRooms) { this.availableRooms = availableRooms; }

    public BigDecimal getTotalRevenue() { return totalRevenue; }
    public void setTotalRevenue(BigDecimal totalRevenue) { this.totalRevenue = totalRevenue; }

    public Double getOccupancyRate() { return occupancyRate; }
    public void setOccupancyRate(Double occupancyRate) { this.occupancyRate = occupancyRate; }

    public List<BookingDto> getRecentBookings() { return recentBookings; }
    public void setRecentBookings(List<BookingDto> recentBookings) { this.recentBookings = recentBookings; }
}
