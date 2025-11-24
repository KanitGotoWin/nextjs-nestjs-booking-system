## 🧪 Test Database After E2E Tests
After running all E2E tests, the test database should contain the following data:

### Booking Table

| id | name     | email                 |
|----|----------|-----------------------|
| 1  | Alice    | alice@example.com     |

> There is only alice@example.com is booked 

### BookingConfig Table

| id  | key      | value | createdAt           | updatedAt           |
|-----|----------|-------|---------------------|---------------------|
| 1   | capacity | 50    | 2025-11-24 00:00:00 | 2025-11-24 00:00:00 |

> Configuration table retains the `capacity` value set during tests.