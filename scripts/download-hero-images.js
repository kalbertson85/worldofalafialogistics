import { createWriteStream, existsSync, mkdirSync, unlink } from 'fs';
import { get as httpsGet } from 'https';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Create images directory if it doesn't exist
const imagesDir = join(__dirname, '../public/images/hero');
if (!existsSync(imagesDir)) {
  mkdirSync(imagesDir, { recursive: true });
  console.log('Created directory:', imagesDir);
}

// Hero images to download with their URLs and target filenames
const heroImages = [
  {
    url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=2070',
    filename: 'hero-1.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070',
    filename: 'hero-2.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=2070',
    filename: 'hero-3.jpg'
  }
];

// Function to download a file from URL
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = createWriteStream(filepath);
    httpsGet(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded ${url} to ${filepath}`);
        resolve(filepath);
      });
    }).on('error', (err) => {
      unlink(filepath, () => {}); // Delete the file if there's an error
      reject(err);
    });
  });
}

// Download all hero images
async function downloadAllImages() {
  try {
    for (const img of heroImages) {
      const filepath = join(imagesDir, img.filename);
      await downloadImage(img.url, filepath);
    }
    console.log('All hero images downloaded successfully!');
  } catch (error) {
    console.error('Error downloading hero images:', error);
  }
}

// Run the download
downloadAllImages();
