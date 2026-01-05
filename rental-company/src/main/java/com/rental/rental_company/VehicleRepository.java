package com.rental.rental_company;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface VehicleRepository extends JpaRepository<Vehicle, Long> {

    @Query("""
        SELECT v
        FROM Vehicle v
        JOIN FETCH v.city c
        WHERE LOWER(c.name) = LOWER(:city)
    """)
    List<Vehicle> findByCity(@Param("city") String city);

    @Query("""
        SELECT v
        FROM Vehicle v
        JOIN FETCH v.city
    """)
    List<Vehicle> findAllWithCity();
}