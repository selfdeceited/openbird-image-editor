# Project: OpenBird Image Editor

This web application allows users to edit RAW images for birds, adjust the color, brightness, contrast, and saturation, allow to crop and rotate images, fix or add the metadata, append signature, and afterwards save the edited images along with the metadata to the backend.
## Code Style

- TypeScript strict mode, no `any` types
- Use named exports, not default exports

# Package Manager

Always use `yarn` instead of `npm` for installing packages and running scripts.

# Conventions

## Styled Components

All `styled.xxx` components must follow the `%name%Styled` naming convention.

```ts
// correct
const DropZoneStyled = styled.div``
const PreviewImageStyled = styled.img``

// incorrect
const DropZone = styled.div``
const PreviewImage = styled.img``
```

All styled components must live in a separate file named `%Component%.styled.ts`, co-located with the component.

```
// correct
ImageUploader.tsx
ImageUploader.styled.ts

// incorrect
ImageUploader.tsx  (styled components defined inline)
```
