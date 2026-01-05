package com.rental.rental_company;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class VehicleController {

    private final VehicleRepository repo;

    public VehicleController(VehicleRepository repo) {
        this.repo = repo;
    }

    @GetMapping("/vehicles")
    public List<Vehicle> vehicles(@RequestParam(required = false) String city) {
        if (city != null && !city.isBlank()) {
            return repo.findByCity(city);
        }
        return repo.findAllWithCity();
    }
}