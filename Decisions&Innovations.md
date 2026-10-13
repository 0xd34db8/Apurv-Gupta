# Custom Cursor & Native Fallback System

## Overview
Primary cursor is a high-framerate PNG floating element. Fallback is Windows-native hardware `.cur` files.

## Failure Modes Handled
1. Hybrid Touch Devices (Surface, Yoga, touch laptops with trackpads)
2. PNG decode / network / content-blocker failure
3. DOM occlusion / watchdog timeout

## Testing Hooks
- `window.__triggerCursorFallback()`: Immediate runtime switch
- `window.__resetCursorMode()`: Resets `localStorage` and restores PNG cursor
