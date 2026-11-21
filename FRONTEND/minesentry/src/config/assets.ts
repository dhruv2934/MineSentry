/**
 * Centralized Asset Configuration
 * 
 * All customizable visual assets (videos, hero images, mine photography, logos)
 * are mapped here. To change any asset in the project, simply update the file
 * in the public/assets directory or point to the new path here.
 */

export const ASSETS = {
  // Public Landing Hero Assets
  hero: {
    video: '/assets/videos/minesentry-hero.mp4',
    truckImage: '/assets/images/mine-truck.jpg',
    backgroundImage: '/assets/images/mine-background.png',
    truckForeground: '/assets/images/truck-foreground.png',
    pitImage: '/assets/images/mine-pit-login.jpg',
    overlayGradient: 'linear-gradient(to bottom, rgba(8, 10, 12, 0.4) 0%, rgba(8, 10, 12, 0.75) 60%, #080a0c 100%)',
  },

  // Branding & Logos
  brand: {
    fullLogo: '/assets/logo/minesentry-logo.svg',
    markOnly: '/assets/logo/minesentry-mark.svg',
    appName: 'MineSentry',
    tagline: 'Industrial Governance & Safety Intelligence Platform',
  },

  // Mine Facility Photography
  mines: {
    jharia: '/assets/images/mines/jharia.jpg',
    korba: '/assets/images/mines/korba.jpg',
    singrauli: '/assets/images/mine-pit-login.jpg',
    talcher: '/assets/images/mine-truck.jpg',
    raniganj: '/assets/images/mine-pit-login.jpg',
    neyveli: '/assets/images/mine-truck.jpg',
  },
} as const;

export type AssetConfig = typeof ASSETS;








import type { Mine } from '../types';

// Six local mine photographs
const mineImages = [
  '/assets/images/mines/mine1.avif',
  '/assets/images/mines/mine2.jpeg',
  '/assets/images/mines/mine3.webp',
  '/assets/images/mines/mine4.jpeg',
  '/assets/images/mines/mine5.jpeg',
  '/assets/images/mines/mine6.jpg',
];

// Assign an image to a mine based on its database ID
export const getMineImage = (mine: Mine): string => {
  const index =
    ((mine.id - 1) % mineImages.length +
      mineImages.length) % mineImages.length;

  return mineImages[index];
};
