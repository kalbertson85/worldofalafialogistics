import { createWriteStream, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { get as httpsGet } from 'https';
import { promisify } from 'util';
import { pipeline as streamPipeline } from 'stream';
import { fileURLToPath } from 'url';
import { dirname as dirnameFromPath } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirnameFromPath(__filename);
const pipeline = promisify(streamPipeline);

const IMAGES = [
  // Electronics
  {
    url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=1000',
    filename: 'laptop-hp-elitebook.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=1000',
    filename: 'samsung-galaxy-a54.jpg'
  },
  
  // Vehicle Rentals
  {
    url: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=1000',
    filename: 'toyota-rav4.jpg'
  },
  
  // Toiletries
  {
    url: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?q=80&w=1000',
    filename: 'premium-toiletries.jpg'
  },
  
  // Stationery
  {
    url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=1000',
    filename: 'office-stationery.jpg'
  },
  
  // More items as needed
  {
    url: 'https://images.unsplash.com/photo-1602143407151-a4114ec8b2b1?q=80&w=1000',
    filename: 'iphone-14-pro.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1542751110-97427bbecf20?q=80&w=1000',
    filename: 'macbook-pro.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo 1605559424843-9e4c228bf1c2?q=80&w=1000',
    filename: 'mercedes-benz.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1494972308805-463bc619d34e?q=80&w=1000',
    filename: 'bath-essentials.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=1000',
    filename: 'notebook-set.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?q=80&w=1000',
    filename: 'designer-handbag.jpg'
  }
];

async function downloadImage(url, filepath) {
  const dir = dirname(filepath);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }

  const response = await new Promise((resolve) => {
    httpsGet(url, resolve);
  });

  await pipeline(
    response,
    createWriteStream(filepath)
  );
  
  console.log(`Downloaded ${url} to ${filepath}`);
}

async function main() {
  const imagesDir = join(__dirname, '../public/images/services');
  
  for (const image of IMAGES) {
    const filepath = join(imagesDir, image.filename);
    try {
      await downloadImage(image.url, filepath);
    } catch (error) {
      console.error(`Error downloading ${image.url}:`, error);
    }
  }
  
  console.log('Finished downloading sample images');
}

main().catch(console.error);
