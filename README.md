# Inventory Management System

## Project Overview

Inventory Management System is a full-stack enterprise inventory application developed using ASP.NET Core 8 Web API, React, TypeScript, Entity Framework Core, and SQL Server.

The system provides inventory tracking, stock transaction management, product management, category management, authentication, and inventory visibility through a centralized dashboard.

---

## Technology Stack

### Backend

* ASP.NET Core 8 Web API
* Entity Framework Core
* SQL Server
* JWT Authentication
* Repository Pattern
* Service Layer Pattern

### Frontend

* React
* TypeScript
* Axios
* Tailwind CSS
* shadcn/ui
* Vite

---

## Features Implemented

### Authentication & Authorization

* JWT Authentication
* Login Functionality
* Protected Routes
* Role-Based Authorization

### Dashboard

* Inventory Overview
* Summary Statistics

### Product Management

* Create Product
* View Products
* Update Product
* Delete Product

### Category Management

* Create Category
* View Categories
* Update Category
* Delete Category

### Inventory Management

* Inventory Listing
* Batch Tracking
* Quantity Visibility
* Expiry Monitoring

### Stock In

* Stock-In Transactions
* Batch Creation
* Inventory Quantity Updates
* Transaction History Recording

### Stock Out

* Stock-Out Transactions
* Inventory Deduction
* Transaction History Recording
* Batch-Based Inventory Tracking

---

## Project Structure

### Backend

```text
InventoryManagement.API
├── Controllers
├── DTOs
├── Interfaces
├── Models
├── Repositories
├── Services
├── Data
└── Migrations
```

### Frontend

```text
src
├── components
├── pages
├── routes
├── hooks
└── assets
```

---

## Database Entities

* Roles
* Users
* Categories
* Products
* ProductSpecifications
* Suppliers
* PurchaseOrders
* PurchaseOrderItems
* ProductBatches
* StockTransactionHeaders
* StockTransactionItems
* AuditLogs

---

## Setup Instructions

### Backend

1. Configure SQL Server connection string in:

```text
appsettings.json
```

2. Restore packages:

```bash
dotnet restore
```

3. Apply migrations:

```bash
dotnet ef database update
```

4. Run API:

```bash
dotnet run
```

---

### Frontend

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

---

## Current Development Status

Completed:

* Authentication & Authorization
* Dashboard
* Product Management
* Category Management
* Inventory Foundation
* Stock In Module
* Stock Out Module

In Progress:

* Frontend Integration
* Suppliers Module
* Purchase Orders Module
* Audit Logs
* Forecasting Module

---

## Author

Developed as an enterprise inventory management project using ASP.NET Core 8 and React.
