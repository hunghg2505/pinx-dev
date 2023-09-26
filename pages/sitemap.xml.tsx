import { NextPageContext } from 'next';

import { getHostName } from '@utils/common';

const LIST_SITE_MAP_PATH = [
  'page-sitemap.xml',
  'post-sitemap.xml',
  'theme-sitemap.xml',
  'stock-sitemap.xml',
  'people-sitemap.xml',
];

function generateSiteMap(host: string) {
  return `
  <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <!-- This is the parent sitemap linking to additional sitemaps for products, collections and pages as shown below. The sitemap can not be edited manually, but is kept up to date in real time. -->
    ${LIST_SITE_MAP_PATH.map(
      (path) => `
      <sitemap>
        <loc>${host}/${path}</loc>
      </sitemap>
    `,
    ).join('')}
  </sitemapindex>
 `;
}

function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

export async function getServerSideProps({ req, res }: NextPageContext) {
  if (!req || !res) {
    return;
  }

  const host = getHostName(req.headers);

  const sitemap = generateSiteMap(host);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
