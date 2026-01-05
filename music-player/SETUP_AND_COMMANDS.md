# Music Player Web App - Setup & Commands Guide

## Quick Start

### Installation
```bash
# Navigate to project directory
cd music-player

# Install all dependencies
npm install
```

### Running the App
```bash
# Start development server
npm run dev

# Open browser to: http://localhost:5173/
```

## Available Commands

### Development
```bash
npm run dev              # Start Vite development server with hot reload
npm run build            # Build production bundle
npm run preview          # Preview production build locally
npm run lint             # Run ESLint code quality checks
```

### Testing
```bash
npm run test:run         # Execute all tests once (headless)
npm run test             # Run tests in watch mode
npm run test:ui          # Run tests with interactive UI dashboard
```

## Project Setup Timeline

### Phase 1: Project Initialization
```bash
npm create vite@latest music-player -- --template react
cd music-player
npm install
```

### Phase 2: Testing Dependencies
```bash
npm install --save-dev vitest @vitest/ui
npm install --save-dev @testing-library/react @testing-library/jest-dom @testing-library/user-event
npm install --save-dev jsdom
npm install --save-dev @vitejs/plugin-react
```

### Phase 3: Development
1. Created mock data in `src/data/mockData.js`
2. Built state management in `src/context/MusicContext.jsx`
3. Implemented components in `src/components/`
4. Styled with CSS in `src/components/*.css`
5. Created test suite in `src/test/`
6. Configured Vite and Vitest

### Phase 4: Testing & Verification
```bash
npm run test:run         # All tests pass: 67/67
npm run dev              # Server running: http://localhost:5173/
```

## Project Dependencies

### Runtime Dependencies
- `react@^19.2.0` - UI framework
- `react-dom@^19.2.0` - React DOM rendering

### Development Dependencies
- `vite@^7.3.0` - Build tool
- `@vitejs/plugin-react` - React plugin for Vite
- `vitest@^4.0.15` - Unit testing framework
- `@vitest/ui` - Vitest UI dashboard
- `@testing-library/react` - React component testing utilities
- `@testing-library/jest-dom` - DOM matchers
- `@testing-library/user-event` - User interaction simulation
- `jsdom@^27.3.0` - DOM implementation for Node.js
- `eslint` - Code quality

## Configuration Files

### package.json
Defines scripts and dependencies:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "lint": "eslint .",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:run": "vitest run"
  }
}
```

### vite.config.js
Vite configuration for React development

### vitest.config.js
Test configuration with jsdom environment:
```javascript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.js'],
    css: true,
  },
});
```

## File Structure

```
music-player/
├── src/
│   ├── components/
│   │   ├── Player.jsx
│   │   ├── Player.css
│   │   ├── AlbumGrid.jsx
│   │   ├── AlbumGrid.css
│   │   ├── AlbumDetail.jsx
│   │   ├── AlbumDetail.css
│   │   ├── TrackList.jsx
│   │   ├── TrackList.css
│   │   ├── PlaylistManager.jsx
│   │   └── PlaylistManager.css
│   ├── context/
│   │   └── MusicContext.jsx
│   ├── data/
│   │   └── mockData.js
│   ├── test/
│   │   ├── setup.js
│   │   ├── App.test.jsx
│   │   ├── MusicContext.test.jsx
│   │   ├── Player.test.jsx
│   │   ├── AlbumGrid.test.jsx
│   │   ├── AlbumDetail.test.jsx
│   │   ├── TrackList.test.jsx
│   │   └── PlaylistManager.test.jsx
│   ├── App.jsx
│   ├── App.css
│   ├── main.jsx
│   ├── index.css
│   └── index.html
├── vitest.config.js
├── vite.config.js
├── package.json
├── package-lock.json
├── PROJECT_SUMMARY.md
└── TEST_EXECUTION_LOG.txt
```

## Development Workflow

### 1. Starting Development
```bash
npm run dev
```
- Opens on http://localhost:5173/
- Hot Module Replacement (HMR) enabled
- Auto-reload on file changes

### 2. Running Tests
```bash
# Single run
npm run test:run

# Watch mode
npm run test

# Interactive dashboard
npm run test:ui
```

### 3. Building for Production
```bash
npm run build
```
- Creates optimized bundle in `dist/` folder
- Minified and tree-shaken
- Ready for deployment

### 4. Code Quality
```bash
npm run lint
```
- Runs ESLint
- Checks code quality

## Key Features Implementation

### State Management
- Uses React Context API in `src/context/MusicContext.jsx`
- Custom `useMusic()` hook for component access
- Global state for: albums, tracks, playlists, current track, playback status

### Components
1. **Player** - Playback controls and progress
2. **AlbumGrid** - Album browsing with cards
3. **AlbumDetail** - Album tracks and metadata
4. **TrackList** - Track display with like buttons
5. **PlaylistManager** - Create/manage playlists
6. **App** - Main layout and navigation

### Testing
- **MusicContext.test.jsx** - State management tests (10 tests)
- **Player.test.jsx** - Player component tests (4 tests)
- **AlbumGrid.test.jsx** - Album browsing tests (6 tests)
- **AlbumDetail.test.jsx** - Detail view tests (14 tests)
- **TrackList.test.jsx** - Track list tests (8 tests)
- **PlaylistManager.test.jsx** - Playlist management tests (12 tests)
- **App.test.jsx** - App navigation tests (13 tests)
- **Total: 67 tests, 100% passing**

## Mock Data

The app includes mock data for:
- **4 Albums** with metadata (title, artist, year, cover)
- **15 Tracks** across albums with duration
- **2 Default Playlists** ("My Favorites" and "Chill Vibes")

Located in `src/data/mockData.js`

## Performance Tips

1. **Development**: Use `npm run dev` for fast feedback
2. **Testing**: Use `npm run test:run` for headless execution
3. **Production**: Use `npm run build` for optimized bundle
4. **Debugging**: Use browser DevTools with React Developer Tools extension

## Troubleshooting

### Port 5173 already in use
```bash
# Try different port
npm run dev -- --port 3000
```

### Module not found errors
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### Tests failing
```bash
# Clear cache and run again
npm run test:run
```

## Deployment

### Build for production
```bash
npm run build
```

### Output
- Build files in `dist/` folder
- Ready to serve on any static host
- Can be deployed to:
  - Vercel
  - Netlify
  - GitHub Pages
  - AWS S3
  - Any web server

### Serve production build
```bash
npm run preview
```

## Browser Support

- Modern browsers with ES2020+ support
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Additional Resources

### Documentation
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Vitest Documentation](https://vitest.dev/)
- [Testing Library Documentation](https://testing-library.com/)

### Project Files
- `PROJECT_SUMMARY.md` - Complete project overview
- `TEST_EXECUTION_LOG.txt` - Full test results
- `src/test/` - All test files with examples

## Support

For issues or questions:
1. Check the test files for examples of component usage
2. Review the component JSX for implementation details
3. Check the mock data for data structure
4. Refer to the context file for state management

---

Last Updated: December 16, 2025
Project Status: ✅ Production Ready
