# Hellscore Thermometer Art Generator

## Overview

Hellscore Thermometer Art is a customizable fundraising thermometer generator for Hellscore, built with React, Vite, TypeScript, Tailwind CSS, and shadcn-ui. It allows you to visually track fundraising progress and export beautiful thermometer graphics for social media, websites, and print.

## Features

- **Live Customization:** Adjust goal, current amount, currency, title, subtitle, theme, font style, and more in real time.
- **Multiple Themes:** Choose from Hellfire, Molten, Shadow, Crimson, and Inferno styles.
- **Flexible Sizing:** Presets for Story, Square, Landscape, Twitter, or custom dimensions.
- **Currency Support:** Select from popular currencies or define your own symbol and placement.
- **Visual Effects:** Add flames, percentage display, and custom messages.
- **Export:** Download high-quality PNG or JPEG images of your thermometer.

## Getting Started

### Prerequisites

- Node.js & npm (recommended to install via [nvm](https://github.com/nvm-sh/nvm#installing-and-updating))

### Installation

```sh
git clone https://github.com/VehpuS/hellscore-thermometer-art.git
cd hellscore-thermometer-art
npm install
```

### Running Locally

```sh
npm run dev
```

Visit `http://localhost:5173` (or the port shown in your terminal) to use the app.

## Usage

1. **Customize your thermometer** using the left panel: set fundraising goal, current amount, currency, theme, font, and more.
2. **Preview** updates instantly in the main area.
3. **Export** your design by clicking the Export button. Choose PNG or JPEG for high-quality downloads.

## Export Details

- Images are exported at double the preview resolution for crisp results.
- PNG exports have transparent backgrounds.
- JPEG exports have solid backgrounds.

## Technologies Used

- React
- Vite
- TypeScript
- Tailwind CSS
- shadcn-ui
- Radix UI
- Framer Motion
- html2canvas

## Folder Structure

- `src/pages/Home.tsx` — Main app page and logic
- `src/components/` — UI and customization components
- `src/types/design.ts` — Design types and defaults
- `src/utils/currency.ts` — Currency formatting logic

## License

MIT

---

For questions or contributions, open an issue or pull request on [GitHub](https://github.com/VehpuS/hellscore-thermometer-art).
