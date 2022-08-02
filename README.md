# DonDra Backend
This is a repository for the backend of DonDra project.

# How to run this project
## Requirements
- Docker installed and running
- Internet connection
- Node.js installed and running
## Steps
1. Open a terminal from this project directory
2. Run `docker compose build`
3. Run `docker-compose up`
4. Open <a>http://localhost:3001/</a> in your browser
5. Backend is up and running

# How to seed the database
1. Run `npx ts-node typeorm/seed.ts`

# Techstacks used
1. ExpressJS (4.18.1)
2. TypeORM (0.3.7)
3. Docker
4. Jest (v28.1.3)
5. Node JS (v16.13.1)
6. PostgreSQL (v12.2.0)
7. Redis (using Upstash)

# DESIGN PATTERN
1. Factory
Factory digunakan untuk melakukan inisiasi database (seeding). Factory ini akan membuat objek yang diubah menjadi data yang akan diinsert ke database.
2. Singleton
Singleton digunakan pada objek jwt. Objek jwt hanya ada satu instance yang bertugas memverifikasi token dan membuat token.
3. Observer
Design pattern observer digunakan dalam pembuatan route/endpoint. Observer dalam konteks ini adalah objek app yang kemudian dapat ditambahkan endpoint/router yang sudah dibuat.

# Endpoints
All of the endpoints require token authentication except for login and register.
1. `/checkUser/:id` - Check if user with id `:id` exists
2. `/getAllUsers` - Get all users
3. `/getAllUsers/:id` - Get one user with the id `:id`
4. `getHistory/:id?page=:page` - Get all history of user with id `:id` with pagination from query.
5. `/getSaldo/:id` - Get the balance of user with id `:id`
6. `/getUnverifiedMoneytoring` - Get all unverified moneytoring from all user
7. `/getUnverifiedUsers` - Get all unverified users
8. `/login` - Login with username and password and return a token
9. `/register` - Register a new user
10. `/requestMoneytoring` - Send a add or substract balance request. Require body with `id`, `nominal`, and `isIncome`
11. `/transfer` - Transfer money from one user to another. Require body with `idPengirim`, `idPenerima`, and `nominal`
12. `/verifyMoneytoring/:idMoneytoring` - Verify moneytoring with id `:idMoneytoring`, admin can reject or approve the request. Require body with `isRejected`
13. `/verifyUser/:id` - Verify user with id `:id` 

# How to use the system
1. Call `/login` to get a token
2. Call `/register` to register a new user
3. Use all the APIs by providing token

# Notes
1. The token is valid for 24 hours
2. If you want to use your own `REDIS_URL` or `DATABASE_URL` or `PORT` variables, you can create `.env` file in the root directory and add it
3. This backend is deployed under <a>dondra-backend.herokuapp.com</a>