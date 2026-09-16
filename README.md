# Grace Sports

A minimal React + Vite storefront for Grace Sports, a table tennis equipment brand focused on premium tables, balls, accessories, arena gear, and sportswear.

## What this project does

- Showcases product categories and featured equipment
- Lets visitors browse and search the product catalogue
- Opens product detail modals with specifications and pricing
- Supports inquiry tracking from the UI
- Connects inquiries to WhatsApp for direct sales contact
- Displays company information, gallery, testimonials, and policies

## Tech stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- lucide-react

## Run locally

Prerequisites: Node.js

1. Install dependencies:
   npm install
2. Start the app:
   npm run dev
3. Open the site in your browser:
   http://localhost:3000

## Production build

npm run build

## Project structure

- src/App.tsx — main storefront layout and inquiry state
- src/components — page sections and UI components
- src/data — product and category data
- src/utils — utility helpers such as WhatsApp link generation
