# Design Document

## Overview

This design removes GitHub integration from the Projects component and replaces it with a more user-focused approach emphasizing live demos and downloads. The solution will clean up the codebase, fix TypeScript errors, and provide a better user experience for portfolio visitors.

## Architecture

The refactoring will involve:
1. **Data Layer**: Update project data structure to remove github properties and add download properties
2. **UI Layer**: Replace GitHub icons and links with demo/download buttons
3. **Import Layer**: Remove unused GitHub icon imports

## Components and Interfaces

### Project Data Structure
```typescript
interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  live?: string;        // Optional live demo URL
  download?: string;    // Optional download URL
  status?: 'available' | 'coming-soon'; // For projects without links
}
```

### Action Button Component
The design will create a flexible action button system that can handle:
- Live demo links (with ExternalLink icon)
- Download links (with Download icon)
- Coming soon states (with Clock icon or similar)

## Data Models

### Updated Project Objects
Each project will be updated to remove `github` properties and include appropriate `live` and/or `download` properties:

```typescript
const projects = [
  {
    title: "VR 3D Assessment Game",
    // ... other properties
    live: "https://demo-url.com", // or download: "path/to/file.zip"
  },
  // ... other projects
];
```

## Error Handling

### Missing Link Handling
- Projects without live or download links will show a "Coming Soon" button
- Buttons will be disabled for unavailable projects
- Clear visual indicators for different button states

### Type Safety
- Remove all references to `project.github` to eliminate TypeScript errors
- Ensure all accessed properties exist on the project interface

## Testing Strategy

### Manual Testing
1. Verify all GitHub references are removed
2. Test that all project buttons work correctly
3. Confirm no TypeScript compilation errors
4. Validate responsive design on different screen sizes

### Visual Testing
1. Ensure consistent button styling across all projects
2. Verify icon alignment and spacing
3. Test hover states and transitions