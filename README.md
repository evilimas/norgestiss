# Norgestiss 🚻

A mobile app for finding public toilets across Norway.

## What it does

- Browse public toilets on an interactive map
- Search and filter by name, address, free/paid, and handicap accessibility
- Add new toilet locations
- Save favorites

## Tech Stack

**Frontend** — React Native (Expo)  
**Backend** — ASP.NET Core (C#) with a REST API  
**Map** — Leaflet via WebView (OpenStreetMap tiles)

## Project Structure

```
norgestiss/
├── frontend/Norgestiss/   # Expo React Native app
│   ├── app/(tabs)/        # Screens: Home, Map, Search, Add, Favorites
│   └── services/          # API calls to the backend
└── backend/NorgesTiss/    # ASP.NET Core Web API
    └── Controllers/       # REST endpoints for toilets
```

## Running the project

### Backend

```bash
cd backend/NorgesTiss/NorgesTiss
dotnet run
```

### Frontend

```bash
cd frontend/Norgestiss
npm install
npx expo start
```

Then scan the QR code with the Expo Go app or run on an Android/iOS emulator.

## Contributors

- [@evilimas](https://github.com/evilimas) — Egidijus Vilimas
- [@IkayImonoko](https://github.com/IkayImonoko) - Nikita
