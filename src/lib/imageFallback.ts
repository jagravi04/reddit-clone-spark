
/**
 * Utility functions for handling image fallbacks and placeholders
 */

/**
 * Returns a placeholder image URL if the original image is unavailable
 * @param imageUrl Original image URL that might be missing
 * @returns A placeholder image URL or the original URL
 */
export const getImageFallback = (imageUrl?: string): string => {
  if (!imageUrl) {
    return '/placeholder.svg';
  }
  return imageUrl;
};

/**
 * Handler function for image loading errors
 * @param event The error event from the img element
 */
export const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>): void => {
  event.currentTarget.src = '/placeholder.svg';
  event.currentTarget.onerror = null; // Prevent infinite error loop
};
