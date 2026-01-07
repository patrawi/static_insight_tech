# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview
DigitalFlow is a React + TypeScript static landing page for a digital transformation consulting company. The site showcases business services, team information, and engagement models with bilingual content (English/Thai).

## Development Commands

```bash
# Start development server with hot reload
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run ESLint
npm run lint
```

## Architecture

### Single-File Component Structure
The entire application is contained in `src/App.tsx` with modular sub-components:
- `Navbar` - Navigation with scroll effects
- `Hero` - Landing hero section
- `ServicesSection` - Service offerings
- `TeamSection` - Team profiles
- `StatsSection` - Key metrics display
- `EngagementModelsSection` - Business engagement options
- `CTASection` - Call-to-action area
- `Footer` - Site footer

### Data Management
All business content data is defined as constants at the top of `App.tsx`:
- `SERVICES` - Array of service objects
- `TEAM` - Team member profiles
- `ENGAGEMENT_MODELS` - Business model options
- `INSIGHTS` - Key statistics/metrics

External business content documentation is stored in `content.md` (not imported, reference only).

### Tech Stack
- **React 19** with TypeScript in strict mode
- **Vite 6** for build tooling and dev server
- **Tailwind CSS** for styling (see `tailwind.config.js`)
- **Lucide React** for icons
- **PostCSS** for CSS processing

## Key Files
- `src/App.tsx` - Main application with all components and data
- `content.md` - Business content documentation (Thai/English)
- `index.html` - HTML entry point with meta tags
- `vite.config.ts` - Vite configuration
- `tailwind.config.js` - Tailwind customization
- `tsconfig.json` - TypeScript strict mode enabled
