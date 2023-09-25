import { NextPageContext } from 'next';

const LIST_SITE_MAP_PATH = [
  'page-sitemap.xml',
  'post-sitemap.xml',
  'theme-sitemap.xml',
  'stock-sitemap.xml',
  'people-sitemap.xml',
];

function generateSiteMap() {
  return `
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- This is the parent sitemap linking to additional sitemaps for products, collections and pages as shown below. The sitemap can not be edited manually, but is kept up to date in real time. -->
    ${LIST_SITE_MAP_PATH.map(
      (path) => `
      <sitemap>
        <loc>${`https://pinex.vn/${path}`}</loc>
      </sitemap>
    `,
    ).join('')}
  </sitemapindex>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ res }: NextPageContext) {
  if (!res) {
    return;
  }

  const sitemap = generateSiteMap();

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
