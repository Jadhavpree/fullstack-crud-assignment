# Product Management System - Frontend

## Overview

This is the frontend application for the Product Management System, built with React, TypeScript, and modern UI components.

## Technologies Used

- **React 18.3.1** - Frontend framework
- **TypeScript** - Type-safe JavaScript
- **Vite** - Build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **TanStack React Query** - Data fetching and state management
- **React Hook Form** - Form handling with validation
- **Zod** - Schema validation
- **React Router DOM** - Client-side routing
- **Lucide React** - Icon library

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Backend API running on port 8080

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8081`

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
├── pages/              # Page components
├── services/           # API service layer
├── hooks/              # Custom React hooks
├── types/              # TypeScript type definitions
├── lib/                # Utility functions
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Features

- Modern, responsive UI design
- Real-time data updates with React Query
- Form validation with Zod schemas
- Optimistic updates for better UX
- Error handling and loading states
- Mobile-friendly interface

## API Integration

The frontend communicates with the Spring Boot backend API running on `http://localhost:8080`. All API calls are handled through the services layer with proper error handling and loading states.