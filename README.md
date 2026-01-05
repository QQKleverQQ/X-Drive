<p align="center">

  <img src="https://github.com/QQKleverQQ/X-Drive/blob/main/banner.png?raw=true" alt="DriveX Banner" width="100%">

</p>


DriveX | Premium Car Rental Platform
A full-stack web application for renting luxury vehicles. Built with a focus on smooth user experience, data integrity, and a clean dark-themed UI.

# Features 
Smart Location Sync: Seamlessly transitions city data (Vienna, NY, Moscow, Tel Aviv) across the entire booking flow using localStorage.

Bulletproof Date/Time Validation:

Prevents past date selection.

Real-time logic ensures the return date/time is always after the pickup time.

Prevents "time travel" bookings for the current day.

Dynamic UI: Hero sections and car listings update on-the-fly based on selected locations.

Admin Control: A dedicated interface to manage reservations and perform a "Hard Reset" of the database (clearing tables and resetting Auto-Increment IDs).

Automated Pricing: Real-time calculation of totals based on daily rates and selected insurance/extra options.

# Tech Stack 
Frontend: Vanilla JS (ES6+), HTML5, CSS3 (Custom properties, Flexbox/Grid).

Backend: Java 17, Spring Boot, Spring Data JPA.

Database: MySQL.

Tooling: Maven, Git.

# Setup & Installation
Prerequisites
JDK 17+

MySQL Server

Maven

1. Database Configuration
Create a schema named rental_cars in MySQL. Update src/main/resources/application.properties with your credentials:

Properties

spring.datasource.url=jdbc:mysql://localhost:3306/rental_cars
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
2. Run the Backend
From the rental-company directory:

Bash

mvn spring-boot:run
3. Access the App
The frontend is served from the static resources. Open your browser and go to:

Main App: http://localhost:8080/index.html

Admin Panel: http://localhost:8080/admin.html

# Project Structure
/src/main/java/.../ — Spring Boot controllers, repositories, and models.

/src/main/resources/static/ — Frontend assets (JS, CSS, HTML).

/src/main/resources/data.sql — Initial database seeds (Cars & Cities).
