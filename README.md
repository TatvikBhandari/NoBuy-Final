# NO-BUY – Peer-to-Peer Rental Marketplace

**Rent What You Need. Earn From What You Own.**

No-Buy is a peer-to-peer equipment rental platform designed for the Indian market. It connects people who own equipment with people who need it temporarily, allowing users to rent products instead of purchasing them.

The platform provides a unified marketplace where anyone can both list their own products for rent and rent products from other users. It aims to make equipment sharing more accessible, affordable, and convenient through location-based discovery, rental management, price negotiation, and simulated payment processing.

---

## ✨ Key Features

- **User Authentication:** Secure registration, login, and JWT-based authentication.
- **Dual User Functionality:** Every user can act as both a renter and a product owner using a single account.
- **Product Listings:** List equipment with descriptions, categories, rental prices, security deposits, condition, location, and images.
- **Product Discovery:** Browse and explore available rental products across different categories.
- **Location-Based Marketplace:** Discover products based on their listed locations, making nearby rentals easier.
- **Booking Management:** Send rental requests, approve or reject requests, and manage rental status.
- **Price Negotiation:** Allow renters and product owners to negotiate rental prices through offers and counter-offers.
- **Simulated Payments:** Checkout with simulated Card, UPI, Net Banking, and Wallet payment options.
- **Security Deposit Management:** Track deposits through a simulated escrow workflow, including release and refund outcomes.
- **Return Management:** Manage product returns, inspect item conditions, and calculate applicable damage fees and deposit refunds.
- **Reviews & Ratings:** Allow users to share feedback after completed rentals.
- **Dashboard:** Manage listings, rental requests, bookings, negotiations, payments, and account activity.
- **Notifications:** Receive updates about bookings, negotiations, payments, and other platform activities.

---

## 🛠️ Technology Stack

| Layer | Technologies |
|---|---|
| Frontend | React.js, Vite, JavaScript |
| Backend | Python, Flask |
| Database | MySQL |
| Authentication | JWT (JSON Web Tokens) |
| API Communication | REST APIs |
| Styling | CSS |
| Development Tools | VS Code, MySQL Workbench, Git, GitHub |

---

## 🏗️ System Architecture

No-Buy follows a client-server architecture.

1. **Frontend:** React provides the user interface and communicates with the backend through API requests.
2. **Backend:** Flask handles business logic, authentication, product management, bookings, negotiations, and other application operations.
3. **Database:** MySQL stores persistent application data, including users, products, bookings, payments, and reviews.

The frontend and backend communicate through RESTful APIs, while the backend interacts with MySQL using a database connection pool.

---

## 📦 Project Modules

The application is divided into nine major backend modules:

| Module | Description |
|---|---|
| Authentication | Registration, login, and user authentication |
| Products | Product listing, browsing, updating, and image uploads |
| Bookings | Rental requests and booking status management |
| Negotiations | Rental price offers and counter-offers |
| Payments | Simulated checkout and escrow management |
| Returns | Product return requests and inspection |
| Reviews | Ratings and feedback management |
| Dashboard | User activity and rental management |
| Notifications | In-app alerts and activity updates |

---

## 🗄️ Database Design

The project uses **MySQL** as its relational database management system.

The database is named `nobuy_db` and contains eight primary tables:

| Table | Purpose |
|---|---|
| users | Stores user accounts and profile information |
| products | Stores product listings and rental details |
| bookings | Stores rental requests and booking information |
| negotiations | Stores rental offers and counter-offers |
| payments | Stores simulated payment and escrow records |
| returns | Stores return inspections and deposit outcomes |
| reviews | Stores ratings and user feedback |
| notifications | Stores in-app notifications |

The database uses foreign keys, indexes, and relational constraints to maintain data integrity.

The database schema is available in `backend/schema.sql`.

---

## 📁 Project Structure

```text
NoBuy-Final/
│
├── backend/
│   ├── routes/
│   │   ├── auth.py
│   │   ├── products.py
│   │   ├── bookings.py
│   │   ├── negotiations.py
│   │   ├── payments.py
│   │   ├── returns.py
│   │   ├── reviews.py
│   │   ├── dashboard.py
│   │   └── notifications.py
│   │
│   ├── utils/
│   ├── uploads/
│   ├── app.py
│   ├── config.py
│   ├── db.py
│   ├── init_db.py
│   ├── schema.sql
│   └── requirements.txt
│
├── frontend/
│   ├── public/
│   ├── src/
│   ├── index.html
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

Follow these instructions to run the project locally.

### 1. Prerequisites

Make sure the following software is installed:

- Python 3.10 or later
- Node.js and npm
- MySQL Server 8.x
- MySQL Workbench
- Git

### 2. Clone the Repository

```bash
git clone https://github.com/TatvikBhandari/NoBuy-Final.git
```

Navigate to the project directory:

```bash
cd NoBuy-Final
```

### 3. Configure MySQL Database

Open MySQL Workbench and connect to your local MySQL server.

Execute the following SQL commands:

```sql
CREATE DATABASE nobuy_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;
```

Make sure your MySQL server is running before starting the backend.

### 4. Configure Backend Environment

Navigate to the backend directory:

```bash
cd backend
```

Install the required Python dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file inside the `backend` directory with the following configuration:

```env
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=your_mysql_password
MYSQL_DB=nobuy_db
MYSQL_COLLATION=utf8mb4_general_ci

JWT_SECRET_KEY=your_secure_jwt_secret
SECRET_KEY=your_secure_flask_secret

JWT_ACCESS_TOKEN_EXPIRES_HOURS=72
```

Replace `your_mysql_password` with your actual MySQL password.

**Important:** Never upload your `.env` file or expose database credentials on GitHub.

### 5. Initialize the Database

From the `backend` directory, execute:

```bash
python init_db.py
```

This initializes the database schema and creates the required tables.

### 6. Start the Backend Server

Run:

```bash
python app.py
```

The Flask backend will run at:

```text
http://127.0.0.1:5000
```

You can check the backend and database connection using:

```text
http://127.0.0.1:5000/api/health
```

### 7. Start the Frontend

Open another terminal and navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

Open the application in your browser:

```text
http://localhost:5173
```

---

## 💳 Payment Disclaimer

No-Buy implements a simulated payment system for demonstration and academic purposes.

It does not integrate with real payment gateways or process actual financial transactions. Payment records, transaction IDs, and escrow statuses are generated and maintained within the application.

---

## 🔒 Security

- JWT-based authentication.
- Password hashing.
- Protected API endpoints.
- User-specific authorization checks.
- Relational database constraints.
- Environment-based configuration for sensitive credentials.

---

## 🎯 Project Objective

The primary objective of No-Buy is to encourage a rental-based approach to equipment usage rather than unnecessary ownership.

The platform provides a digital marketplace that allows users to access equipment when required, generate income from unused products, and manage the complete rental lifecycle through a single application.

---

## 🚀 Future Enhancements

- Integration with real payment gateways.
- Real-time chat between renters and product owners.
- Advanced location-based search and map integration.
- Email and SMS notifications.
- Cloud-based image storage.
- Advanced analytics and rental insights.

---

## 👨‍💻 Project Information

**Project Name:** No-Buy  
**Project Type:** Peer-to-Peer Rental Marketplace  
**Course:** UCS503 – Software Engineering  
**Repository:** [NoBuy-Final](https://github.com/TatvikBhandari/NoBuy-Final)

---

## 📄 License

This project is licensed under the MIT License.
