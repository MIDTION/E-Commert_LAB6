const fs = require('fs');
const https = require('https');
const path = require('path');

const games = [
  { name: 'Arena of Valor', file: 'rov.jpg' },
  { name: 'Wuthering Waves', file: 'wuwa.jpg' },
  { name: 'Free Fire', file: 'freefire.jpg' },
  { name: 'PUBG: Battlegrounds', file: 'pubg.jpg' }
];

async function fetchImage(game) {
  const query = encodeURIComponent(game.name);
  const url = `https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&titles=${query}&pithumbsize=600&format=json`;
  
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          const pages = json.query.pages;
          const pageId = Object.keys(pages)[0];
          if (pages[pageId].thumbnail) {
            resolve(pages[pageId].thumbnail.source);
          } else {
            resolve(null);
          }
        } catch (e) {
          resolve(null);
        }
      });
    }).on('error', reject);
  });
}

async function download(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      const fileStream = fs.createWriteStream(filename);
      res.pipe(fileStream);
      fileStream.on('finish', () => {
        fileStream.close();
        resolve();
      });
    }).on('error', reject);
  });
}

async function main() {
  const dir = path.join(__dirname, 'frontend-next', 'public', 'images', 'games');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  for (const game of games) {
    console.log(`Fetching image for ${game.name}...`);
    const imgUrl = await fetchImage(game);
    if (imgUrl) {
      console.log(`Found image: ${imgUrl}`);
      const filePath = path.join(dir, game.file);
      await download(imgUrl, filePath);
      console.log(`Saved to ${filePath}`);
    } else {
      console.log(`No image found for ${game.name}`);
    }
  }
}

main().catch(console.error);
