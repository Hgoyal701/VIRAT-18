# src/assets

This project uses remote image URLs by default to avoid build-time failures on CI platforms like Vercel when local image files are missing.

If you want to use local images instead, add your images as:
- src/assets/image1.jpg
- src/assets/image2.jpg
- src/assets/image3.jpg

And update metadata.json gallery paths to "/src/assets/image1.jpg" etc.
