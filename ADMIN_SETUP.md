# Admin Dashboard Setup

## Overview

A modern admin dashboard for Henmasi Trading Enterprise with the following pages:

- **Dashboard** - Overview with key metrics, recent orders, and low stock alerts
- **Products** - Manage product inventory with search, filter, and bulk actions
- **Orders** - View and manage customer orders with status tracking
- **Customers** - Customer database with contact information and order history
- **Settings** - Business information, contact details, and theme customization

## Access

- **URL**: `/admin/login`
- **Demo Credentials**:
  - Email: `admin@henmasi.com`
  - Password: `admin123`

## Features

### Dashboard
- 5 key metric cards (Total Products, Total Orders, Revenue, Pending Orders, Total Customers)
- Low stock alerts with product details
- Recent orders table with status badges
- Quick links to all management sections

### Products Management
- Search by product name or SKU
- Filter by product category
- Stock status indicators (In Stock / Low Stock)
- Edit and delete product functionality
- Inline product descriptions

### Orders Management
- View all orders with customer details
- Filter by order status (pending, confirmed, processing, delivered, cancelled)
- Status badges with visual indicators
- Actions dropdown to update order status
- Customer contact information

### Customers Management
- Customer cards with complete contact info
- Total orders and spending metrics
- Customer join date
- WhatsApp contact button
- Search functionality
- Customer value metrics

### Settings
- Business information editor
- Contact information (WhatsApp numbers)
- Logo upload section
- Theme color customization with live preview

## Data

Mock data is stored in `/lib/admin-data.ts` including:
- 12 sample products across 6 categories
- 5 sample orders
- 5 sample customers

## Styling

- Dark sidebar with yellow accent
- Responsive mobile navigation
- Gray/Yellow/White color scheme
- Consistent card-based layout
- Tailwind CSS with shadcn/ui components

## Components

- `AdminSidebar` - Navigation sidebar with mobile toggle
- `AdminLayout` - Layout wrapper with authentication check
- Toast notifications for user feedback
- Status badges and custom icons

## Next Steps

To enhance the dashboard:
1. Connect to a real database (Supabase/Neon)
2. Implement actual product CRUD operations
3. Add order confirmation email/WhatsApp notifications
4. Integrate payment verification
5. Add analytics charts and export functionality
6. Implement user role management
