# 🎬 Movie Production Company Management System

This is a full-stack backend API built with **Node.js**, **TypeScript**, **Express**, and **TypeORM** for managing the operations of a movie production company. It provides endpoints to handle Movies, Persons, Contracts, Assignments, Awards, and more.

---

## 📁 Project Structure

```
├── config/                  # Database configuration (TypeORM)
│   └── configure.ts
├── entities/                # TypeORM entities (tables)
│   ├── Assignment.ts
│   ├── Award.ts
│   ├── Contact.ts
│   ├── Contract.ts
│   ├── Movie.ts
│   ├── MovieAward.ts
│   ├── Nationality.ts
│   ├── Person.ts
│   ├── PersonAward.ts
│   └── Role.ts
├── services/                # Business logic layer
│   └── *.ts (e.g., MovieService.ts)
├── controllers/            # Express controllers (API endpoints)
│   └── *.ts (e.g., movieAPIController.ts)
├── tests/                  # Unit and integration tests
│   └── *.test.ts
├── server.ts               # Entry point
└── README.md
```

---

## 🛠️ Technologies Used

- Node.js
- TypeScript
- Express.js
- TypeORM
- PostgreSQL
- Jest
- Supertest / Axios (for integration testing)
- Dotenv

---

## 🔌 Installation

1. **Clone the repository:**

```bash
git clone https://github.com/your-username/movie-production-system.git
cd movie-production-system
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create `.env` file:**

```env
DB_HOST=localhost
DB_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=yourpassword
POSTGRES_DB=movie_production_db
```

4. **Run the application:**

```bash
npm run dev
```

The app will run on `http://localhost:8000`.

---

## 🧩 API Endpoints

| Entity     | Base Route          | Description                  |
|------------|---------------------|------------------------------|
| Person     | `/api/persons`      | CRUD operations for people   |
| Movie      | `/api/movies`       | Manage movies                |
| Contract   | `/api/contracts`    | Person-movie contract info   |
| Assignment | `/api/assignments`  | Contract + role assignments  |
| Award      | `/api/awards`       | Award registry               |

---

## 🧪 Testing

### ▶ Unit Tests

- Located in `/tests/*.test.ts`
- Mocked services using `jest.fn()`

```bash
npm run test
```

### ▶ Integration Tests

- Full CRUD using `axios` and real API endpoints
- Each controller has a separate test file

Run integration tests (requires DB running):

```bash
npm run test:integration
```

---

## 📦 Sample Payloads

### Create Person
```json
{
  "name": "John Smith",
  "dob": "1980-01-01",
  "nationalityId": 1
}
```

### Create Movie
```json
{
  "title": "The Grand Finale",
  "releaseDate": "2025-01-01"
}
```

---

## 🧼 Scripts

| Command           | Description                |
|------------------|----------------------------|
| `npm run dev`     | Start the development server |
| `npm run test`    | Run all Jest unit tests    |
| `npm run build`   | Compile TypeScript         |

---

## 🏗️ To-Do

- Add Swagger API docs
- Implement authentication
- Role-based access control
- Pagination & filtering

---

## 👨‍💻 Author

Gautam Shrivastav  
📫 gshrivastav94@gmail.com  
🏠 Waterloo, Ontario, Canada

---

## 📜 License

This project is licensed under the MIT License.
