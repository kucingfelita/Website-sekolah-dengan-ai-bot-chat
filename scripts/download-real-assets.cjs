const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');

const ASSETS = [
  // Brand
  {
    url: 'https://smkn1bawang.sch.id/wp-content/uploads/2022/08/cropped-SMK-N-1-Bawang.png',
    dest: 'public/images/brand/cropped-SMK-N-1-Bawang.png'
  },
  // Hero / Banners
  {
    url: 'https://smkn1bawang.sch.id/wp-content/uploads/2024/10/Banner-Website-4.jpg',
    dest: 'public/images/hero/banner-website-4.jpg'
  },
  {
    url: 'https://smkn1bawang.sch.id/wp-content/uploads/2024/10/Banner-Website-5.jpg',
    dest: 'public/images/hero/banner-website-5.jpg'
  },
  {
    url: 'https://smkn1bawang.sch.id/wp-content/uploads/2024/10/Banner-Website-3-1.jpg',
    dest: 'public/images/hero/banner-website-3-1.jpg'
  },
  // Facilities & Campus
  {
    url: 'https://smkn1bawang.sch.id/wp-content/uploads/2023/10/DSCF0371-360x203.jpg',
    dest: 'public/images/facilities/DSCF0371.jpg'
  },
  {
    url: 'https://smkn1bawang.sch.id/wp-content/uploads/2023/07/C2700T01.jpg',
    dest: 'public/images/facilities/C2700T01.jpg'
  },
  {
    url: 'https://smkn1bawang.sch.id/wp-content/uploads/2024/09/Foto-360x203.png',
    dest: 'public/images/facilities/kampus-skansa.png'
  },
  // Partners
  {
    url: 'https://smkn1bawang.sch.id/wp-content/uploads/2024/09/pt_traspac_makmur_sejahtera_logo.png',
    dest: 'public/images/partners/pt_traspac_makmur_sejahtera_logo.png'
  },
  {
    url: 'https://smkn1bawang.sch.id/wp-content/uploads/2024/09/4765952-icon-plus-regional-jawa-tengan-dan-di-yogyakarta.jpg',
    dest: 'public/images/partners/icon_plus_regional_jateng.jpg'
  },
  {
    url: 'https://smkn1bawang.sch.id/wp-content/uploads/2024/09/1699069120_PASI-300x296.png',
    dest: 'public/images/partners/pasi_logo.png'
  },
  // News & Activities 2026
  {
    url: 'https://smkn1bawang.sch.id/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-22-at-2.27.33-PM-1024x576.jpeg',
    dest: 'public/images/news/traspac-mengajar-2026.jpg'
  },
  {
    url: 'https://smkn1bawang.sch.id/wp-content/uploads/2026/09/WhatsApp-Image-2026-09-16-at-11.16.49-AM-300x226.jpeg',
    dest: 'public/images/news/sosialisasi-pkl-pplg.jpg'
  },
  {
    url: 'https://smkn1bawang.sch.id/wp-content/uploads/2026/08/1-1024x719.jpeg',
    dest: 'public/images/news/pmr-wira-juara-1.jpg'
  },
  {
    url: 'https://smkn1bawang.sch.id/wp-content/uploads/2026/08/PMI-300x169.jpeg',
    dest: 'public/images/news/donor-darah-pmi.jpg'
  },
  // Student Works
  {
    url: 'https://karya.smkn1bawang.sch.id/storage/works/membuat-poster-jaga-bersama-sungai-kita-6ab9e6a598c20.jpg',
    dest: 'public/images/student-works/poster-jaga-bersama-sungai-kita.jpg'
  }
];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const fullDest = path.resolve(dest);
    const dir = path.dirname(fullDest);
    fs.mkdirSync(dir, { recursive: true });

    const client = url.startsWith('https') ? https : http;
    const req = client.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location, dest).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`Failed ${url}: status code ${res.statusCode}`));
      }
      const file = fs.createWriteStream(fullDest);
      res.pipe(file);
      file.on('finish', () => {
        file.close(() => resolve({ url, dest, size: fs.statSync(fullDest).size }));
      });
    });
    req.on('error', (err) => {
      fs.unlink(fullDest, () => {});
      reject(err);
    });
  });
}

async function run() {
  console.log(`Starting download of ${ASSETS.length} real assets from smkn1bawang.sch.id...`);
  const results = [];
  for (const item of ASSETS) {
    try {
      const res = await download(item.url, item.dest);
      console.log(`[OK] ${item.dest} (${res.size} bytes)`);
      results.push(res);
    } catch (err) {
      console.error(`[ERR] Failed ${item.url}:`, err.message);
    }
  }
  console.log(`\nCompleted: ${results.length}/${ASSETS.length} assets downloaded successfully.`);
}

run();
