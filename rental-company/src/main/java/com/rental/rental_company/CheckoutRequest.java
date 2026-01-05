package com.rental.rental_company;

public record CheckoutRequest(
        Long vehicleId,
        String fullName,
        String phone,
        String email,
        String licenseNumber,
        String startDatetime,
        String endDatetime,
        double totalPrice
) {}
