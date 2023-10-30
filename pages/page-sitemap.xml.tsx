import { NextPageContext } from 'next';

import { getHostName } from '@utils/common';

const LIST_PATH = [
  'kham-pha',
  'qua-tang',
  'danh-muc-theo-doi',
  'tai-san',
  'cai-dat',
  'dang-nhap',
  'quen-mat-khau',
  'kham-pha/top-ma-co-phieu-duoc-theo-doi-nhieu-nhat',
  'kham-pha/top-ma-co-phieu-duoc-de-cap-nhieu-nhat',
  'pinex-top-20',
];

function generateSiteMap(host: string) {
  const urls = LIST_PATH.map(
    (path) => `
    <url>
      <loc>${host}/${path}</loc>
    </url>
  `,
  ).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!--We manually set the two URLs we know already-->
      <url>
        <loc>${host}</loc>
      </url>
      ${urls}
    </urlset>
  `;
}

function SiteMap() {}

export async function getServerSideProps({ req, res }: NextPageContext) {
  if (!req || !res) {
    return;
  }

  const host = getHostName(req.headers);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(generateSiteMap(host));
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
