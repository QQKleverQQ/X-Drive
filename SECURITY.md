# Security Policy

##  Project Security Overview
DriveX is a student-led project. While it is not intended for production use, we take security seriously and follow industry best practices for web application development.

##  Supported Versions
We currently provide security updates only for the main branch.

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   |  Yes             |
| < 1.0   |  No              |

##  Security Measures Implemented

* **SQL Injection Prevention**: All database interactions are handled via **Spring Data JPA** and **JPQL/Prepared Statements** to prevent malicious SQL execution.
* **Input Validation**: Frontend and backend validation ensure that only correctly formatted dates, emails, and data types are processed.
* **Data Integrity**: Foreign key constraints in **MySQL** prevent orphaned records and ensure consistent booking data.
* **Sensitive Information**: Configuration files containing database credentials are listed in `.gitignore` to prevent accidental exposure on GitHub.

##  Reporting a Vulnerability
If you discover a security vulnerability, please follow these steps:
1. **Do not** open a public issue. Instead, contact the maintainer directly via GitHub profile contact details.
2. Provide a detailed description of the vulnerability and steps to reproduce it.
3. We will acknowledge your report and work on a fix as soon as possible.

##  Disclaimer
This application is for **educational purposes only**. It should not be used to process real payments or store sensitive personal identification information (PII) without further security hardening (e.g., implementing OAuth2/JWT, HTTPS, and password hashing).
