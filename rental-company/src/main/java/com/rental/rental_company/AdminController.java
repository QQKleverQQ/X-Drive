package com.rental.rental_company;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    @Autowired
    private ReservationRepository reservationRepo;

    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @GetMapping("/reservations")
    public List<Reservation> getAll() {
        return reservationRepo.findAll();
    }

    @DeleteMapping("/reservations/{id}")
    @Transactional
    public void deleteReservation(@PathVariable Long id) {
        reservationRepo.findById(id).ifPresent(reservation -> {
            Long customerId = reservation.getCustomerId();
            
            jdbcTemplate.execute("SET FOREIGN_KEY_CHECKS = 0");
            
            reservationRepo.deleteById(id);
            
            if (customerId != null) {
                customerRepo.deleteById(customerId);
            }
            
            jdbcTemplate.execute("SET FOREIGN_KEY_CHECKS = 1");
        });
    }

    @PostMapping("/clear-all")
    @Transactional
    public void clearAll() {
        jdbcTemplate.execute("SET FOREIGN_KEY_CHECKS = 0");

        jdbcTemplate.execute("TRUNCATE TABLE payments");
        jdbcTemplate.execute("TRUNCATE TABLE reservations");
        jdbcTemplate.execute("TRUNCATE TABLE customers");

        jdbcTemplate.execute("ALTER TABLE reservations AUTO_INCREMENT = 1");
        jdbcTemplate.execute("ALTER TABLE customers AUTO_INCREMENT = 1");

        jdbcTemplate.execute("SET FOREIGN_KEY_CHECKS = 1");
        
        System.out.println("Database has been forcefully reset and counters set to 1");
    }
}