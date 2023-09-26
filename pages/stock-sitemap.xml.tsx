import { NextPageContext } from 'next';

import { fetchAllStockFromServer } from '@components/Stock/service';
import { getHostName, slugify } from '@utils/common';

function generateSiteMap(host: string, listSlug: string[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${listSlug
        .map((item) => {
          return `
            <url>
              <loc>${host}/co-phieu/${item}</loc>
            </url>`;
        })
        .join('')}
   </urlset>
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

  // We make an API call to gather the URLs for our site
  const response: any = await fetchAllStockFromServer();
  const listSlug: string[] = [];

  for await (const item of response.data) {
    let prefixSlug: string = item?.stockCode?.toLowerCase();
    if (prefixSlug.codePointAt(0) === 18) {
      prefixSlug = '';
    }

    const suffixSlug = slugify(item.companyName);
    const slug = [prefixSlug, suffixSlug].filter((item) => item.length).join('-');

    listSlug.push(slug);
  }

  // We generate the XML sitemap with the posts data
  const sitemap = generateSiteMap(host, listSlug);

  res.setHeader('Content-Type', 'text/xml');
  // we send the XML to the browser
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
}

export default SiteMap;
