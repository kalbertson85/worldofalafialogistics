const fs = require('fs');
const sharp = require('sharp');
const ico = require('@fiahfy/ico-convert');

async function createFavicon() {
  try {
    // Read the uploaded image
    const inputPath = 'public/logo/AlafiaLogo.jpeg';
    
    // Resize to 64x64 for favicon
    const resizedBuffer = await sharp(inputPath)
      .resize(64, 64, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .toBuffer();
    
    // Convert to ICO format
    const icoBuffer = await ico.convert([{ 
      buffer: resizedBuffer, 
      width: 64, 
      height: 64 
    }]);
    
    // Save the favicon
    fs.writeFileSync('public/favicon.ico', icoBuffer);
    console.log('Favicon created successfully!');
  } catch (error) {
    console.error('Error creating favicon:', error);
  }
}

createFavicon();
