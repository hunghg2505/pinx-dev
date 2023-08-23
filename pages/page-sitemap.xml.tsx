import { NextPageContext } from 'next';

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!--We manually set the two URLs we know already-->
      <url>
        <loc>https://pinex-sit.agiletech.vn</loc>
      </url>
      <url>
        <loc>https://pinex-sit.agiletech.vn/en</loc>
      </url>
      ${[
        'explore',
        'gift-cash',
        'watchlist',
        'assets',
        'setting',
        'login',
        'forgot-password',
        'top-watching',
        'top-mention',
        'pinex-top-20',
      ]
        .map(
          (e) => `<url>
          <loc>https://pinex-sit.agiletech.vn/${e}</loc>
        </url><url>
          <loc>https://pinex-sit.agiletech.vn/en/${e}</loc>
        </url>`,
        )
        .join('')}
   </urlset>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: NextPageContext) {
  if (!res) {
    return;
  }
  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(generateSiteMap());
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
