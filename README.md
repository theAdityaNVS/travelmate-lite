# TravelMate Lite

A lightweight, AI-powered travel planner built with Next.js 15, TailwindCSS, and the Gemini API.

## Features

- **AI-Powered Itineraries:** Generates day-by-day travel plans based on destination, budget, and travel style.
- **Local Insights:** Provides food recommendations and local tips.
- **Interactive Maps:** Embeds a Google Map of the destination.
- **Export Functionality:** Allows users to easily copy their itinerary to the clipboard in Markdown format.
- **Responsive & Accessible:** Fully responsive design with semantic HTML and ARIA labels.

## Tech Stack

- **Frontend & Backend:** Next.js 15 (App Router, API Routes)
- **Styling:** TailwindCSS
- **AI Model:** Google Gemini API (gemini-2.5-flash)
- **Maps:** Google Maps Embed API
- **Testing:** Vitest & JS DOM
- **Deployment:** Google Cloud Run (Dockerized)

## Local Setup

1. **Clone the repository:**
   ```bash
   git clone <repository_url>
   cd travelmate-lite
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Environment Variables:**
   Copy `.env.example` to `.env` and fill in your API keys:
   ```bash
   cp .env.example .env
   ```
   Add your keys:
   - `GEMINI_API_KEY`: Your Google Gemini API key.
   - `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`: Your Google Maps API key.

4. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

## Testing

Run utility tests using Vitest:
```bash
npm run test
```

## Deployment

### Option 1: Google Cloud Run (Containerized)
This application is containerized and can be deployed to Google Cloud Run.

#### Prerequisites
- [Google Cloud CLI](https://cloud.google.com/sdk/docs/install) installed and authenticated.
- A Google Cloud project with Billing and Cloud Run API enabled.

#### Deployment Steps
1. **Authenticate with Google Cloud:** `gcloud auth login`
2. **Set your project ID:** `gcloud config set project YOUR_PROJECT_ID`
3. **Build and push:** `gcloud builds submit --tag gcr.io/YOUR_PROJECT_ID/travelmate-lite`
4. **Deploy:**
   ```bash
   gcloud run deploy travelmate-lite \
     --image gcr.io/YOUR_PROJECT_ID/travelmate-lite \
     --platform managed \
     --region asia-south1 \
     --allow-unauthenticated \
     --set-env-vars="GEMINI_API_KEY=your_key,NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_key"
   ```

### Option 2: Vercel (Edge-Optimized)
For the fastest global performance and zero-config CI/CD, deploy to Vercel.

#### Deployment Steps
1. **Push to GitHub:** Connect your repository to Vercel.
2. **Configure Environment Variables:** Add `GEMINI_API_KEY` and `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` in the Vercel Project Settings.
3. **Deploy:** Vercel will automatically detect Next.js and deploy.

## API Preparation
Before running or deploying, ensure you have access to the following:
- **Google Gemini API Key:** Get it from [Google AI Studio](https://aistudio.google.com/).
- **Google Maps API Key:** Enable 'Maps JavaScript API', 'Places API', and 'Routes API' in the [Google Cloud Console](https://console.cloud.google.com/).

## Architecture

- **`src/app/page.tsx`**: Main landing page combining Form, Itinerary, and Map.
- **`src/components/Form.tsx`**: User input form handling submission to the backend API.
- **`src/components/Itinerary.tsx`**: Renders the AI-generated JSON response into a clean UI.
- **`src/components/Map.tsx`**: Embeds Google Maps for the queried destination.
- **`src/app/api/plan/route.ts`**: The backend Next.js API route that interfaces with the Gemini model.
- **`src/lib/gemini.ts`**: Helper to instantiate and call the Gemini API securely on the server.
- **`src/lib/utils.ts`**: Utility functions for form validation and markdown formatting.

## Accessibility & Security

- **Accessibility:** Uses semantic HTML (`<main>`, `<section>`, `<header>`, `<footer>`), `aria-labels` for buttons and iframes, and high-contrast Tailwind colors.
- **Security:** API keys are never exposed (except `NEXT_PUBLIC_` for Maps which is restricted by domain). The Gemini API call happens entirely server-side in the API route, preventing key exposure. Input validation prevents basic malformed requests.

## Live Demo
*Deployed URL to be updated after deployment*
