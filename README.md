# Workshop Booking System (Monorepo)

This project is a **full-stack booking system** built using **NestJS (backend)** and **Next.js (frontend)**, managed via **Turborepo**. It includes configuration management, authentication, and full test coverage (unit + end-to-end), following **strict ESLint and TypeScript rules**.


### 🛠 Tech Stack

| Layer / Purpose         | Technology / Tool      |
|-------------------------|------------------------|
| Backend                 | NestJS                 |
| Frontend                | Next.js                |
| Database / ORM          | PostgreSQL, Prisma     |
| Containerization / Dev  | Docker                 |
| State Management / Data | React Query            |
| Styling / UI            | TailwindCSS            |
| UI Components           | shadcn/ui              |
| Testing                 | Jest                   |
| Api Documentation       | Swagger                |

## 🏷️ Features Overview

### ✅ Highlights
- Authentication
- Booking system with validations
- Cancel booking system via email with validations
- Web socket to manage booking list fetching (admin page)
- Web socket to manage booking seat notification (full or available)
- Leaflet GIS map location detail using data from [nced.onep](https://nced.onep.go.th/dashboard.html)

### 🎫 Booking System (User)

- **Book Tickets**
  - Users can book a ticket by providing **name** and **email**.
  - **Uniqueness Validation**: Both name and email must be unique.  
    - If already booked, the system will display a **notification alert**.
  - **Capacity Validation**: Booking is not allowed if the total booked tickets reach the **maximum capacity**.  
    - A **notification alert** will inform users when tickets are full.

- **Cancel Booking**
  - Users can cancel a booking by providing their **email**.
  - **Email Validation**:
    - Checks for correct email format.
    - Checks if the email exists in the booking database.
  - Notifications will inform users whether the cancellation is **successful** or **failed**.

- **Optimized Frontend**
  - Uses **React Query** for caching booking data and reducing redundant API calls.
  - Uses **WebSockets** for:
    - Real-time notification when tickets are full or available.
    - Re-rendering booking lists dynamically for all users without manual refresh.

- **GIS Map Integration**
  - Displays a map using **Leaflet**.
  - Shows markers for locations in Thailand, loaded from a **static file** within the workshop.
  - Includes **UI controls** to switch between different static location files.

### 👩‍💼 Admin Panel

- **Authentication**
  - Admin login is required to access:
    - Booking list page
    - Booking configuration page
  - Ensures only authorized admins can manage bookings.

- **Booking List Page**
  - Shows the **current capacity** and **available seats**.
  - Lists all **booked tickets** with name and email.
  - Dynamically updates the list using **WebSockets** + **React Query**.

- **Booking Configuration Page**
  - Displays the **maximum booking capacity**.
  - Admins can **edit the capacity**, which will instantly reflect on the booking system.

## ⚠️ Workshop requirements

Before starting, make sure you have:

- **Docker** (for development environment and test database)  
  [Install Docker](https://www.docker.com/get-started)

- **pnpm** (package manager for Turborepo monorepos)  
  If not installed:

  ```bash
  npm install -g pnpm
  ```


## 🚀 Quick Start
1. Clone and enter workshop
 ```bash
  git clone https://github.com/KanitGotoWin/nextjs-nestjs-booking-system.git
  cd nextjs-nestjs-booking-system
 ```

2. Install packages
 ```bash
   pnpm i
 ```

3. Start development and testing environments (🐳 Docker)
 ```bash
   docker-compose up -d --build
 ```

4. Launch to generate prisma client, run seed, migration and start HTTP server
 ```bash
   pnpm launch
 ```

### For next development you can run this, so it will not re generate prisma client and run seed
 ```bash
   pnpm dev
 ```

## 🧪 Swagger API Documentation
**Note:** 5005 is your nestjs port <br>
http://localhost:5005/api


## 🧪 Testing
This project uses **Jest** for unit testing and **Supertest** for end-to-end (E2E) testing.<br>
All data of e2e testing runs within docker test database so make sure it is already running (db-test)
#### Unit Tests - Run with:
```bash
pnpm test
```

#### E2E Tests - Run with:
This will run the e2e test after generate jwt-secret into .env.test, run migration and run seed into test database
```bash
pnpm test:e2e-full
```
 
### Test Database After E2E Tests
After running all E2E tests, the test these tables should contain the following data <br>
To inspect the database and see the test result, run:
```bash
pnpm studio:test
```

### Booking Table

| id | name     | email                 |
|----|----------|-----------------------|
| 1  | Alice    | alice@example.com     |

> There is only alice@example.com is booked 

### BookingConfig Table

| id  | key      | value |
|-----|----------|-------|
| 1   | capacity | 50    |

> There is only key capacity with value 50 stored
