# Booking Platform Backend

A microservices-based booking platform with the following services:

## Services

- **Auth Service** (Port 4000) - User authentication and authorization
- **Booking Service** (Port 4001) - Hotel booking management
- **Hotel Service** (Port 4002) - Hotel information and search
- **Payment Service** (Port 4003) - Payment processing with Stripe
- **Review Service** (Port 4004) - Hotel reviews and ratings

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)

## Quick Start

1. **Start all services with Docker Compose:**
   ```bash
   cd backend/booking-platform
   docker-compose up --build
   ```

2. **Initialize databases (run in each service container):**
   ```bash
   # For each service, run:
   docker exec -it <service-name> npx prisma generate
   docker exec -it <service-name> npx prisma db push
   ```

## API Endpoints

### Auth Service (Port 4000)
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Booking Service (Port 4001)
- `GET /api/bookings` - Get all bookings
- `POST /api/bookings` - Create new booking
- `GET /api/bookings/:id` - Get booking by ID
- `PUT /api/bookings/:id` - Update booking
- `DELETE /api/bookings/:id` - Delete booking
- `GET /api/bookings/user/:userId` - Get user bookings
- `GET /api/bookings/hotel/:hotelId` - Get hotel bookings
- `POST /api/bookings/:id/cancel` - Cancel booking

### Hotel Service (Port 4002)
- `GET /api/hotels` - Get all hotels
- `POST /api/hotels` - Create new hotel
- `GET /api/hotels/:id` - Get hotel by ID
- `PUT /api/hotels/:id` - Update hotel
- `DELETE /api/hotels/:id` - Delete hotel
- `GET /api/hotels/search` - Search hotels

### Payment Service (Port 4003)
- `POST /api/payments/process` - Process payment
- `GET /api/payments/:id` - Get payment by ID
- `GET /api/payments/user/:userId` - Get user payments
- `POST /api/payments/:id/refund` - Refund payment
- `GET /api/payments/:id/status` - Get payment status
- `POST /api/payments/create-intent` - Create payment intent

### Review Service (Port 4004)
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Create new review
- `GET /api/reviews/:id` - Get review by ID
- `PUT /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review
- `GET /api/reviews/hotel/:hotelId` - Get hotel reviews
- `GET /api/reviews/user/:userId` - Get user reviews
- `GET /api/reviews/hotel/:hotelId/average` - Get average rating

## Environment Variables

Create a `.env` file in each service directory with:

```env
DATABASE_URL="postgres://postgres:postgres@postgres:5432/booking"
JWT_SECRET="your-secret-key"
STRIPE_SECRET_KEY="your-stripe-secret-key"  # For payment service
```

## Development

To run services individually for development:

```bash
cd services/<service-name>
npm install
npm run dev
```

## Database

All services use PostgreSQL. The database is shared across all services and managed by Docker Compose.

## Notes

- All services use Prisma as ORM
- Input validation is handled with Zod
- JWT is used for authentication
- Stripe is integrated for payments 