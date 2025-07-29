"use client";

import { useEffect } from "react";

export const FaviconGenerator = () => {
  useEffect(() => {
    // Create SVG favicon with Code2 icon (minimal design)
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none">
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#2563eb;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1e40af;stop-opacity:1" />
          </linearGradient>
        </defs>
        <!-- Background circle -->
        <circle cx="16" cy="16" r="15" fill="url(#grad1)"/>
        <!-- Code2 icon paths (simplified for favicon) -->
        <path d="M10 12L6 16L10 20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <path d="M22 12L26 16L22 20" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
        <path d="M18 8L14 24" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
      </svg>
    `;

    const blob = new Blob([svg], { type: 'image/svg+xml' });
    const url = URL.createObjectURL(blob);
    
    // Remove existing favicon
    const existingLink = document.querySelector("link[rel*='icon']");
    if (existingLink) {
      existingLink.remove();
    }

    // Create new favicon
    const link = document.createElement('link');
    link.type = 'image/svg+xml';
    link.rel = 'shortcut icon';
    link.href = url;
    document.getElementsByTagName('head')[0].appendChild(link);

    // Cleanup function
    return () => URL.revokeObjectURL(url);
  }, []);

  return null; // This component doesn't render anything visible
};
