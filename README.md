# LaundryOS Dashboard

## Project Overview

LaundryOS is a simple operations dashboard built for a Quick Dry Cleaning (QDC) business. The application allows staff members to monitor customer orders, track garment processing statuses, and view operational summaries from a centralized dashboard.

The project consists of:

- React frontend dashboard
- NestJS backend API
- Order and garment status tracking
- Garment status summary endpoint
- Status-based garment filtering

This project was completed as part of the QDC internship assignment.

---

## Features

### Backend

- Retrieve all orders
- Retrieve an order by ID
- Generate garment status summaries
- REST API built using NestJS
- TypeScript-based implementation

### Frontend

- Dashboard statistics cards
- Garment status distribution section
- Order listing interface
- Search bar
- Status filtering functionality

Supported garment statuses:

- Received
- In Cleaning
- Ready
- Delivered

---

## Assignment Requirements

### Requirement 1 - Garment Status Summary API

Implemented a new endpoint:

GET /api/orders/summary

The endpoint calculates the number of garments in each status across all orders and returns the result as JSON.

Example:

```json
{
  "received": 1,
  "in_cleaning": 1,
  "ready": 1
}

Requirement 2 - Garment Status Filter UI

Implemented a filter system in the React frontend that allows users to display only garments matching a selected status.

Available filters:

All
Received
In Cleaning
Ready
Delivered

The UI updates dynamically and handles cases where no garments match the selected filter.

assignment-13-1780050387207
│
├── .git/
├── client/
├── server/
├── screenshots/
│   ├── dashboard-all.png
│   ├── filter-received.png
│   ├── filter-in-cleaning.png
│   ├── filter-ready.png
│   ├── filter-delivered.png
│   ├── api-orders.png
│   └── api-summary.png
│
├── README.md
├── ANSWERS.md
├── Dockerfile
├── package.json
└── package-lock.json

Installation

Backend
cd server
npm install
npm run dev

Backend runs on:

http://localhost:3001
Frontend

cd client
npm install
npm start

Frontend runs on:

http://localhost:3000

API Endpoints
Get All Orders
GET /api/orders

Returns all orders along with their garments.

Get Order By ID
GET /api/orders/:id
Returns a specific order.

Get Garment Status Summary
GET /api/orders/summary

Returns counts of garments grouped by status.

Screenshots

The screenshots folder contains evidence of the completed assignment requirements:

dashboard-all.png
filter-received.png
filter-in-cleaning.png
filter-ready.png
filter-delivered.png
api-orders.png
api-summary.png

These screenshots demonstrate:

Dashboard functionality
Working status filters
API responses
Correct implementation of assignment requirements
Future Improvements

If this project were extended further, I would consider:

PostgreSQL database integration
Authentication and role-based access control
Real-time updates using WebSockets
Pagination and sorting
Customer management module
Payment tracking
Order history and audit logs
Advanced analytics dashboard

Author
Swarajaya Singh Sawant
Completed for the QDC Internship Assignment.