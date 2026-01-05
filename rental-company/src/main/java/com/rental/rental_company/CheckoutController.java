package com.rental.rental_company;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/checkout")
@CrossOrigin("*") 
public class CheckoutController {

    @Autowired 
    private CustomerRepository customerRepo;
    
    @Autowired 
    private ReservationRepository reservationRepo; 

    @PostMapping("/submit")
    @Transactional
    public String processBooking(@RequestBody BookingRequest request) {
        try {
            Customer customer = new Customer();
            customer.setFullName(request.fullName);
            customer.setEmail(request.email);
            customer.setPhone(request.phone);
            customer.setLicenseNumber(request.licenseNumber);
            
            Customer savedCustomer = customerRepo.save(customer);

            Reservation res = new Reservation();
            res.setCustomerId(savedCustomer.getId());
            res.setVehicleId(request.vehicleId);
            res.setTotalPrice(request.totalPrice);
            res.setStatus("PENDING");
            
            if (request.startDatetime != null && !request.startDatetime.isEmpty()) {
                res.setStartDatetime(LocalDateTime.parse(request.startDatetime));
            } else {
                res.setStartDatetime(LocalDateTime.now());
            }

            if (request.endDatetime != null && !request.endDatetime.isEmpty()) {
                res.setEndDatetime(LocalDateTime.parse(request.endDatetime));
            } else {
                res.setEndDatetime(LocalDateTime.now().plusDays(1));
            }

            Reservation savedRes = reservationRepo.save(res);

            return "Success! Booking ID: " + savedRes.getId();

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error processing booking: " + e.getMessage());
        }
    }
}