const fs = require('fs');
const { createCanvas } = require('canvas');
const ico = require('@fiahfy/ico-convert');

// Create a canvas
const size = 64;
const canvas = createCanvas(size, size);
const ctx = canvas.getContext('2d');

// Draw a simple A icon
ctx.fillStyle = '#4F46E5';
ctx.fillRect(0, 0, size, size);
ctx.fillStyle = '#FFFFFF';
ctx.font = 'bold 48px Arial';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';
ctx.fillText('A', size/2, size/2);

// Convert to ICO and save
const buffer = canvas.toBuffer('image/png');
const icoBuffer = ico.convert([{ buffer, width: size, height: size }]);
fs.writeFileSync('public/favicon.ico', icoBuffer);

console.log('Favicon generated successfully!');
