# Image Optimization Guide

## Current Issues:
- vr_map2_T.png: 4.3 MB
- raturu.png: 2.0 MB  
- Outbreak.png: 1.4 MB

## Solutions:

### Option 1: Convert to WebP
```bash
# Use online tools or:
# - TinyPNG.com
# - Squoosh.app
# Target: <200KB per image
```

### Option 2: Lazy Loading Images
```tsx
// Add to Projects component
<img 
  src={image} 
  loading="lazy"
  decoding="async"
/>
```

### Option 3: Progressive Loading
```tsx
// Use blur placeholder while loading
const [imageLoaded, setImageLoaded] = useState(false);
```