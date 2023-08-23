import { NextPageContext } from 'next';

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!--We manually set the two URLs we know already-->
      <url>
        <loc>https://www.hillridge.vn</loc>
      </url>
      <url>
        <loc>https://www.hillridge.vn/en</loc>
      </url>
      ${['about_us', 'our_model', 'buying_cover', 'faqs', 'contact_us', 'press']
        .map(
          (e) => `<url>
          <loc>https://www.hillridge.vn/${e}</loc>
        </url><url>
          <loc>https://www.hillridge.vn/en/${e}</loc>
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
