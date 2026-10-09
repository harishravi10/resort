package com.aurelia.resort.repository;

import com.aurelia.resort.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;

@Repository
public interface BookingRepository extends JpaRepository<Booking, UUID> {
    List<Booking> findByUserIdOrderByCreatedAtDesc(UUID userId);
    List<Booking> findAllByOrderByCreatedAtDesc();

    @Query("SELECT COALESCE(SUM(b.totalPrice), 0) FROM Booking b WHERE b.status <> 'CANCELLED'")
    BigDecimal calculateTotalRevenue();

    Long countByStatus(String status);
}
