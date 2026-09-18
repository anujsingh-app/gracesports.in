import { GalleryItem } from '../types';

// Automatically discover all images in /public/images/gallery (including any future additions or subfolders)
const imageModules = import.meta.glob(
  '/public/images/gallery/**/*.{png,jpg,jpeg,webp,svg,PNG,JPG,JPEG,WEBP,gif,GIF,avif,AVIF}',
  { eager: true, query: '?url', import: 'default' }
);

function formatTitle(filename: string): string {
  // Remove file extension
  const baseName = filename.replace(/\.[^/.]+$/, '');

  return baseName
    .replace(/\bgs\b/gi, 'GS')
    .replace(/\btt\b/gi, 'TT')
    .split(' ')
    .map((word) => {
      if (word.toUpperCase() === 'GS' || word.toUpperCase() === 'TT') {
        return word.toUpperCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

function inferCategory(filename: string): string {
  const lower = filename.toLowerCase();
  if (lower.includes('ball')) return 'Balls';
  if (lower.includes('table')) return 'Tables';
  if (lower.includes('racket') || lower.includes('blade') || lower.includes('rubber')) return 'Rackets';
  if (lower.includes('apparel') || lower.includes('jersey')) return 'Sportswear';
  if (lower.includes('court') || lower.includes('flooring') || lower.includes('barrier')) return 'Arena';
  return 'Equipment';
}

export const GALLERY_ITEMS: GalleryItem[] = Object.keys(imageModules)
  .sort((a, b) => {
    // Natural alphanumeric sort so "tables (1)", "tables (2)", "tables (10)" appear in correct sequence
    return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
  })
  .map((fullPath, index) => {
    const filename = fullPath.split('/').pop() || `image-${index + 1}`;
    const rawVal = imageModules[fullPath];
    const resolvedUrl = typeof rawVal === 'string' ? rawVal : (rawVal as { default?: string })?.default;
    
    // In Vite, files inside /public are served at root path without the /public prefix
    const publicUrl = fullPath.replace(/^\/public/, '');
    const finalImageSrc = resolvedUrl || encodeURI(publicUrl);

    return {
      id: `gallery-${index + 1}`,
      title: formatTitle(filename),
      category: inferCategory(filename),
      image: finalImageSrc,
      description: `Grace Sport high-performance equipment — ${formatTitle(filename)}.`,
      featured: index < 4
    };
  });
